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

import clsx from 'clsx';
import Image from 'next/image';
import { useFormattedDates } from '@/lib/hooks/useFormattedDates';

type Props = {
  date: Date;
  timeOfDay: string;
  name: string;
  description: string;
  imgUrl: string;
  delay?: number;
  theme?: 'light' | 'dark';
};

export default function ActivityCard({
  date,
  timeOfDay,
  name,
  description,
  imgUrl,
  delay,
  theme,
}: Props) {
  const formattedDate = useFormattedDates([new Date(date)]);

  return (
    <article
      className={clsx(
        'relative flex gap-4 items-center cursor-pointer z-10 animate-fade-in opacity-0',
        theme === 'dark' ? 'text-gray-400' : 'text-contrast-secondary',
      )}
      style={{ animationDelay: delay ? `${delay}ms` : '0s' }}
    >
      {/* Activity photo */}
      <Image
        src={imgUrl}
        alt={name}
        height={100}
        width={100}
        className="object-cover rounded-lg h-20 w-20 flex-shrink-0 bg-gray-200"
      />
      {/* Date/time, activity name, and description */}
      <div className="w-full flex flex-col justify-between gap-1">
        <span className="text-[10px] line-clamp-1">
          {formattedDate}, {timeOfDay}
        </span>

        <h3
          className={clsx(
            'line-clamp-1',
            theme === 'dark' ? 'text-background' : 'text-contrast-primary',
          )}
        >
          {name}
        </h3>

        <p className="text-sm leading-[1.3] line-clamp-2">{description}</p>
      </div>
    </article>
  );
}
