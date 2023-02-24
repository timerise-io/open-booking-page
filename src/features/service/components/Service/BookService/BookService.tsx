import { Button } from "components/Button";
import { Card } from "components/Card";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Typography } from "components/Typography";
import React, { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { selectedDateRange } from "state/atoms/selectedDateRange";
import { servicePrice } from "state/selectors/servicePrice";
import { Formik, Form } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useBookSlot } from "features/service/hooks/useBookSlot";
import { useBookDateRange } from "features/service/hooks/useBookDateRange";
import { useParams } from "react-router-dom";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import { BookingServiceFormContent } from "../BookingServiceFormContent/BookingServiceFormContent";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { filterFormFields, FormField } from "models/formFields";
import { uploadAttachmentsAtom } from "state/atoms/uploadAttachments";
import _ from "lodash";
import { useLocale } from "helpers/hooks/useLocale";
import { formatInTimeZone } from "date-fns-tz";
import { generateValidationSchema } from "./validators";
import { BOOKING_FORM_TYPES } from "models/service";

const getSubmitButtonText = (
  selectedSlotValue: string,
  servicePriceValue:
    | {
        price: number;
        currency: string;
      }
    | undefined,
  t: TFunction<"forms"[]>
) => {
  const textBase = t("bookFreeServiceButton");

  if (selectedSlotValue === "") return textBase;

  return `${textBase}: ${selectedSlotValue}`;
};

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

interface BookServiceSlotFormProps {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  requireAgreement: boolean;
  quantity: number;
  code: string;
}

const initialValues: BookServiceSlotFormProps = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  requireAgreement: false,
  quantity: 1,
  code: "",
};

const getInitialValues = (formFields: Array<FormField>) => {
  const customFormFields = filterFormFields(formFields, false);
  return {
    ...initialValues,
    ...Object.assign(
      {},
      ...customFormFields.map((item) => {
        if (item.fieldType === "CHECKBOX") return { [item.fieldId]: false };
        if (item.fieldType === "NUMBER") return { [item.fieldId]: 1 };
        if (item.fieldType === "SELECT") return { [item.fieldId]: [] };
        return { [item.fieldId]: "" };
      })
    ),
  };
};

const BookService = () => {
  const locale = useLocale();
  const { t } = useTranslation(["forms"]);
  const selectedSlotValue = useRecoilValue(selectedSlot);
  const selectedDateRangeValue = useRecoilValue(selectedDateRange);
  const servicePriceValue = useRecoilValue(servicePrice);
  const service = useRecoilValue(serviceAtom);
  const serviceType = service?.viewConfig.dateTimeFormType;
  const { formFields }: { formFields: Array<FormField> } = service ?? {
    formFields: [],
  };
  const showWarning = useRecoilValue(slotsFiltersAtom).triggerId !== 0;
  const slot = useRecoilValue(selectedSlotSelector);
  const { bookSlotMutation, loading, error } = useBookSlot();
  const { bookDateRangeMutation, loadingDateRange, errorDateRange } = useBookDateRange();
  const { id } = useParams<{ id: string }>();
  const uploadState = useRecoilValue(uploadAttachmentsAtom);

  const isUploading =
    Object.values(uploadState).filter((item) => item.isLoading).length > 0;

  const formattedDate =
    selectedSlotValue &&
    formatInTimeZone(selectedSlotValue, "UTC", "iii dd MMM, H:mm", {
      locale,
    });

  const checkDisableButton = useCallback(() => {
    const disabledForSlot = selectedSlotValue === "" || loading || isUploading;
    const disabledForDateRange = selectedDateRangeValue.dateTimeFrom === null || selectedDateRangeValue.dateTimeTo === null || loadingDateRange || isUploading;
    const isSlotType = serviceType === BOOKING_FORM_TYPES.SLOT;
    const isDateRangeType = serviceType === BOOKING_FORM_TYPES.RANGE;

    return (isSlotType && disabledForSlot) || (isDateRangeType && disabledForDateRange);
  }, [selectedSlotValue, loading, isUploading, selectedDateRangeValue.dateTimeFrom, selectedDateRangeValue.dateTimeTo, loadingDateRange, serviceType]);

  const handleSubmit = (value: Record<string, any>) => {
    const fullName = _.find(formFields, { fieldType: "SYSTEM_FULL_NAME" });
    const quantity = _.find(formFields, { fieldType: "SYSTEM_SLOT_QUANTITY" });
    const message = _.find(formFields, { fieldType: "SYSTEM_MESSAGE" });
    const email = _.find(formFields, { fieldType: "SYSTEM_EMAIL_ADDRESS" });
    const phone = _.find(formFields, { fieldType: "SYSTEM_PHONE_NUMBER" });
    const code = _.find(formFields, { fieldType: "SYSTEM_ALLOWLIST_CODE" });
    const promoCode = _.find(formFields, { fieldType: "SYSTEM_PROMO_CODE" });

    const customFormFields = filterFormFields(formFields, false).map((item) => {
      return {
        [item.fieldId]: value[item.fieldId] as any,
      };
    });

    const json = JSON.stringify({
      ...(fullName && { [fullName.fieldId]: value.fullName }),
      ...(quantity && { [quantity.fieldId]: value.quantity }),
      ...(message && { [message.fieldId]: value.message }),
      ...(email && { [email.fieldId]: value.email }),
      ...(phone && { [phone.fieldId]: value.phone }),
      ...(code && { [code.fieldId]: value.code }),
      ...(promoCode && { [promoCode.fieldId]: value.promoCode }),
      ...Object.assign({}, ...customFormFields),
    });

    if (serviceType === BOOKING_FORM_TYPES.SLOT && slot !== undefined) {
      bookSlotMutation({
        variables: {
          serviceId: id!,
          slots: [slot.slotId],
          formFields: json,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
        },
      });
    } else if (serviceType === BOOKING_FORM_TYPES.RANGE && selectedDateRangeValue.dateTimeFrom !== null && selectedDateRangeValue.dateTimeTo !== null) {
      bookDateRangeMutation({
        variables: {
          serviceId: id!,
          formFields: json,
          ...selectedDateRangeValue,
          ...(service?.paymentProviders.length && {
            paymentProvider: service.paymentProviders[0],
          }),
        }
      });
    }
  };

  if (formFields === undefined || formFields.length === 0) return null;

  return (
    <Box mt={1.125}>
      <WrapperCard>
        <Box mb={2.5}>
          <Typography typographyType="h3" as="h3" displayType="contents">
            {t("headers.Leave your details")}
          </Typography>
        </Box>
        <Formik
          initialValues={getInitialValues(formFields)}
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
                    <Typography
                      className="info-text"
                      typographyType="body"
                      as="span"
                      color="inherit"
                    >
                      {error && t(error)}
                      {errorDateRange && t(errorDateRange)}
                      {!error && t("Slot already booked")}
                    </Typography>
                  </StyledWarning>
                )}
                <Button
                  type="submit"
                  buttonType="primary"
                  disabled={checkDisableButton()}
                  data-cy="book-now-button"
                >
                  {getSubmitButtonText(formattedDate, servicePriceValue, t)}
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
