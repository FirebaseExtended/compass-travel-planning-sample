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
  gradient?: boolean;
};

export default function Stars({ gradient }: Props) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.292 20.5829L11.5341 23.067C11.9544 23.9078 12.1646 24.3281 12.4454 24.6924C12.6945 25.0156 12.9843 25.3054 13.3075 25.5545C13.6718 25.8353 14.0922 26.0455 14.9329 26.4659L17.417 27.7079L14.9329 28.95C14.0922 29.3703 13.6718 29.5805 13.3075 29.8613C12.9843 30.1105 12.6945 30.4002 12.4454 30.7235C12.1646 31.0877 11.9544 31.5081 11.5341 32.3488L10.292 34.8329L9.04993 32.3488C8.62957 31.5081 8.4194 31.0877 8.13861 30.7235C7.88945 30.4002 7.59968 30.1105 7.27645 29.8613C6.91218 29.5805 6.49183 29.3703 5.65111 28.95L3.16699 27.7079L5.65111 26.4659C6.49183 26.0455 6.91218 25.8353 7.27645 25.5545C7.59968 25.3054 7.88945 25.0156 8.13861 24.6924C8.4194 24.3281 8.62957 23.9078 9.04993 23.067L10.292 20.5829Z"
        fill={gradient ? 'url(#paint0_linear_535_4062)' : 'currentColor'}
      />
      <path
        d="M23.7503 3.16626L25.6165 8.01826C26.063 9.1792 26.2863 9.75968 26.6334 10.2479C26.9411 10.6807 27.3192 11.0588 27.752 11.3665C28.2402 11.7137 28.8207 11.9369 29.9817 12.3834L34.8337 14.2496L29.9817 16.1157C28.8207 16.5623 28.2402 16.7855 27.752 17.1327C27.3192 17.4404 26.9411 17.8185 26.6334 18.2512C26.2863 18.7395 26.063 19.32 25.6165 20.4809L23.7503 25.3329L21.8842 20.4809C21.4377 19.32 21.2144 18.7395 20.8672 18.2512C20.5595 17.8185 20.1814 17.4404 19.7487 17.1327C19.2604 16.7855 18.6799 16.5623 17.519 16.1157L12.667 14.2496L17.519 12.3834C18.6799 11.9369 19.2604 11.7137 19.7487 11.3665C20.1814 11.0588 20.5595 10.6807 20.8672 10.2479C21.2144 9.75968 21.4377 9.1792 21.8842 8.01826L23.7503 3.16626Z"
        fill={gradient ? 'url(#paint1_linear_535_4062)' : 'currentColor'}
      />
      <defs>
        <linearGradient
          id="paint0_linear_535_4062"
          x1="-10.0275"
          y1="25.8243"
          x2="45.8481"
          y2="18.1079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#59B7EC" />
          <stop offset="0.411455" stopColor="#9A62E1" />
          <stop offset="1" stopColor="#E66CF9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_535_4062"
          x1="-10.0275"
          y1="25.8243"
          x2="45.8481"
          y2="18.1079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#59B7EC" />
          <stop offset="0.411455" stopColor="#9A62E1" />
          <stop offset="1" stopColor="#E66CF9" />
        </linearGradient>
      </defs>
    </svg>
  );
}
