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
import clsx from 'clsx';

type Props = {
  selectedDestination: string | null;
  setSelectedDestination: (destination: string) => void;
};

const destinations = [
  {
    image: 'https://rstr.in/google/tripedia/TmR12QdlVTT',
    title: 'Europe',
  },
  {
    image: 'https://rstr.in/google/tripedia/VJ8BXlQg8O1',
    title: 'Asia',
  },
  {
    image: 'https://rstr.in/google/tripedia/flm_-o1aI8e',
    title: 'South America',
  },
  {
    image: 'https://rstr.in/google/tripedia/-nzi8yFOBpF',
    title: 'Africa',
  },
  {
    image: 'https://rstr.in/google/tripedia/jlbgFDrSUVE',
    title: 'North America',
  },
  {
    image: 'https://rstr.in/google/tripedia/vxyrDE-fZVL',
    title: 'Oceania',
  },
  {
    image: 'https://rstr.in/google/tripedia/z6vy6HeRyvZ',
    title: 'Australia',
  },
];

export default function DestinationCarousel({
  selectedDestination,
  setSelectedDestination,
}: Props) {
  const toggleDestination = (title: string) => {
    setSelectedDestination(selectedDestination === title ? '' : title);
  };

  return (
    <div className="w-screen sm:w-full scroll-px-5 px-5 snap-mandatory snap-x flex gap-2 overflow-x-auto max-lg:no-scrollbar lg:hover:scrollbar lg:pb-5 lg:hover:pb-3">
      {destinations.map((destination, index) => (
        <button
          key={index}
          type="button"
          className={clsx(
            'snap-start relative flex justify-center items-center min-w-[140px] h-[140px] transition-opacity duration-200 ease-in-out rounded-2xl overflow-hidden before:absolute before:inset-0 before:bg-black/20 before:z-10',
            {
              'opacity-50':
                selectedDestination &&
                selectedDestination !== destination.title,
            },
          )}
          onClick={() => toggleDestination(destination.title)}
        >
          <Image
            src={destination.image}
            alt={destination.title}
            width={200}
            height={200}
            className="object-cover absolute inset-0 h-full w-full bg-gray-100"
            priority
          />

          <h3 className="z-20 w-1/2 text-center text-background text-lg leading-[1.2] font-medium pointer-events-none">
            {destination.title}
          </h3>
        </button>
      ))}
    </div>
  );
}
