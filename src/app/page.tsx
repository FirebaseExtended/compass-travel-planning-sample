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

import Link from 'next/link';

import TiltedCardsAnimation from '@/components/TiltedCardsAnimation';
import { GEMINI, LEGACY } from '@/lib/routes';

export default function Home() {
  return (
    <main className="container flex flex-col justify-between items-center min-h-[100dvh] sm:min-h-fit bg-background">
      {/* Animated images */}
      <TiltedCardsAnimation />

      {/* CTAs */}
      <section className="flex flex-col gap-3.5 w-full p-5">
        <Link
          href={LEGACY.HOME}
          className="text-background bg-foreground w-full p-3 rounded-xl text-lg text-center font-medium"
        >
          Find my dream trip
        </Link>

        <Link
          href={GEMINI.HOME}
          className="w-full p-3 rounded-xl text-lg text-center font-medium gradient text-background animate-shadow"
        >
          Plan my dream trip with AI
        </Link>
      </section>
    </main>
  );
}
