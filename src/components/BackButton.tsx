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

import clsx from 'clsx';
import { Arrow } from './svg';
import { useRouter } from 'next/navigation';

type Props = {
  href?: string;
  className?: string;
};

export default function BackButton({ href, className }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={clsx(
        className,
        'fixed top-8 left-5 z-50 w-10 h-10 rounded-lg border flex justify-center items-center animate-fade-in',
      )}
      onClick={() => {
        href ? router.push(href) : window.history.back();
      }}
    >
      <Arrow />
    </button>
  );
}
