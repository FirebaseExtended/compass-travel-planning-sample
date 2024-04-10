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

import Image from 'next/image';
import { Fragment } from 'react';

import ActivityCard from '@/components/ActivityCard';
import BackButton from '@/components/BackButton';
import HomeButton from '@/components/HomeButton';
import Tags from '@/components/Tags';
import activitiesJson from '@/data/activities.json';
import destinationsJson from '@/data/destinations.json';
import { useFormattedDates } from '@/lib/hooks/useFormattedDates';
import { getActivitesByDay } from '@/lib/activities';
import { Tag } from '@/lib/gemini/types';
import ShareTrip from '@/components/ShareTrip';

export default function LegacyBookPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const destination =
    searchParams &&
    destinationsJson.find(
      (destination) => destination.ref === searchParams.place,
    );

  const activities =
    searchParams &&
    activitiesJson.filter((activity) =>
      searchParams.activity.includes(activity.ref),
    );

  const formattedDates = useFormattedDates([
    new Date(searchParams.checkIn as string),
    new Date(searchParams.checkOut as string),
  ]);

  const activitiesPerDay = getActivitesByDay(
    new Date(searchParams.checkIn as string),
    new Date(searchParams.checkOut as string),
    activities,
  );

  return (
    <main className="container relative w-full bg-foreground">
      <BackButton className="text-white bg-black/10 border-white/20 backdrop-blur-xl" />
      <HomeButton className="text-white bg-black/10 border-white/20 backdrop-blur-xl" />

      {/* Itinerary header */}
      {destination && (
        <>
          <header className="relative h-72 w-full">
            <Image
              src={destination.imageUrl}
              height={500}
              width={500}
              alt="Romantic Parisian Getaway"
              className="w-full h-72 object-cover [mask-image:linear-gradient(#000_25%,transparent_100%)] z-0 bg-gray-200"
              placeholder="blur"
              blurDataURL={destination.imageUrl}
              priority
            />

            <div className="flex flex-col gap-2 p-5 text-background absolute bottom-0 z-10">
              <h1 className="text-[32px] font-display font-medium leading-[1.1]">
                {destination.name}
              </h1>
              <p className="text-lg">{formattedDates}</p>
            </div>
          </header>

          <section className="relative flex flex-col gap-3.5 px-5 py-7 w-full">
            <p className="text-background opacity-60 leading-[1.4] text-sm">
              {destination.knownFor}
            </p>

            <div className="flex flex-wrap gap-2">
              <Tags tags={destination.tags as unknown as Tag[]} size="lg" />
            </div>
          </section>

          {/* Itinerary */}
          <section className="px-5 flex flex-col gap-5 pb-32">
            <h2 className="text-background text-lg">Your Chosen Activities</h2>

            {Object.entries(activitiesPerDay).map(
              ([day, activities], index) => {
                return (
                  <Fragment key={day}>
                    {['morning', 'afternoon', 'evening', 'night'].map(
                      (timeOfDay) => {
                        const activity = activities[timeOfDay];
                        if (!activity) return null;

                        return (
                          <ActivityCard
                            key={activity.ref}
                            name={activity.name}
                            description={activity.description}
                            date={new Date(day)}
                            timeOfDay={timeOfDay}
                            imgUrl={activity.imageUrl}
                            delay={index * 100}
                            theme="dark"
                          />
                        );
                      },
                    )}
                  </Fragment>
                );
              },
            )}
          </section>

          {/* Nonfunctional "Share Trip" button */}
          <div className="fixed bottom-0 w-full px-5 py-6 flex justify-between items-center bg-black/10 backdrop-blur-xl border-t border-[#e9e9e9]/15 z-20">
            <ShareTrip />
          </div>
        </>
      )}
    </main>
  );
}
