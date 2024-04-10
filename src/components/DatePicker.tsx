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

import { useEffect } from 'react';
import clsx from 'clsx';
import Chevron from './svg/Chevron';
import { useDateSelection } from '@/lib/hooks/useDateSelection';

const days = Array.from({ length: 31 }, (_, i) => i + 1);

type Props = {
  hide: boolean;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
};

export default function DatePicker({
  hide,
  selectedDates,
  setSelectedDates,
}: Props) {
  const { handleSelectDate, isDateSelected, isFirstSelected, isLastSelected } =
    useDateSelection({ selectedDates, setSelectedDates });

  useEffect(() => {
    setSelectedDates(selectedDates);
  }, [selectedDates, setSelectedDates]);

  return (
    <div
      className={clsx(
        'absolute transition-transform duration-300 ease-in-out w-full',
        hide ? 'translate-x-[120%]' : 'translate-x-0',
      )}
    >
      <div className="border border-gray-100 rounded-xl p-5 flex flex-col gap-6 w-full max-w-[350px] mx-auto text-lg">
        <span className="font-medium">When would you like to go?</span>

        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center text-gray-400">
            <Chevron />
            <span className="text-base">May 2024</span>
            <Chevron className="rotate-180" />
          </div>

          <div className="grid grid-cols-7 text-base font-medium">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <span
                key={`${day} (${index + 1})`}
                className="text-center text-gray-400 h-11 w-full min-h-11"
              >
                {day}
              </span>
            ))}

            <button type="button" disabled aria-label="Blank space" />
            <button type="button" disabled aria-label="Blank space" />

            {days.map((day, index) => (
              <button
                key={day}
                className={clsx(
                  'relative flex items-center justify-center h-11 w-full min-h-11 flex-shrink-0 transition-colors before:transition-colors before:-z-10',
                  isFirstSelected(day) || isLastSelected(day)
                    ? 'bg-foreground text-background rounded-full before:bg-gray-100 before:h-11 before:w-full before:absolute before:inset-0'
                    : isDateSelected(day)
                      ? 'bg-gray-100 text-foreground'
                      : 'text-foreground hover:rounded-full',
                  {
                    'rounded-l-full before:rounded-l-full':
                      isFirstSelected(day) || (index + 2) % 7 === 0,
                    'rounded-r-full before:rounded-r-full':
                      isLastSelected(day) || (index - 3) % 7 === 1,
                    'before:rounded-r-full': selectedDates.length === 1,
                  },
                )}
                onClick={() => handleSelectDate(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
