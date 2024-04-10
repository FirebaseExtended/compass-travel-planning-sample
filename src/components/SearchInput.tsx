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

import { Search } from './svg';

export default function SearchInput() {
  return (
    <label className="relative flex items-center justify-center w-full">
      <input
        type="text"
        className="rounded-xl text-lg leading-[1] border border-gray-100 pl-14 pr-5 mr-[50px] py-5 w-full placeholder-gray-400 focus:outline-foreground"
        placeholder="Search destination"
      />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 rounded-lg pointer-events-none">
        <Search />
      </span>
    </label>
  );
}
