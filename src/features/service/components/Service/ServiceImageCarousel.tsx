import React from "react";
import ImageCarousel from "components/ImageCarousel/ImageCarousel";
import { SkeletonBox } from "components/layout/SkeletonBox";
import { useBookingStore, useTheme } from "state/stores";

const ServiceImageCarousel = () => {
  const serviceData = useBookingStore((state) => state.service);
  const themeMode = useTheme();

  if (!serviceData) {
    return <SkeletonBox style={{ flexGrow: 1 }} />;
  }

  const images = [
    ...(serviceData.images.length === 0
      ? [themeMode === "light" ? "/placeholder-light.jpg" : "/placeholder-dark.jpg"]
      : serviceData.images),
  ];

  return <ImageCarousel images={images} />;
};

export default ServiceImageCarousel;
