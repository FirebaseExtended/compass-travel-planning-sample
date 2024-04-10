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

import { useRef, useState } from 'react';

export const useImageUpload = () => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const limit = 3;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (limit - uploadedImages.length <= 0) return;
      const files = Array.from(event.target.files).slice(
        0,
        limit - uploadedImages.length,
      );
      const fileUrls = files.map((file) => URL.createObjectURL(file));
      setUploadedImages((prevImages) => [...prevImages, ...fileUrls]);
    }
  };

  return {
    uploadRef,
    uploadedImages,
    handleClick,
    handleChange,
  };
};
