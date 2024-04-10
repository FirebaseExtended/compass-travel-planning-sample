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
import { useState } from 'react';

import DatePicker from '@/components/DatePicker';
import DestinationCarousel from '@/components/DestinationCarousel';
import GuestStepper from '@/components/GuestStepper';
import HomeButton from '@/components/HomeButton';
import SearchInput from '@/components/SearchInput';
import { useFormattedDates } from '@/lib/hooks/useFormattedDates';
import { LEGACY } from '@/lib/routes';

export default function LegacySearchPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dates, setDates] = useState<Date[]>([]);
  const [destination, setDestination] = useState<string>('');
  const [guests, setGuests] = useState(1);

  const formattedDates = useFormattedDates(dates);

  const router = useRouter();

  return (
    <main className="container relative flex flex-col gap-6 bg-background">
      <HomeButton className="border-gray-100" />

      <section className="flex flex-col gap-6 py-5">
        <div className="px-5">
          <SearchInput />
        </div>

        <DestinationCarousel
          selectedDestination={destination}
          setSelectedDestination={setDestination}
        />

        <div className="relative">
          <div className="absolute flex flex-col gap-6 w-full px-5">
            {/* Date picker button */}
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className={clsx(
                'p-5 flex justify-between items-center border border-gray-100 rounded-xl text-lg transition-transform duration-300 ease-in-out',
                showCalendar ? '-translate-x-[120%]' : 'translate-x-0',
              )}
            >
              When
              <span
                className={clsx({
                  'text-gray-400 font-normal': dates.length === 0,
                })}
              >
                {dates.length === 0 ? 'Add Dates' : formattedDates}
              </span>
            </button>

            {/* Total guests */}
            <GuestStepper
              hide={showCalendar}
              guests={guests}
              setGuests={setGuests}
            />
          </div>

          {/* Calendar date picker */}
          <DatePicker
            hide={!showCalendar}
            selectedDates={dates}
            setSelectedDates={(dates) => setDates(dates)}
          />
        </div>
      </section>

      {/* Actions and navigation */}
      <section className="fixed bottom-0 w-full sm:container transition-transform duration-300 ease-in-out flex justify-between items-center p-5">
        <button
          type="button"
          className={clsx(
            'duration-200 py-3 ease-in-out',
            showCalendar
              ? 'opacity-100 w-16 translate-x-0'
              : 'opacity-0 w-0 -translate-x-10',
            dates.length > 0
              ? 'text-foreground'
              : 'text-gray-400 pointer-events-none',
          )}
          onClick={() => setDates([])}
          disabled={dates.length === 0}
        >
          Clear
        </button>

        <button
          className={clsx(
            'p-3 rounded-xl text-lg text-center text-background font-medium bg-foreground transition-all duration-300 ease-in-out disabled:bg-black/20',
            showCalendar ? 'w-28' : 'w-full',
          )}
          onClick={() =>
            showCalendar
              ? setShowCalendar(false)
              : router.push(
                  `${LEGACY.RESULTS}/?${new URLSearchParams({
                    destination: destination,
                    checkIn: dates[0]?.toISOString().split('T')[0],
                    checkOut: dates[1]?.toISOString().split('T')[0],
                    guests: guests.toString(),
                  })}`,
                )
          }
          disabled={
            !showCalendar && (!destination || formattedDates === '' || !guests)
          }
        >
          {showCalendar ? 'Confirm' : 'Search'}
        </button>
      </section>
    </main>
  );
}
