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

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { LEGACY } from '@/lib/routes';
import HomeButton from '@/components/HomeButton';
import ActionableActivityCard from '@/components/ActionableActivityCard';
import BackButton from '@/components/BackButton';

import activitiesJson from '@/data/activities.json';

type Activity = {
  activity_id: number;
  activity_desc: string;
  place_id: number;
  date?: string;
  photo?: string;
};

export default function LegacyActivitiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { place } = searchParams;
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const { toString: searchParamsToString } = useSearchParams();

  const activities = activitiesJson.filter(
    (activity) => activity.destinationRef === place,
  );

  const daytimeActivities = useMemo(
    () =>
      activities.filter((activity) =>
        ['morning', 'afternoon'].includes(activity.timeOfDay),
      ),
    [activities],
  );

  const eveningActivities = useMemo(
    () =>
      activities.filter((activity) =>
        ['evening', 'night'].includes(activity.timeOfDay),
      ),
    [activities],
  );

  // TODO: figure out what to do with "any" time of day
  const anyActivites = useMemo(
    () => activities.filter((activity) => ['any'].includes(activity.timeOfDay)),
    [activities],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParamActivityIdString = selected
      .map((activity) => `activity=${activity}`)
      .join('&');

    router.push(
      `${LEGACY.BOOK}?${searchParamsToString()}&${searchParamActivityIdString}`,
    );
  };

  const toggleSelected = (ref: string) => {
    if (selected.includes(ref)) {
      setSelected((prev) => prev.filter((n) => n !== ref));
    } else {
      setSelected((prev) => [...prev, ref]);
    }
  };

  return (
    <main className="relative w-full bg-background overflow-y-auto">
      <BackButton className="bg-white/20 backdrop-blur-xl" />

      <HomeButton className="bg-white/20 border-gray-100 backdrop-blur-xl" />

      <form onSubmit={handleSubmit}>
        <section className="container relative flex flex-col gap-12 w-full transition-opacity duration-300 ease-in-out p-5 pb-24">
          <header className="w-full text-center text-lg h-16 flex justify-center items-center">
            Activities
          </header>

          {/* Morning and afternooon activities */}
          <div className="flex flex-col gap-5">
            Daytime
            {daytimeActivities.map((activity, index) => (
              <ActionableActivityCard
                key={activity.ref}
                activityRef={activity.ref}
                name={activity.name}
                date={activity.timeOfDay}
                photo={activity.imageUrl}
                delay={50 * index}
                toggleSelected={() => toggleSelected(activity.ref)}
              />
            ))}
          </div>

          {/* Evening activities */}
          <div className="flex flex-col gap-5">
            Evening
            {eveningActivities.map((activity, index) => (
              <ActionableActivityCard
                key={activity.ref}
                activityRef={activity.ref}
                name={activity.name}
                date={activity.timeOfDay}
                photo={activity.imageUrl}
                delay={50 * index + 50 * daytimeActivities.length}
                toggleSelected={() => toggleSelected(activity.ref)}
              />
            ))}
          </div>
        </section>

        {/* Amount of selected activities and confirm button */}
        <div
          className={clsx(
            'fixed bottom-0 w-full p-5 flex justify-between items-center bg-background',
            selected.length === 0
              ? 'opacity-0 pointer-events-none duration-0'
              : 'opacity-100 transition-opacity ease-in-out duration-200',
          )}
        >
          <button
            type="reset"
            className="py-3 w-fit text-gray-400"
            onClick={() => setSelected([])}
          >
            <span className="tabular-nums">{selected.length}</span> selected
          </button>

          <button
            className={clsx(
              'px-4 py-3 rounded-xl text-lg text-center text-background font-medium bg-foreground w-fit',
              { 'pointer-events-none': selected.length === 0 },
            )}
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </main>
  );
}
