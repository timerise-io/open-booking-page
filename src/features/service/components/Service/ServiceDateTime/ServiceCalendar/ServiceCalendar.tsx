import { SkeletonBox } from "components/layout/SkeletonBox";
import { LOADERS, useUiStore } from "state/stores";
import ServiceCalendarWrapper from "./ServiceCalendarWrapper";

const ServiceCalendar = () => {
  const loading = useUiStore((state) => state.loaders[LOADERS.SERVICE_SLOTS] ?? true);

  if (loading)
    return (
      <>
        <SkeletonBox version="secondary" w="100%" h="50px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
      </>
    );

  return <ServiceCalendarWrapper />;
};

export default ServiceCalendar;
