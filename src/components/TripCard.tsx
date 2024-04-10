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
import Link from 'next/link';
import clsx from 'clsx';
import Tags from './Tags';
import { Tag } from '@/lib/gemini/types';

type Props = {
  image: string;
  size: 'sm' | 'lg';
  title: string;
  description?: string;
  tags: Tag[];

  onClick: () => void;
};

export default function TripCard({
  image,
  size,
  title,
  description,
  tags,
  onClick,
}: Props) {
  return (
    <div
      className={clsx(
        'cursor-pointer snap-start relative w-full h-full overflow-hidden animate-fade-in opacity-0 before:absolute before:bottom-0 before:rounded-2xl before:h-56 before:w-full before:bg-gradient-to-t before:from-black/40',
        size === 'sm' ? '' : 'min-w-[352px]',
      )}
      onClick={onClick}
    >
      {/* Cover image */}
      <Image
        src={image}
        alt={title}
        width={300}
        height={300}
        className={clsx(
          'w-full object-cover rounded-2xl bg-gray-200',
          size === 'sm' ? 'h-56' : 'h-[608px]',
        )}
        placeholder="blur"
        blurDataURL={image}
        priority
      />

      <div
        className={clsx(
          'absolute bottom-0 flex flex-col',
          size === 'sm' ? 'p-3 gap-1.5' : 'p-5 gap-4',
        )}
      >
        {/* Title (and date range) */}
        <div
          className={clsx(
            'text-background font-display font-medium leading-[1.1] flex flex-col gap-1.5',
            size === 'sm' ? 'text-base' : 'text-[32px]',
          )}
        >
          {title}
        </div>

        {/* Tags */}
        <Tags tags={tags} size={size} />

        {/* Desciption (large card variation only) */}
        {description && size === 'lg' && (
          <p className="text-sm leading-[1.4]">{description}</p>
        )}
      </div>
    </div>
  );
}
