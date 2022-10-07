import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loaderAtom, LOADERS } from "state/atoms/loader";
import { serviceAtom } from "state/atoms/service";
import { serviceSlotsAtom } from "state/atoms/serviceSlots";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import {
  ServiceQueryResult,
  ServiceQueryVariables,
  ServiceSlotsQueryResult,
  ServiceSlotsQueryVariables,
} from "../api/queries/models";
import { GET_SERVICE, GET_SERVICE_SLOTS } from "../api/queries/queries";
import { slotsFilterSelector } from "state/selectors/slotFilterSelector";
import { slotsViewConfiguration } from "state/selectors/slotsViewConfiguration";
import { timeZoneAtom } from "state/atoms/timeZone";
import { TIMERISE_LOGO_URL } from "helpers/constans";
import addDays from "date-fns/addDays";
import { useLangParam } from "features/i18n/useLangParam";

export const useServiceSlotsState = (serviceId: string) => {
  const isServiceLoaded = !!useRecoilValue(serviceAtom);
  const navigate = useNavigate();
  const setServiceSlots = useSetRecoilState(serviceSlotsAtom);
  const {
    firstDayDate,
    fetchDate: fetchFrom,
    triggerId,
  } = useRecoilValue(slotsFilterSelector);

  const { maxDaysPerPage } = useRecoilValue(slotsViewConfiguration);
  const setServiceSlotsLoader = useSetRecoilState(
    loaderAtom(LOADERS.SERVICE_SLOTS)
  );
  const setSlotsFilter = useSetRecoilState(slotsFiltersAtom);

  const fetchTo = `${
    addDays(new Date(fetchFrom), maxDaysPerPage).toISOString().split("T")[0]
  }T23:59:59Z`;

  const {
    loading: slotsLoading,
    data: slotsData,
    error: slotsError,
    refetch,
  } = useQuery<ServiceSlotsQueryResult, ServiceSlotsQueryVariables>(
    GET_SERVICE_SLOTS,
    {
      fetchPolicy: "no-cache",
      variables: {
        serviceId: serviceId,
        from: fetchFrom,
        to: fetchTo,
      },
      skip: isServiceLoaded === false,
    }
  );

  useEffect(() => {
    if (triggerId !== 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerId]);

  useEffect(() => {
    if (slotsData && slotsData.service) {
      const { slots } = slotsData.service;
      setServiceSlots(slots);
    }
  }, [slotsData, setServiceSlots]);

  useEffect(() => {
    if (slotsError || slotsData?.service === null) navigate("/");
  }, [slotsError, navigate, slotsData]);

  useEffect(() => {
    setServiceSlotsLoader(slotsLoading);
    if (fetchFrom !== firstDayDate)
      setSlotsFilter({
        pageSize: 7,
        fetchDate: fetchFrom,
        firstDayDate: fetchFrom,
        triggerId,
      });
  }, [
    slotsLoading,
    setServiceSlotsLoader,
    fetchFrom,
    firstDayDate,
    setSlotsFilter,
    triggerId,
  ]);
};

export const useServiceState = (serviceId: string, lang: string | null) => {
  const navigate = useNavigate();

  const { loading, data, error } = useQuery<
    { service?: ServiceQueryResult },
    ServiceQueryVariables
  >(GET_SERVICE, {
    ...(lang && {
      context: {
        headers: {
          "Accept-Language": lang,
        },
      },
    }),
    fetchPolicy: "no-cache",
    variables: {
      serviceId: serviceId,
    },
    skip: serviceId === "",
  });

  const setTimeZone = useSetRecoilState(timeZoneAtom);
  const setService = useSetRecoilState(serviceAtom);
  const setServiceLoader = useSetRecoilState(loaderAtom(LOADERS.SERVICE));
  const [slotsFilter, setSlotsFilter] = useRecoilState(slotsFiltersAtom);

  useEffect(() => {
    if (data && data.service) {
      const { service } = data;

      if (service.project.localTimeZone) {
        setTimeZone(service.project.localTimeZone);
      }

      setService({
        serviceId: service.serviceId,
        project: {
          ...service.project,
          logoUrl: service.project.logoUrl ?? TIMERISE_LOGO_URL,
        },
        title: service.title,
        description: service.description,
        price: service.price ?? 0,
        promoPrice: service.promoPrice,
        currency: service.currency,
        locations: (service.locations ?? [{ title: "" }]).map(
          (item) => item.title
        ),
        hostedBy:
          service.hosts.length > 1
            ? `${service.hosts[0].fullName} +${service.hosts.length - 1}`
            : service.hosts?.[0]?.fullName ?? "-",
        dateTimeTo: service.dateTimeTo,
        dateTimeFrom: service.dateTimeFrom,
        images: service.media.map((item) => item.url),
        formFields: [...service.formFields],
        viewConfig: {
          slot: {
            duration: service.viewConfig.slot?.duration ?? false,
            quantity: service.viewConfig.slot?.quantity ?? false,
          },
        },
      });

      setSlotsFilter({
        ...slotsFilter,
        fetchDate: service.dateTimeFrom,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setService, setTimeZone, setSlotsFilter]);

  useEffect(() => {
    if (error || data?.service === null) navigate("/");
  }, [error, navigate, data]);

  useEffect(() => {
    setServiceLoader(loading);
  }, [loading, setServiceLoader]);
};

export const useService = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useServiceState(id!, lang);
  useServiceSlotsState(id!);
};
