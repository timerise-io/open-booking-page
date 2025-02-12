import React, { useCallback, useContext, useMemo } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { AnalyticsContext } from "features/analytics/contexts/AnalyticsContext";
import { useBookDateRange } from "features/service/hooks/useBookDateRange";
import { useBookSlot } from "features/service/hooks/useBookSlot";
import { Form, Formik } from "formik";
import { getServiceConfigByType } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import _ from "lodash";
import { FormField, filterFormFields, filterHiddenFields } from "models/formFields";
import { BOOKING_FORM_TYPES } from "models/service";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { hoursSystemAtom } from "state/atoms";
import { locationAtom } from "state/atoms/location";
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { selectedSlots } from "state/atoms/selectedSlots";
import { serviceAtom } from "state/atoms/service";
import { slotsAtom } from "state/atoms/slots";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { timeZoneAtom } from "state/atoms/timeZone";
import { uploadAttachmentsAtom } from "state/atoms/uploadAttachments";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";
import { BookingServiceFormContent } from "../BookingServiceFormContent/BookingServiceFormContent";
import { HOURS_SYSTEMS } from "../HoursSystem/enums/HoursSystem.enum";
import { getSubmitButtonText } from "./helpers";
import { generateValidationSchema } from "./validators";

const StyledWarning = styled.div`
  margin: 15px 0 20px 0;
  display: flex;
  background: #fef6f5;
  border: 1px solid #ea4335;
  border-radius: 4px;
  padding: 8px;
  gap: 8px;
  color: #ea4335;

  & > .info-text {
    width: fit-content;
  }
`;

