import React, { useEffect, useRef } from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { useBookDateRange } from "features/service/hooks/useBookDateRange";
import { useBookSlot } from "features/service/hooks/useBookSlot";
import { Form, Formik, useFormikContext } from "formik";
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

const SubmitSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${({ theme }) => theme.mediaBelow(theme.breakpoints.md)} {
    /* keep the CTA visible while the form scrolls; offsets cancel out the card's 20px padding */
    position: sticky;
    bottom: 0;
    z-index: 5;
    margin: 0 -20px -20px;
    padding: 8px 20px 12px;
    background-color: ${({ theme }) => theme.colorSchemas.background.primary.color};
  }
`;

/** After a failed submit, scrolls to and focuses the first invalid field. */
const ScrollToFirstError = () => {
  const { submitCount, isValid, errors } = useFormikContext<Record<string, unknown>>();
  const lastHandledSubmit = useRef(submitCount);

  useEffect(() => {
    if (submitCount === lastHandledSubmit.current || isValid) return;
    lastHandledSubmit.current = submitCount;

    const fields = Array.from(document.querySelectorAll<HTMLElement>("input[name], textarea[name], select[name]"));
    const firstInvalid = fields.find((el) => (el.getAttribute("name") ?? "") in errors);
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus({ preventScroll: true });
    }
  }, [submitCount, isValid, errors]);

  return null;
};

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
  const is12HoursSystem = hoursSystem === HOURS_SYSTEMS.h12;
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
        dateFormat,
        locale,
      })
    : "";

  const formatRangeDate = (date: string | null) =>
    date
      ? convertSourceDateTimeToTargetDateTime({ date, targetTimeZone: timeZone, dateFormat: "d MMM", locale })
      : null;

  const formattedRangeFrom = formatRangeDate(selectedDateRangeValue.dateTimeFrom);
  const formattedRangeTo = formatRangeDate(selectedDateRangeValue.dateTimeTo);

  function getChipLabel(): string | null {
    switch (serviceType) {
      case BOOKING_FORM_TYPES.CALENDAR:
        if (formattedRangeFrom && formattedRangeTo) return `${formattedRangeFrom} – ${formattedRangeTo}`;
        return null;
      case BOOKING_FORM_TYPES.DAYS:
      case BOOKING_FORM_TYPES.LIST:
      case BOOKING_FORM_TYPES.MULTILIST:
        return formattedDate || null;
      default:
        return null;
    }
  }

  const chipLabel = getChipLabel();

  const missingSelection = (() => {
    switch (serviceType) {
      case BOOKING_FORM_TYPES.CALENDAR:
        return selectedDateRangeValue.dateTimeFrom === null || selectedDateRangeValue.dateTimeTo === null;
      case BOOKING_FORM_TYPES.DAYS:
      case BOOKING_FORM_TYPES.LIST:
      case BOOKING_FORM_TYPES.MULTILIST:
        return !selectedSlotsValue.length;
      default:
        // PREORDER needs no selection
        return false;
    }
  })();

  const requiresSelection = serviceType !== BOOKING_FORM_TYPES.PREORDER;
  const isSubmitDisabled = requiresSelection && (missingSelection || isLoading || isUploading);

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

    const commonVariables = {
      serviceId: id!,
      formFields: json,
      timeZone: timeZone,
      ...(service?.paymentProviders.length && {
        paymentProvider: service.paymentProviders[0],
      }),
      locale: locale.code,
      locations: locations ? [locations] : [],
    };

    const isSlotBasedType =
      serviceType === BOOKING_FORM_TYPES.DAYS ||
      serviceType === BOOKING_FORM_TYPES.LIST ||
      serviceType === BOOKING_FORM_TYPES.MULTILIST;

    if (isSlotBasedType && selectedSlotsValue.length) {
      bookSlotMutation({
        variables: { ...commonVariables, slots: selectedSlotsValue },
      }).then(() => setSelectedSlots([]));
    } else if (
      serviceType === BOOKING_FORM_TYPES.CALENDAR &&
      selectedDateRangeValue.dateTimeFrom !== null &&
      selectedDateRangeValue.dateTimeTo !== null
    ) {
      bookDateRangeMutation({
        variables: {
          ...commonVariables,
          dateTimeFrom: selectedDateRangeValue.dateTimeFrom,
          dateTimeTo: selectedDateRangeValue.dateTimeTo,
        },
      });
    } else if (serviceType === BOOKING_FORM_TYPES.PREORDER) {
      bookDateRangeMutation({
        variables: { ...commonVariables, dateTimeFrom: now, dateTimeTo: now },
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
              <ScrollToFirstError />
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
                <SubmitSection>
                  <Button
                    type="submit"
                    $buttonType="primary"
                    disabled={isSubmitDisabled}
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
                  {missingSelection && (
                    <Box $mt={1}>
                      <Typography $typographyType="label" $color="darkGrey" $align="center" as="span">
                        {t(serviceType === BOOKING_FORM_TYPES.CALENDAR ? "select-range-hint" : "select-slot-hint")}
                      </Typography>
                    </Box>
                  )}
                </SubmitSection>
              </Column>
            </Form>
          )}
        </Formik>
      </WrapperCard>
    </Box>
  );
};

export default BookService;
