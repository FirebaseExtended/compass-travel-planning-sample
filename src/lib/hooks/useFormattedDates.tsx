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

import { useMemo } from 'react';

const format = (day: number) => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const useFormattedDates = (dates: Date[]) => {
  return useMemo(() => {
    if (dates.length === 0) {
      return '';
    } else if (dates.length === 1) {
      const date = dates[0];
      return `${format(date.getDate())} ${date.toLocaleString('default', {
        month: 'long',
      })}`;
    } else {
      const firstDate = dates[0];
      const lastDate = dates[dates.length - 1];
      return `${format(firstDate.getDate())}-${format(
        lastDate.getDate(),
      )} ${firstDate.toLocaleString('default', { month: 'long' })}`;
    }
  }, [dates]);
};
