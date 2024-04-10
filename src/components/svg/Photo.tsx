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

export default function Photo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66699 29.3334C5.55588 29.3334 4.61144 28.9445 3.83366 28.1667C3.05588 27.389 2.66699 26.4445 2.66699 25.3334V6.66675C2.66699 5.55564 3.05588 4.61119 3.83366 3.83341C4.61144 3.05564 5.55588 2.66675 6.66699 2.66675H25.3337C26.4448 2.66675 27.3892 3.05564 28.167 3.83341C28.9448 4.61119 29.3337 5.55564 29.3337 6.66675V25.3334C29.3337 26.4445 28.9448 27.389 28.167 28.1667C27.3892 28.9445 26.4448 29.3334 25.3337 29.3334H6.66699ZM6.66699 26.6667H25.3337C25.7114 26.6667 26.0279 26.5387 26.283 26.2827C26.539 26.0276 26.667 25.7112 26.667 25.3334V6.66675C26.667 6.28897 26.539 5.97208 26.283 5.71608C26.0279 5.46097 25.7114 5.33341 25.3337 5.33341H6.66699C6.28921 5.33341 5.97233 5.46097 5.71633 5.71608C5.46121 5.97208 5.33366 6.28897 5.33366 6.66675V25.3334C5.33366 25.7112 5.46121 26.0276 5.71633 26.2827C5.97233 26.5387 6.28921 26.6667 6.66699 26.6667ZM8.00033 24.0001L13.3337 18.6667L15.7337 21.0334L18.667 17.3334L24.0003 24.0001H8.00033ZM10.667 13.3334C9.93366 13.3334 9.3061 13.0721 8.78433 12.5494C8.26166 12.0276 8.00033 11.4001 8.00033 10.6667C8.00033 9.93341 8.26166 9.30586 8.78433 8.78408C9.3061 8.26141 9.93366 8.00008 10.667 8.00008C11.4003 8.00008 12.0283 8.26141 12.551 8.78408C13.0728 9.30586 13.3337 9.93341 13.3337 10.6667C13.3337 11.4001 13.0728 12.0276 12.551 12.5494C12.0283 13.0721 11.4003 13.3334 10.667 13.3334Z"
        fill="url(#gradient)"
      />
      <defs>
        <linearGradient
          id="gradient"
          x1="-8.44412"
          y1="21.7472"
          x2="38.609"
          y2="15.2492"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--gradient-100" />
          <stop offset="0.411455" stopColor="var(--gradient-200)" />
          <stop offset="1" stopColor="var(--gradient-300)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
