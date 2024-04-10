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

type Props = {
  date: string;
  name: string;
  description: string;
  imgUrl: string;
  delay?: number;
  theme?: 'light' | 'dark';
  index: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export default function AnimatedActivityCard({
  date,
  name,
  description,
  imgUrl,
  delay,
  theme,
  index,
  activeIndex,
  setActiveIndex,
}: Props) {
  return (
    <article
      className={clsx(
        'relative flex items-center gap-4 cursor-pointer z-10 animate-fade-in opacity-0',
        theme === 'dark' ? 'text-gray-400' : 'text-contrast-secondary',
        { 'min-h-20': activeIndex === index },
      )}
      style={{ animationDelay: delay ? `${delay}ms` : '0s' }}
      onClick={() => setActiveIndex(index)}
    >
      <div
        className={clsx(
          'relative flex',
          activeIndex === index ? '' : 'gap-2 items-center h-5 ml-0.5',
        )}
      >
        <div
          className={clsx(
            'transition-all duration-[400ms] ease-in-out',
            activeIndex === index
              ? 'w-20 h-20'
              : 'h-1.5 w-1.5 border border-contrast-secondary rounded-full translate-x-1',
          )}
        >
          {/* Activity photo */}
          <Image
            src={imgUrl}
            alt={name}
            height={100}
            width={100}
            className={clsx(
              'object-cover rounded-lg flex-shrink-0 transition-all duration-[400ms] ease-in-out bg-gray-200',
              activeIndex === index
                ? 'w-20 h-20 opacity-100'
                : 'w-0 h-0 opacity-0',
            )}
          />
        </div>
        <span
          className={clsx(
            'absolute left-[6.5px] w-[1px] bg-contrast-secondary',
            activeIndex >= index ? 'top-3' : 'bottom-3',
            index === activeIndex + 1 ? 'h-[28.5px]' : 'h-9',
            activeIndex === index ? 'hidden' : 'block',
          )}
        />
      </div>

      {/* Date/time, activity name, and description */}
      <div className="w-full flex flex-col justify-between gap-1">
        <span
          className={clsx(
            'text-[10px] line-clamp-1',
            activeIndex === index ? 'block' : 'hidden',
          )}
        >
          {date}
        </span>

        <h3
          className={clsx(
            'line-clamp-1 leading-[1.3]',
            theme === 'dark' ? 'text-background' : 'text-contrast-primary',
          )}
        >
          {name}
        </h3>

        <p
          className={clsx(
            'text-sm leading-[1.3] line-clamp-2',
            activeIndex === index ? 'block' : 'hidden',
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
