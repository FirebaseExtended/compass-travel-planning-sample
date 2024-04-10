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

import { useCallback, useEffect, useState } from 'react';

import { Destination } from '@/lib/gemini/types';
import { DESTINATION_LOCAL_STORAGE_KEY } from '@/lib/constants';

export default function useDestination() {
  const [destination, setDestination] = useState<
    Destination | undefined | null
  >();

  const setDestinationInLocalStorage = useCallback(
    (newDestination: Destination | undefined | null) => {
      localStorage.setItem(
        DESTINATION_LOCAL_STORAGE_KEY,
        JSON.stringify(newDestination),
      );
    },
    [],
  );

  /**
   * Update localStorage when destination changes
   */
  useEffect(() => {
    if (destination !== undefined) {
      setDestinationInLocalStorage(destination);
    }
  }, [destination, setDestinationInLocalStorage]);

  /**
   * Set destination from localStorage on load
   */
  useEffect(() => {
    const localStorageDestination = localStorage.getItem(
      DESTINATION_LOCAL_STORAGE_KEY,
    );

    try {
      if (localStorageDestination) {
        setDestination(JSON.parse(localStorageDestination));
        return;
      }
    } catch (e) {
      // JSON.parse error, ignore and set destination null
    }

    setDestination(null);
  }, []);

  return { destination, setDestination };
}
