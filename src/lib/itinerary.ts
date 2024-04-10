/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use server';

import { join } from 'path';

import { defineRetriever, Document, retrieve } from '@genkit-ai/ai/retriever';
import { configureGenkit } from '@genkit-ai/core';
import { dotprompt, prompt } from '@genkit-ai/dotprompt';
import { firebase } from '@genkit-ai/firebase';
import { defineFlow, run, runFlow } from '@genkit-ai/flow';
import { vertexAI } from '@genkit-ai/vertexai';
import dataConnect from './data-connect';
import { getActivitiesForPlace, getNearestPlace } from '@compass/backend';
import { z } from 'zod';

import { Destination } from './legacy/types';

interface MyResult {
  itineraries: Destination[];
}

const getLocation = () => {
  return 'us-central1';
};

const dc = dataConnect('localhost');

configureGenkit({
  plugins: [
    firebase({
      flowStateStore: { collection: 'flowTraceStore' },
    }),
    vertexAI({
      location: getLocation() || 'us-central1',
    }),
    dotprompt({ dir: join(process.cwd(), 'prompts') }),
  ],
  flowStateStore: 'firebase',
  traceStore: 'firebase',
  enableTracingAndMetrics: true,
  logLevel: 'debug',
});

export async function generateItinerary(
  previousState: null | undefined | MyResult['itineraries'],
  formData: FormData,
): Promise<MyResult['itineraries'] | undefined> {
  const request = formData.get('request');
  const imagesBlobs = formData.getAll('images[]') as File[];

  let images: string[] = [];
  if (imagesBlobs[0].size != 0) {
    images = await Promise.all(
      imagesBlobs.map(
        async (blob) =>
          `data:${blob.type};base64,${Buffer.from(await blob.arrayBuffer()).toString('base64')}`,
      ),
    );
  }

  const responseJson = await runFlow(itineraryGenerator, {
    request: request!.toString(),
    images,
  });

  if ((responseJson as MyResult).itineraries) {
    return (responseJson as MyResult).itineraries;
  }
}

interface BPlace {
  knownFor: string;
  ref: string;
  country: string;
  continent: string;
  tags: string[];
  imageUrl: string;
  name: string;
}

export interface ActivitiesRoot {
  activities: Activity[];
}

export interface Activity {
  duration: number;
  timeOfDay: string;
  locationName: string;
  familyFriendly: boolean;
  destinationRef: string;
  ref: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

const getPlaceActivities = async (placeID: string) => {
  const result = await getActivitiesForPlace(dc, {placeId: placeID});
  
  return  result.data.activities;
};

const QueryOptions = z.object({
  k: z.number().optional(),
});

export interface PlacesEmbeddingSimilarity {
  continent: string;
  ref: string;
  name: string;
  tags: string[];
  country: string;
  imageUrl: string;
  knownFor: string;
}

const placeRetriever = defineRetriever(
  {
    name: 'postgres-placeRetriever',
    configSchema: QueryOptions,
  },
  async (input, options) => {
    const result = await getNearestPlace(dc, { placeDescription: input.text() });

    const resultData = result.data;
    return {
      documents: resultData.places_embedding_similarity.map(
        (row: PlacesEmbeddingSimilarity) => {
          const { knownFor, ...metadata } = row;
          return Document.fromText(knownFor, metadata);
        },
      ),
    };
  },
);

const tripPlan = async (request: string, location: BPlace) => {
  let selectedLocation = location;
  const locationActivities = await getPlaceActivities(selectedLocation.ref);
  const activityDescs = locationActivities.map((value) => {
    return `{Name: ${value.name} Activity: ${value.description} Location: ${value.locationName}, timeofday: ${value.timeOfDay}, price: ${value.price}, familyFriendly: ${value.familyFriendly}, duration: ${value.duration}}, ref: ${value.ref}`;
  });
  const itineraryPrompt = await prompt('itineraryGen');
  const result = await itineraryPrompt.generate({
    input: {
      request: request,
      place: selectedLocation!.name,
      placeImgUrl: selectedLocation!.imageUrl,
      placeDescription: selectedLocation!.knownFor,
      activities: activityDescs,
    },
  });
  var value = JSON.stringify(result.output());
  var newValue = JSON.parse(value);
  newValue['itineraryImageUrl'] = selectedLocation!.imageUrl;
  newValue['placeRef'] = selectedLocation!.ref;
  for (var i = 0; i < newValue['itinerary'].length; i++) {
    const day = newValue['itinerary'][i];
    for (var j = 0; j < day['planForDay'].length; j++) {
      const ar = day['planForDay'][j]['activityRef'];
      day['planForDay'][j]['imgUrl'] =
        `https://storage.googleapis.com/tripedia-images/activities/${selectedLocation!.ref}_${ar}.jpg`;
    }
  }
  return newValue;
};

const itineraryGenerator = defineFlow(
  {
    name: 'itineraryGenerator',
    inputSchema: z.object({
      request: z.string(),
      images: z.array(z.string()).optional(),
    }),
    outputSchema: z.unknown(),
  },
  async (tripDetails) => {
    const placeDescription = await run('getPlaceDescription', async () => {
      console.log("HIHIHIHIHIHIHIHIHI" + tripDetails.images);
      if (!tripDetails.images || tripDetails.images.length === 0 || tripDetails.images[0] == "") {
        return '';
      }
      const imgDescription = await prompt('imgDescription');
      const result = await imgDescription.generate({
        input: { images: tripDetails.images },
      });
      return result.text();
    });
    const location = await run('determineLocation', async () => {
      const docs = await retrieve({
        retriever: placeRetriever,
        query: `Given the following information about a location, determine which location matches this description : ${placeDescription} ${tripDetails.request}`,
        options: {
          k: 3,
        },
      });
      let v: Array<BPlace> = new Array();
      docs.forEach((doc) => {
        v.push({
          knownFor: doc.toJSON().content[0].text!,
          ref: doc.toJSON().metadata!.ref,
          country: doc.toJSON().metadata!.country,
          continent: doc.toJSON().metadata!.continent,
          imageUrl: doc.toJSON().metadata!.imageUrl,
          tags: doc.toJSON().metadata!.tags,
          name: doc.toJSON().metadata!.name,
        });
      });
      return v;
    });
    const loc0 = run('locDetails1', (): Promise<unknown> => {
      return tripPlan(tripDetails.request!, location[0]);
    });
    const loc1 = run('locDetails2', (): Promise<unknown> => {
      return tripPlan(tripDetails.request!, location[1]);
    });
    const loc2 = run('locDetails3', (): Promise<unknown> => {
      return tripPlan(tripDetails.request!, location[2]);
    });
    const allTogether = await run('allTogether', async () => {
      const results = await Promise.all([loc0, loc1, loc2]);
      const itineraries = { itineraries: [...(results as Destination[])] };
      return itineraries;
    });

    return allTogether;
  },
);
