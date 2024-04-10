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
import { memo } from 'react';

type Props = {
  name: string;
  activityRef: string;
  date: string;
  photo: string;
  delay?: number;
  toggleSelected: (ref: string) => void;
};

const ActionableActivityCard = memo(function ActionableActivityCard({
  date,
  activityRef,
  name,
  photo,
  delay,
  toggleSelected,
}: Props) {
  return (
    <label
      htmlFor={activityRef}
      className="relative flex gap-4 cursor-pointer animate-fade-in opacity-0"
      style={{ animationDelay: delay ? `${delay}ms` : '0s' }}
    >
      {/* Activity photo */}
      <Image
        src={photo}
        alt={name}
        height={500}
        width={500}
        className="object-cover rounded-lg h-20 w-20 flex-shrink-0 bg-gray-200"
        placeholder="blur"
        blurDataURL={photo}
      />

      {/* Date/time and activity name */}
      <div className="w-full flex flex-col justify-between gap-2.5 pr-10">
        <div className="text-base flex flex-col gap-1 leading-[1.2]">
          <span className="text-[10px] text-gray-400 line-clamp-1">{date}</span>

          <h3 className="line-clamp-1">{name}</h3>
        </div>

        <button
          type="button"
          className="text-gray-400 text-sm w-fit px-4 py-2.5 border border-gray-100 rounded-lg leading-[1] font-medium"
          disabled
        >
          Learn more
        </button>
      </div>

      {/* Checkbox (visual-only) */}
      <input
        type="checkbox"
        id={activityRef}
        name="activities[]"
        onChange={() => toggleSelected(activityRef)}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
      />
    </label>
  );
});

export default ActionableActivityCard;
