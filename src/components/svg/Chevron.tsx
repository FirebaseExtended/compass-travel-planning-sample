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

type Props = {
  className?: string;
};

export default function Chevron({ className }: Props) {
  return (
    <svg
      className={className}
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9024 7.64163L12.6303 6.36957L7.21729 11.7826L12.6303 17.1957L13.9024 15.9236L9.77044 11.7826L13.9024 7.64163Z"
        fill="currentColor"
      />
      <mask
        id="mask0_178_1533"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="7"
        y="6"
        width="7"
        height="12"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.9024 7.64163L12.6303 6.36957L7.21729 11.7826L12.6303 17.1957L13.9024 15.9236L9.77044 11.7826L13.9024 7.64163Z"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_178_1533)"></g>
    </svg>
  );
}
