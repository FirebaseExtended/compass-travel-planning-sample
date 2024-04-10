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

import clsx from 'clsx';
import HomeButton from './HomeButton';
import { Stars } from './svg';
import UploadImages from './UploadImages';
import { useFormStatus } from 'react-dom';

export default function FormFields({}) {
  const { pending } = useFormStatus();

  return (
    <>
      <HomeButton
        className={clsx(
          'bg-black/10 border-white/20 backdrop-blur-xl',
          pending ? 'text-white' : 'text-black',
        )}
      />

      <section className="flex flex-col gap-4 p-5 pt-8">
        <Stars gradient />

        <h1
          className={clsx(
            'font-display text-[32px] leading-[1.125] w-56 font-bold bg-clip-text text-transparent gradient',
            pending ? 'pointer-events-none' : '',
          )}
        >
          Dream Your Vacation
        </h1>

        {/* Prompt input field */}
        <textarea
          name="request"
          className="w-full resize-none text-foreground placeholder-gray-400 focus:outline-none h-[calc(100dvh-400px)] sm:h-[402px] bg-transparent"
          placeholder="Write anything"
          required
          disabled={pending}
        />
      </section>

      <section className="fixed bottom-0 w-full sm:container p-5 grid gap-3">
        {!pending && <UploadImages />}

        {/* CTA */}
        <button
          className="w-full p-3 rounded-xl text-lg text-center font-medium text-background bg-accent"
          type="submit"
          disabled={pending}
        >
          Plan My Dream Trip
        </button>
      </section>
    </>
  );
}
