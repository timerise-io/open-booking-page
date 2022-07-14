import ImageCarousel from "components/ImageCarousel/ImageCarousel";
import { SkeletonBox } from "components/layout/SkeletonBox";
import React from "react";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import { themeSelector } from "state/selectors/theme";

const ServiceImageCarousel = () => {
  const serviceData = useRecoilValue(serviceAtom);
  const themeMode = useRecoilValue(themeSelector);

  if (!serviceData) {
    return <SkeletonBox style={{ flexGrow: 1 }} />;
  }

  const images = [
    ...(serviceData.images.length === 0
      ? [
          themeMode === "light"
            ? "https://cdn.timerise.io/booking-page/placeholder-light.jpg"
            : "https://cdn.timerise.io/booking-page/placeholder-dark.jpg",
        ]
      : serviceData.images),
  ];

  return <ImageCarousel images={images} />;
};

export default ServiceImageCarousel;