const WrapperCard = styled(Card)`
  ${({ theme }) => theme.mediaBelow(theme.breakpoints.sm)} {
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const getInitialValues = (formFields: Array<FormField>, searchParams: URLSearchParams) => {
  const customFormFields = filterFormFields(formFields, false);
  const hiddenFields = filterHiddenFields(formFields);

  return {
    ...{
      fullName: searchParams.get("fullName") ?? "",
      phone: "",
      email: searchParams.get("email") ?? "",
      message: searchParams.get("message") ?? "",
      requireAgreement: searchParams.get("requireAgreement") ?? false,
      quantity: searchParams.get("quantity") ?? 1,
      code: searchParams.get("code") ?? "",
      promoCode: searchParams.get("promoCode") ?? "",
    },
    ...Object.assign(
      {},
      ...hiddenFields.map((item) => {
        return { [item.label]: searchParams.get(item.label) ?? "" };
      }),
      ...customFormFields.map((item) => {
        if (item.fieldType === "TEXT") return { [item.fieldId]: searchParams.get(item.fieldId) ?? "" };
        if (item.fieldType === "CHECKBOX") return { [item.fieldId]: false };
        if (item.fieldType === "NUMBER") return { [item.fieldId]: searchParams.get(item.fieldId) ?? 1 };
        if (item.fieldType === "SELECT") return { [item.fieldId]: [] };
        return { [item.fieldId]: "" };
      }),
    ),
  };
};

const BookService = () => {
  const [searchParams] = useSearchParams();
  const locale = useLocale();
  const { t } = useTranslation(["forms"]);
  const selectedDateRangeValue = useRecoilValue(selectedDateRange);
  const selectedSlotsValue = useRecoilValue(selectedSlots);
  const service = useRecoilValue(serviceAtom)!;
  const serviceType = service?.viewConfig.displayType;
  const serviceConfig = service && getServiceConfigByType({ service });
  const { formFields }: { formFields: Array<FormField> } = service ?? {
    formFields: [],
  };
  const showWarning = useRecoilValue(slotsFiltersAtom).triggerId !== 0;
  const { bookSlotMutation, loading, error } = useBookSlot();
  const { bookDateRangeMutation, loadingDateRange, errorDateRange } = useBookDateRange();
  const { id } = useParams<{ id: string }>();
  const uploadState = useRecoilValue(uploadAttachmentsAtom);
  const timeZone = useRecoilValue(timeZoneAtom);
  const hoursSystem = useRecoilValue(hoursSystemAtom);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);
  const [, setSelectedSlots] = useRecoilState(selectedSlots);
  const slots = useRecoilValue(slotsAtom)!;
  const locations = useRecoilValue(locationAtom);
  const { sendEvent } = useContext(AnalyticsContext);

  const isUploading = Object.values(uploadState).filter((item) => item.isLoading).length > 0;

  const dateFormat = is12HoursSystem ? "iiii dd MMM, h:mm a" : "iiii dd MMM, H:mm";

  const selectedSlot = slots.find((slot) => slot.slotId === selectedSlotsValue[0])!;

  const now = moment().format("YYYY-MM-DDTHH:mm:ss");

  const formattedDate = selectedSlot
    ? convertSourceDateTimeToTargetDateTime({
        date: selectedSlot.dateTimeFrom,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        dateFormat,
        locale,
      })
    : "";

  const checkDisableButton = useCallback(() => {
    const disabledForSlots = !selectedSlotsValue.length || loading || isUploading;
    const disabledForDateRange =
      selectedDateRangeValue.dateTimeFrom === null ||
      selectedDateRangeValue.dateTimeTo === null ||
      loadingDateRange ||
      isUploading;
    const isSlotType = serviceType === BOOKING_FORM_TYPES.DAYS;
    const isDateRangeType = serviceType === BOOKING_FORM_TYPES.CALENDAR;
    const isEventType = serviceType === BOOKING_FORM_TYPES.LIST || serviceType === BOOKING_FORM_TYPES.MULTILIST;

    return (
      (isSlotType && disabledForSlots) || (isDateRangeType && disabledForDateRange) || (isEventType && disabledForSlots)
    );
  }, [
    loading,
    isUploading,
    selectedDateRangeValue.dateTimeFrom,
    selectedDateRangeValue.dateTimeTo,
    loadingDateRange,
    serviceType,
    selectedSlotsValue,
  ]);

  const handleSubmit = (value: Record<string, any>) => {
    const fullName = _.find(formFields, { fieldType: "SYSTEM_FULL_NAME" });
    const quantity = _.find(formFields, { fieldType: "SYSTEM_SLOT_QUANTITY" });
    const message = _.find(formFields, { fieldType: "SYSTEM_MESSAGE" });
    const email = _.find(formFields, { fieldType: "SYSTEM_EMAIL_ADDRESS" });
    const phone = _.find(formFields, { fieldType: "SYSTEM_PHONE_NUMBER" });
    const code = _.find(formFields, { fieldType: "SYSTEM_ALLOWLIST_CODE" });
    const promoCode = _.find(formFields, { fieldType: "SYSTEM_PROMO_CODE" });
    const guestsList = _.find(formFields, { fieldType: "SYSTEM_GUESTS_LIST" });

    const customFormFields = filterFormFields(formFields, false).map((item) => {
      return {
        [item.fieldId]: value[item.fieldId] as any,
      };
    });

    const hiddenFields = filterHiddenFields(formFields).map((item) => {
      return {
        [item.fieldId]: value[item.fieldId] as any,
      };
    });

    const urlSearchParams = Object.fromEntries(searchParams.entries());

    const json = JSON.stringify({
      ...(fullName && { [fullName.fieldId]: value.fullName }),
      ...(quantity && { [quantity.fieldId]: value.quantity }),
      ...(message && { [message.fieldId]: value.message }),
      ...(email && { [email.fieldId]: value.email }),
      ...(phone && { [phone.fieldId]: value.phone }),
      ...(code && { [code.fieldId]: value.code }),
      ...(promoCode && { [promoCode.fieldId]: value.promoCode }),
      ...(guestsList && { [guestsList.fieldId]: value.guestsList }),
      ...Object.assign({}, ...customFormFields),
      ...Object.assign({}, ...hiddenFields),
      ...urlSearchParams,
    });

    if (serviceType === BOOKING_FORM_TYPES.DAYS && selectedSlotsValue.length) {
      bookSlotMutation({
        variables: {
          serviceId: id!,
          slots: selectedSlotsValue,
          formFields: json,
          timeZone: timeZone,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
          locale: locale.code,
          locations: locations ? [locations] : [],
        },
      }).then(() => setSelectedSlots([]));
      sendEvent({
        action: "book_slot",
        category: "Book Service",
        label: `book slot ${BOOKING_FORM_TYPES.DAYS}`,
      });
    } else if (
      serviceType === BOOKING_FORM_TYPES.CALENDAR &&
      selectedDateRangeValue.dateTimeFrom !== null &&
      selectedDateRangeValue.dateTimeTo !== null
    ) {
      bookDateRangeMutation({
        variables: {
          serviceId: id!,
          formFields: json,
          timeZone: timeZone,
          ...selectedDateRangeValue,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
          locale: locale.code,
          locations: locations ? [locations] : [],
        },
      });
      sendEvent({
        action: "book_slot",
        category: "Book Service",
        label: `book slot ${BOOKING_FORM_TYPES.CALENDAR}`,
      });
    } else if (
      (serviceType === BOOKING_FORM_TYPES.LIST || serviceType === BOOKING_FORM_TYPES.MULTILIST) &&
      selectedSlotsValue.length
    ) {
      bookSlotMutation({
        variables: {
          serviceId: id!,
          slots: selectedSlotsValue,
          formFields: json,
          timeZone: timeZone,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
          locale: locale.code,
          locations: locations ? [locations] : [],
        },
      }).then(() => setSelectedSlots([]));
      sendEvent({
        action: "book_slot",
        category: "Book Service",
        label: `book slot ${BOOKING_FORM_TYPES.LIST}`,
      });
    } else if (serviceType === BOOKING_FORM_TYPES.PREORDER) {
      bookDateRangeMutation({
        variables: {
          serviceId: id!,
          formFields: json,
          timeZone: timeZone,
          dateTimeFrom: now,
          dateTimeTo: now,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
          locale: locale.code,
          locations: locations ? [locations] : [],
        },
      });
      sendEvent({
        action: "book_slot",
        category: "Book Service",
        label: `book slot ${BOOKING_FORM_TYPES.PREORDER}`,
      });
    }
  };

  if (!service) return null;

  return (
    <Box mt={serviceType === BOOKING_FORM_TYPES.PREORDER ? 0 : 1.125}>
      <WrapperCard>
        {formFields && formFields.length > 0 && (
          <Box mb={2.5}>
            <Typography typographyType="h3" as="h3" displayType="contents">
              {t("headers.leave-details")}
            </Typography>
          </Box>
        )}
        <Formik
          initialValues={getInitialValues(formFields, searchParams)}
          validationSchema={generateValidationSchema(t, formFields, false)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Column ai="stretch">
                <BookingServiceFormContent />
                {(showWarning || error || errorDateRange) && (
                  <StyledWarning>
                    <IconInfoCircle size={20} color="#EA4335" />
                    <Typography className="info-text" typographyType="body" as="span" color="inherit">
                      {error && t(error)}
                      {errorDateRange && t(errorDateRange)}
                      {!error && t("slot-already-booked")}
                    </Typography>
                  </StyledWarning>
                )}
                <Button type="submit" buttonType="primary" disabled={checkDisableButton()} data-cy="book-now-button">
                  {getSubmitButtonText({
                    selectedSlotValue: formattedDate,
                    selectedSlotsValue,
                    t,
                    serviceConfig,
                    service,
                  })}
                </Button>
              </Column>
            </Form>
          )}
        </Formik>
      </WrapperCard>
    </Box>
  );
};

export default BookService;
