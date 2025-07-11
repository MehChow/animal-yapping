"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";

type UploadCallback = (info: CloudinaryUploadWidgetInfo) => void;

interface CloudinaryUploadContextType {
  openUploadWidget: (options: {
    folder: string;
    game: string;
    onSuccess: UploadCallback;
  }) => void;
}

const CloudinaryUploadContext = createContext<
  CloudinaryUploadContextType | undefined
>(undefined);

export const useCloudinaryUpload = () => {
  const ctx = useContext(CloudinaryUploadContext);
  if (!ctx)
    throw new Error(
      "useCloudinaryUpload must be used within CloudinaryUploadProvider"
    );
  return ctx;
};

export const CloudinaryUploadProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const openFnRef = useRef<(() => void) | null>(null);
  const onSuccessRef = useRef<UploadCallback | null>(null);
  const [widgetOptions, setWidgetOptions] = useState<{
    folder: string;
    game: string;
  } | null>(null);

  const openUploadWidget = ({
    folder,
    game,
    onSuccess,
  }: {
    folder: string;
    game: string;
    onSuccess: UploadCallback;
  }) => {
    setWidgetOptions({ folder, game });
    onSuccessRef.current = onSuccess;
    // Wait for the next tick to ensure openFnRef is set
    setTimeout(() => {
      openFnRef.current?.();
    }, 0);
  };

  return (
    <CloudinaryUploadContext.Provider value={{ openUploadWidget }}>
      {children}
      <CldUploadWidget
        key={
          widgetOptions ? widgetOptions.folder + widgetOptions.game : "default"
        }
        uploadPreset="animal-yapping-preset"
        options={{
          folder: widgetOptions?.folder,
          resourceType: "video",
        }}
        onSuccess={(result) => {
          if (result.event === "success" && onSuccessRef.current) {
            onSuccessRef.current(result.info as CloudinaryUploadWidgetInfo);
          }
        }}
      >
        {({ open }) => {
          openFnRef.current = open;
          return null;
        }}
      </CldUploadWidget>
    </CloudinaryUploadContext.Provider>
  );
};
