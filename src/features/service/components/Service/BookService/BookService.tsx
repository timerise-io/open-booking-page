import React, { useCallback, useMemo } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useBookDateRange } from "features/service/hooks/useBookDateRange";
import { useBookSlot } from "features/service/hooks/useBookSlot";
import { Form, Formik } from "formik";
import { getServiceConfigByType, toApiDateTime } from "helpers/functions";
import { useLocale } from "helpers/hooks/useLocale";
import { convertSourceDateTimeToTargetDateTime } from "helpers/timeFormat";
import _ from "lodash";
import { FormField, filterFormFields, filterHiddenFields } from "models/formFields";
import { BOOKING_FORM_TYPES } from "models/service";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useBookingStore, useFilterStore, useProjectStore, useUiStore, useUploadStore } from "state/stores";
import styled, { keyframes } from "styled-components";
import { IconCalendar, IconInfoCircle, IconLoader2 } from "@tabler/icons-react";
import { BookingServiceFormContent } from "../BookingServiceFormContent/BookingServiceFormContent";
import { HOURS_SYSTEMS } from "../HoursSystem/enums/HoursSystem.enum";
import { getSubmitButtonText } from "./helpers";
import { generateValidationSchema } from "./validators";

const spinKeyframe = keyframes`
  to { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(IconLoader2)`
  animation: ${spinKeyframe} 0.8s linear infinite;
`;

const SpinnerWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectedDateChip = styled(Row)`
  display: inline-flex;
  align-self: flex-start;
  gap: 6px;
  padding: 5px 10px;
  margin-bottom: ${({ theme }) => `calc(2 * ${theme.spacing})`};
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

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
  const selectedDateRangeValue = useBookingStore((state) => state.selectedDateRange);
  const selectedSlotsValue = useBookingStore((state) => state.selectedSlots);
  const service = useBookingStore((state) => state.service)!;
  const serviceType = service?.viewConfig.displayType;
  const serviceConfig = service && getServiceConfigByType({ service });
  const { formFields }: { formFields: Array<FormField> } = service ?? {
    formFields: [],
  };
  const showWarning = useFilterStore((state) => state.slotsFilters).triggerId !== 0;
  const { bookSlotMutation, loading, error } = useBookSlot();
  const { bookDateRangeMutation, loadingDateRange, errorDateRange } = useBookDateRange();
  const { id } = useParams<{ id: string }>();
  const uploadState = useUploadStore((state) => state.uploadAttachments);
  const timeZone = useUiStore((state) => state.timeZone);
  const hoursSystem = useUiStore((state) => state.hoursSystem);
  const is12HoursSystem = useMemo(() => hoursSystem === HOURS_SYSTEMS.h12, [hoursSystem]);
  const setSelectedSlots = useBookingStore((state) => state.setSelectedSlots);
  const slots = useBookingStore((state) => state.slots)!;
  const locations = useProjectStore((state) => state.location);
  const isUploading = Object.values(uploadState).filter((item) => item.isLoading).length > 0;

  const isLoading = loading || loadingDateRange;

  const dateFormat = is12HoursSystem ? "iiii dd MMM, h:mm a" : "iiii dd MMM, H:mm";

  const selectedSlot = slots.find((slot) => slot.slotId === selectedSlotsValue[0])!;

  const now = toApiDateTime(new Date());

  const formattedDate = selectedSlot
    ? convertSourceDateTimeToTargetDateTime({
        date: selectedSlot.dateTimeFrom,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        dateFormat,
        locale,
      })
    : "";

  const formattedRangeFrom = selectedDateRangeValue.dateTimeFrom
    ? convertSourceDateTimeToTargetDateTime({
        date: selectedDateRangeValue.dateTimeFrom,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        dateFormat: "d MMM",
        locale,
      })
    : null;

  const formattedRangeTo = selectedDateRangeValue.dateTimeTo
    ? convertSourceDateTimeToTargetDateTime({
        date: selectedDateRangeValue.dateTimeTo,
        targetTimeZone: timeZone,
        sourceTimeZone: service.project.localTimeZone,
        dateFormat: "d MMM",
        locale,
      })
    : null;

  const chipLabel = (() => {
    if (serviceType === BOOKING_FORM_TYPES.CALENDAR && formattedRangeFrom && formattedRangeTo) {
      return `${formattedRangeFrom} – ${formattedRangeTo}`;
    }
    if (
      (serviceType === BOOKING_FORM_TYPES.DAYS ||
        serviceType === BOOKING_FORM_TYPES.LIST ||
        serviceType === BOOKING_FORM_TYPES.MULTILIST) &&
      formattedDate
    ) {
      return formattedDate;
    }
    return null;
  })();

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

  const handleSubmit = (value: Record<string, unknown>) => {
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
        [item.fieldId]: value[item.fieldId],
      };
    });

    const hiddenFields = filterHiddenFields(formFields).map((item) => {
      return {
        [item.fieldId]: value[item.fieldId],
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
          dateTimeFrom: selectedDateRangeValue.dateTimeFrom!,
          dateTimeTo: selectedDateRangeValue.dateTimeTo!,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
          locale: locale.code,
          locations: locations ? [locations] : [],
        },
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
    }
  };

  if (!service) return null;

  return (
    <Box $mt={serviceType === BOOKING_FORM_TYPES.PREORDER ? 0 : 1.125}>
      <WrapperCard>
        {chipLabel && (
          <SelectedDateChip $ai="center">
            <IconCalendar size={13} />
            <Typography $typographyType="label" $weight="700" as="span">
              {chipLabel}
            </Typography>
          </SelectedDateChip>
        )}
        {formFields && formFields.length > 0 && (
          <Box $mb={2.5}>
            <Typography $typographyType="h3" as="h3" $displayType="contents">
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
              <Column $ai="stretch">
                <BookingServiceFormContent />
                {(showWarning || error || errorDateRange) && (
                  <StyledWarning>
                    <IconInfoCircle size={20} color="#EA4335" />
                    <Typography className="info-text" $typographyType="body" as="span" $color="inherit">
                      {error && t(error)}
                      {errorDateRange && t(errorDateRange)}
                      {!error && t("slot-already-booked")}
                    </Typography>
                  </StyledWarning>
                )}
                <Button
                  type="submit"
                  $buttonType="primary"
                  disabled={checkDisableButton()}
                  data-cy="book-now-button"
                  style={{ position: "relative" }}
                >
                  <span style={{ opacity: isLoading ? 0 : 1 }}>
                    {getSubmitButtonText({
                      selectedSlotValue: formattedDate,
                      selectedSlotsValue,
                      t,
                      serviceConfig,
                      service,
                    })}
                  </span>
                  {isLoading && (
                    <SpinnerWrapper>
                      <SpinnerIcon size={16} />
                    </SpinnerWrapper>
                  )}
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
