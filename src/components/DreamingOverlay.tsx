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
import { useFormStatus } from 'react-dom';
import { Stars } from './svg';
import Star from './svg/Star';

export default function DreamingOverlay() {
  const { pending: show } = useFormStatus();

  return (
    <div
      className={clsx(
        'container fixed inset-0 h-full bg-background-secondary flex flex-col gap-3 justify-center items-center transition-opacity duration-300 ease-in-out pointer-events-none',
        show ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="flex flex-col gap-3 items-center animate-fade-in z-20">
        <Stars gradient />
        <h2 className="text-[32px] font-medium font-display">Dreaming</h2>

        {/* Loading indicator */}
        <div className="relative w-[148px] bg-white/15 rounded-full h-1.5 overflow-hidden">
          <div
            className={clsx('absolute gradient h-full w-20 rounded-full', {
              'animate-loading': show,
            })}
          />
        </div>
      </div>

      <Image
        src="https://rstr.in/google/tripedia/x9b8ZmlQhod"
        height={500}
        width={500}
        alt="Coastal destination"
        className="absolute h-80 w-80 rounded-2xl object-cover animate-image-first z-10 bg-gray-200"
        priority
      />
      <Image
        src="https://rstr.in/google/tripedia/llRpA9RuvTy"
        height={500}
        width={500}
        alt="Beach destination"
        className="absolute h-48 w-64 rounded-2xl object-cover animate-image-second z-10 bg-gray-200"
      />
      <Image
        src="https://rstr.in/google/tripedia/Y292jg7Wr69"
        height={500}
        width={500}
        alt="City destination"
        className="absolute h-48 w-72 rounded-2xl object-cover animate-image-third z-20 bg-gray-200"
      />
      <Image
        src="https://rstr.in/google/tripedia/ANNOvZaekFJ"
        height={500}
        width={500}
        alt="Tropical destination"
        className="absolute h-20 w-20 rounded-2xl object-cover animate-image-fourth z-10 bg-gray-200"
      />

      {/* Stars */}
      <div className="absolute top-64 left-32 h-[3px] w-[3px] bg-background rounded-full animate-sparkle" />
      <Star className="absolute top-1/2 left-16 animate-sparkle [animation-delay:0.1s]" />
      <div className="absolute top-72 right-24 h-1 w-1 bg-background rounded-full animate-sparkle" />
      <Star className="absolute top-96 right-28 animate-sparkle scale-75 [animation-delay:0.2s]" />
      <Star className="absolute bottom-56 left-40 animate-sparkle scale-50" />
      <Star className="absolute bottom-40 left-32 animate-sparkle scale-75 [animation-delay:0.1s]" />
      <Star className="absolute bottom-20 left-20 animate-sparkle rotate-12" />
      <Star className="absolute bottom-14 left-28 animate-sparkle scale-75 [animation-delay:0.2s]" />
    </div>
  );
}
