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

import { useEffect, useState } from 'react';

import { Destination } from '@/lib/gemini/types';
import { DESTINATIONS_LOCAL_STORAGE_KEY } from '@/lib/constants';

export default function useDestinations() {
  const [destinations, setDestinations] = useState<
    Destination[] | undefined | null
  >();

  useEffect(() => {
    const localStorageDestination = localStorage.getItem(
      DESTINATIONS_LOCAL_STORAGE_KEY,
    );

    try {
      if (localStorageDestination) {
        setDestinations(JSON.parse(localStorageDestination));
        return;
      }
    } catch (e) {
      // JSON.parse error, ignore and set destination null
    }

    setDestinations(null);
  }, []);

  return { destinations };
}
