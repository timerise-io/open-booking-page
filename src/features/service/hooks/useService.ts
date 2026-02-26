import { useEffect } from "react";
import { addDays } from "date-fns";
import { useLangParam } from "features/i18n/useLangParam";
import { TIMERISE_LOGO_URL } from "helpers/constans";
import { isNetworkError } from "helpers/functions";
import { useParams } from "react-router-dom";
import { LOADERS, useBookingStore, useErrorStore, useFilterStore, useUiStore } from "state/stores";
import { useSlotFilter } from "state/stores";
import { useQuery } from "@apollo/client/react";
import packageJson from "../../../../package.json";
import {
  ServiceQueryResult,
  ServiceQueryVariables,
  ServiceSlotsQueryResult,
  ServiceSlotsQueryVariables,
} from "../api/queries/models";
import { GET_SERVICE, GET_SERVICE_SLOTS } from "../api/queries/queries";
import { useSlotsViewConfiguration } from "./useSlotsViewConfiguration";

export const useServiceSlotsState = (serviceId: string) => {
  const isServiceLoaded = !!useBookingStore((state) => state.service);
  const setServiceSlots = useBookingStore((state) => state.setServiceSlots);
  const setServiceError = useErrorStore((state) => state.setServiceError);
  const { firstDayDate, fetchDate: fetchFrom, triggerId, locations } = useSlotFilter();

  const { maxDaysPerPage } = useSlotsViewConfiguration();

  const setServiceSlotsLoader = useUiStore((state) => state.setLoader);
  const setSlotsFilter = useFilterStore((state) => state.setSlotsFilters);
  const setAllSlots = useBookingStore((state) => state.setSlots);

  const fetchTo = `${
    addDays(new Date(fetchFrom), maxDaysPerPage - 1)
      .toISOString()
      .split("T")[0]
  }T23:59:59Z`;

  const {
    loading: slotsLoading,
    data: slotsData,
    error: slotsError,
    refetch,
  } = useQuery<ServiceSlotsQueryResult, ServiceSlotsQueryVariables>(GET_SERVICE_SLOTS, {
    context: {
      headers: {
        "x-api-client-name": "open-booking-page",
      },
      version: packageJson.version,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    variables: {
      serviceId,
      from: fetchFrom,
      to: fetchTo,
      locations,
    },
    skip: !isServiceLoaded,
  });

  useEffect(() => {
    if (triggerId !== 0) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerId]);

  useEffect(() => {
    if (slotsData?.service) {
      const { slots } = slotsData.service;
      setAllSlots(slots);
      setServiceSlots(slots);
      setServiceError(null);
    }
  }, [slotsData, setServiceSlots, setAllSlots, setServiceError]);

  useEffect(() => {
    if (
      slotsError &&
      "networkError" in slotsError &&
      slotsError.networkError &&
      typeof slotsError.networkError === "object" &&
      "name" in slotsError.networkError &&
      slotsError.networkError.name === "AbortError"
    )
      return;

    if (slotsError || slotsData?.service === null) {
      setServiceError({
        type: isNetworkError(slotsError) ? "NETWORK_ERROR" : "SERVICE_NOT_FOUND",
        canRetry: isNetworkError(slotsError),
        refetch,
      });
    }
  }, [slotsError, slotsData, setServiceError, refetch]);

  useEffect(() => {
    setServiceSlotsLoader(LOADERS.SERVICE_SLOTS, slotsLoading);
    if (fetchFrom !== firstDayDate)
      setSlotsFilter({
        pageSize: 7,
        fetchDate: fetchFrom,
        firstDayDate: fetchFrom,
        triggerId,
        locations,
      });
  }, [slotsLoading, setServiceSlotsLoader, fetchFrom, firstDayDate, setSlotsFilter, triggerId, locations]);
};

export const useServiceState = (serviceId: string, lang: string | null) => {
  const setServiceError = useErrorStore((state) => state.setServiceError);

  const { loading, data, error, refetch } = useQuery<{ service?: ServiceQueryResult }, ServiceQueryVariables>(
    GET_SERVICE,
    {
      context: {
        headers: {
          ...(lang && { "Accept-Language": lang }),
          "x-api-client-name": "open-booking-page",
        },
        version: packageJson.version,
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables: {
        serviceId,
      },
      skip: serviceId === "",
    },
  );

  const setTimeZone = useUiStore((state) => state.setTimeZone);
  const setService = useBookingStore((state) => state.setService);
  const setServiceLoader = useUiStore((state) => state.setLoader);
  const slotsFilter = useFilterStore((state) => state.slotsFilters);
  const setSlotsFilter = useFilterStore((state) => state.setSlotsFilters);

  useEffect(() => {
    if (data?.service) {
      const { service } = data;

      if (service.project.localTimeZone) {
        //setTimeZone(service.project.localTimeZone);
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
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
        locations: (service.locations ?? [{ title: "" }]).map((item: { title: string }) => item.title),
        serviceLocations: service.locations,
        hostedBy:
          service.hosts.length > 1
            ? `${service.hosts[0].fullName} +${service.hosts.length - 1}`
            : (service.hosts?.[0]?.fullName ?? "-"),
        dateTimeTo: service.dateTimeTo,
        dateTimeFrom: service.dateTimeFrom,
        images: service.media.map((item: { url: string }) => item.url),
        formFields: [...service.formFields],
        viewConfig: {
          bookingStatus: { ...service.viewConfig.bookingStatus },
          paymentStatus: { ...service.viewConfig.paymentStatus },
          displayType: service.viewConfig.displayType,
          days: {
            duration: service.viewConfig.days.duration,
            maxSelect: service.viewConfig.days.maxSelect,
            minSelect: service.viewConfig.days.minSelect,
            multiSelect: service.viewConfig.days.multiSelect,
            quantity: service.viewConfig.days.quantity,
          },
          list: {
            duration: service.viewConfig.list.duration,
            maxSelect: service.viewConfig.list.maxSelect,
            minSelect: service.viewConfig.list.minSelect,
            multiSelect: service.viewConfig.list.multiSelect,
            quantity: service.viewConfig.list.quantity,
            showTime: service.viewConfig.list.showTime,
          },
          calendar: {
            maxRange: service.viewConfig.calendar.maxRange,
            maxSelect: service.viewConfig.calendar.maxSelect,
            minRange: service.viewConfig.calendar.minRange,
            minSelect: service.viewConfig.calendar.minSelect,
            multiSelect: service.viewConfig.calendar.multiSelect,
            rangeSelect: service.viewConfig.calendar.rangeSelect,
            quantity: service.viewConfig.calendar.quantity,
          },
          multiList: {
            duration: service.viewConfig.multiList.duration,
            quantity: service.viewConfig.multiList.quantity,
            showTime: service.viewConfig.multiList.showTime,
            multiSelect: service.viewConfig.multiList.multiSelect,
          },
          preorder: {
            duration: service.viewConfig.preorder.duration,
            quantity: service.viewConfig.preorder.quantity,
            showDate: service.viewConfig.preorder.showDate,
            showTime: service.viewConfig.preorder.showTime,
          },
        },
        paymentProviders: [...(service.paymentProviders ?? [])],
      });

      setSlotsFilter({
        ...slotsFilter,
        fetchDate: service.dateTimeFrom,
      });

      setServiceError(null); // Clear error on success
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setService, setTimeZone, setSlotsFilter, setServiceError]);

  useEffect(() => {
    if (error || data?.service === null) {
      setServiceError({
        type: isNetworkError(error) ? "NETWORK_ERROR" : "SERVICE_NOT_FOUND",
        canRetry: isNetworkError(error),
        refetch,
      });
    }
  }, [error, data, setServiceError, refetch]);

  useEffect(() => {
    setServiceLoader(LOADERS.SERVICE, loading);
  }, [loading, setServiceLoader]);
};

export const useService = () => {
  const { id } = useParams<{ id: string }>();
  const lang = useLangParam();
  useServiceState(id!, lang);
  useServiceSlotsState(id!);
};
