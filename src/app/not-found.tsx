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

import { HOME } from '@/lib/routes';

export default function NotFound() {
  return (
    <main className="container flex flex-col gap-10 justify-center items-center min-h-[100dvh] sm:min-h-fit bg-background">
      <h1 className="text-[32px] font-display">Page not found</h1>

      <Link
        href={HOME}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
