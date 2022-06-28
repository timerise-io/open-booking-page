import { SkeletonBox } from "components/layout/SkeletonBox";
import { useRecoilValue } from "recoil";
import { loaderAtom, LOADERS } from "state/atoms/loader";
import ServiceCalendarWrapper from "./ServiceCalendarWrapper";

const ServiceCalendar = () => {
  const loading = useRecoilValue(loaderAtom(LOADERS.SERVICE_SLOTS));

  if (loading)
    return (
      <>
        <SkeletonBox version="secondary" w="100%" h="50px" />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
        <SkeletonBox version="secondary" w="100%" h="20px" mt={2.5} />
      </>
    );

  return <ServiceCalendarWrapper />;
};

export default ServiceCalendar;
