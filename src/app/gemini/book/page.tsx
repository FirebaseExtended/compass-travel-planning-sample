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

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import BackButton from '@/components/BackButton';
import DayItinerary from '@/components/DayItinerary';
import HomeButton from '@/components/HomeButton';
import { Stars } from '@/components/svg';
import { GEMINI } from '@/lib/routes';
import useDestination from '@/lib/useDestination';

export default function GeminiBookPage() {
  const router = useRouter();
  const { destination } = useDestination();

  useEffect(() => {
    if (destination === null) {
      router.push(GEMINI.RESULTS);
    }
  }, [destination, router]);

  return (
    <main className="container relative w-full bg-surface">
      <BackButton className="bg-black/10 border-white/20 backdrop-blur-xl" />

      <HomeButton className="bg-black/10 border-white/20 backdrop-blur-xl" />

      {destination && (
        <>
          {/* Itinerary header */}
          <header className="relative h-72 w-full">
            <Image
              src={destination.itineraryImageUrl}
              height={500}
              width={500}
              alt="Romantic Parisian Getaway"
              className="w-full h-72 object-cover [mask-image:linear-gradient(#000_25%,transparent_100%)] z-0 bg-gray-200"
              placeholder="blur"
              blurDataURL={destination.itineraryImageUrl}
              priority
            />

            <div className="flex flex-col gap-2 p-5 text-contrast-primary absolute bottom-0 z-10">
              <Stars />

              <h1 className="text-[32px] font-display font-medium leading-[1.1]">
                {destination.itineraryName}
              </h1>
              <p className="text-lg">
                {new Date(destination.startDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
                {' - '}
                {destination.endDate}
              </p>
            </div>
          </header>

          {/* Itinerary */}
          <section className="px-5 flex flex-col gap-5 pb-32">
            {destination.itinerary.map((itinerary) => (
              <DayItinerary key={itinerary.day} itinerary={itinerary} />
            ))}
          </section>

          {/* Nonfunctional "Share Trip" button */}
          <div className="fixed bottom-0 w-full px-5 py-6 flex justify-between items-center bg-surface border-t border-contrast-quaternary z-20">
            <button
              className="w-full py-3 rounded-xl text-lg text-center text-background font-medium bg-accent"
              onClick={() => console.log('TODO: implement share trip')}
            >
              Share Trip
            </button>
          </div>
        </>
      )}
    </main>
  );
}
