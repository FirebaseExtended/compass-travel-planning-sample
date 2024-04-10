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

import { Activity } from './legacy/types';

type ActivitiesByDay = {
  [day: string]: Record<string, Activity>;
};

export function getActivitesByDay(
  startDate: Date,
  endDate: Date,
  activities: Activity[],
): ActivitiesByDay {
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  const itemsByDay: ActivitiesByDay = {};

  for (let i = 0; i <= differenceInDays; i++) {
    const currentDate = new Date(startDate).setDate(startDate.getDate() + i);
    const formattedDate = new Date(currentDate)
      .toISOString()
      .split('T')[0] as string;

    itemsByDay[formattedDate] = {};

    activities.forEach((item, itemIndex) => {
      if (!itemsByDay[formattedDate][item.timeOfDay]) {
        itemsByDay[formattedDate][item.timeOfDay] = item;
        delete activities[itemIndex];
      }
    });
  }

  return itemsByDay;
}
