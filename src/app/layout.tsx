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

import type { Metadata } from 'next';
import './globals.scss';
import { Rubik, Lato } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-display',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Compass',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex items-center justify-center min-h-[100dvh]">
      <body
        className={`${rubik.variable} ${lato.variable} font-sans text-foreground flex justify-center sm:-translate-y-0 h-full sm:h-[800px] sm:bg-gray-200 w-full sm:max-w-[412px] sm:shadow-2xl`}
      >
        {children}
      </body>
    </html>
  );
}
