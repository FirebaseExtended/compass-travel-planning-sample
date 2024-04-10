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

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import BackButton from '@/components/BackButton';
import HomeButton from '@/components/HomeButton';
import TripCard from '@/components/TripCard';
import { useCardScroll } from '@/lib/hooks/useCardScroll';
import { GEMINI } from '@/lib/routes';
import { Tag } from '@/lib/gemini/types';

import useDestination from '@/lib/useDestination';
import useDestinations from '@/lib/useDestinations';

export default function GeminiResultsPage() {
  const router = useRouter();
  const { cardsRef, currentCard } = useCardScroll();
  const { destinations } = useDestinations();
  const { setDestination } = useDestination();

  useEffect(() => {
    if (destinations === null) {
      router.push(GEMINI.HOME);
    }
  }, [destinations, router]);

  return (
    <main className="relative text-background bg-surface w-full">
      <BackButton
        href={GEMINI.HOME}
        className="text-black bg-black/10 border-white/20 backdrop-blur-xl"
      />

      <HomeButton className="text-black bg-black/10 border-white/20 backdrop-blur-xl" />

      <section className="container relative flex flex-col items-center gap-6 w-full transition-opacity duration-300 ease-in-out py-5">
        <header className="text-black w-full text-center text-lg h-16 flex justify-center items-center">
          Dream Trips
        </header>

        {/* Scrollable cards */}
        <div
          ref={cardsRef}
          className="w-screen sm:w-full flex gap-3 snap-mandatory snap-x overflow-x-auto px-5 scroll-px-5 max-lg:no-scrollbar lg:hover:scrollbar lg:pb-5 lg:hover:pb-3"
        >
          {destinations?.map((destination) => (
            <TripCard
              key={destination.itineraryName}
              size="lg"
              title={destination.itineraryName}
              description={destination.itineraryName}
              image={destination.itineraryImageUrl}
              tags={destination.tags as Tag[]}
              onClick={() => {
                setDestination(destination);
                router.push(GEMINI.BOOK);
              }}
            />
          ))}
        </div>

        {/* Current card indicator */}
        <div className="flex gap-2">
          {Array.from({ length: destinations?.length || 0 })?.map(
            (_, index) => (
              <div
                key={`card-indicator-${index}`}
                className={clsx(
                  'h-2 w-2 rounded-full bg-gray-300 transition-opacity duration-200 ease-in-out',
                  index === currentCard ? 'opacity-100' : 'opacity-20',
                )}
              />
            ),
          )}
        </div>
      </section>
    </main>
  );
}
