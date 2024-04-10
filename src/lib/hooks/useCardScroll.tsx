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

import { useState, useRef, useEffect } from 'react';

export function useCardScroll() {
  const [currentCard, setCurrentCard] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (cardsRef.current) {
        const container = cardsRef.current;
        const cards = Array.from(container.children) as HTMLElement[];
        const containerMidpoint =
          container.scrollLeft + container.offsetWidth / 2;

        let closestIndex = 0;
        let smallestDistance = Infinity;

        cards.forEach((card, index) => {
          const cardMidpoint = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(cardMidpoint - containerMidpoint);

          if (distance < smallestDistance) {
            smallestDistance = distance;
            closestIndex = index;
          }
        });

        setCurrentCard(closestIndex);
      }
    };

    const current = cardsRef.current;
    if (current) {
      current.addEventListener('scroll', handleScroll, { passive: true });
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return { cardsRef, currentCard };
}
