import { Button } from "components/Button";
import { Card } from "components/Card";
import { Box } from "components/layout/Box";
import { Column } from "components/layout/Column";
import { Typography } from "components/Typography";
import React from "react";
import { useRecoilValue } from "recoil";
import { selectedSlot } from "state/atoms/selectedSlot";
import { servicePrice } from "state/selectors/servicePrice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TFunction, useTranslation } from "react-i18next";
import { useBookSlot } from "features/service/hooks/useBookSlot";
import { useParams } from "react-router-dom";
import { selectedSlotSelector } from "state/selectors/selectedSlotSelector";
import { BookingServiceFormContent } from "./BookingServiceFormContent";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";
import { slotsFiltersAtom } from "state/atoms/slotsFilters";
import { FormField } from "models/formFields";
import { uploadAttachmentsAtom } from "state/atoms/uploadAttachments";
import _ from "lodash";
import { useLocale } from "helpers/hooks/useLocale";
import { formatInTimeZone } from "date-fns-tz";

const getStringFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required
    ? Yup.string().required(t("common:validation.required"))
    : Yup.string();

const getPhoneFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required
    ? Yup.string()
        .required(t("common:validation.required"))
        .min(8, t("common:validation.minLength", { length: 8 }))
    : Yup.string().test({
        message: t("common:validation.minLength", { length: 8 }),
        test: (item) =>
          item === undefined || item.length < 3 || item.length > 7,
      });

const getEmailFieldValidation = (t: TFunction<"forms"[]>, required: boolean) =>
  required
    ? Yup.string()
        .email(t("common:validation.email"))
        .required(t("common:validation.required"))
    : Yup.string().email(t("common:validation.email"));

const generateValidationSchema = (
  t: TFunction<"forms"[]>,
  formFields: Array<FormField>,
  isAcceptRequired: boolean
) => {
  if (formFields.length === 0) return Yup.object({});

  const systemFullName = formFields.find(
    (item) => item.fieldType === "SYSTEM_FULL_NAME"
  );
  const systemPhoneNumber = formFields.find(
    (item) => item.fieldType === "SYSTEM_PHONE_NUMBER"
  );
  const systemEmailAddress = formFields.find(
    (item) => item.fieldType === "SYSTEM_EMAIL_ADDRESS"
  );
  const systemMessage = formFields.find(
    (item) => item.fieldType === "SYSTEM_MESSAGE"
  );
  const systemSlotQuantity = formFields.find(
    (item) => item.fieldType === "SYSTEM_SLOT_QUANTITY"
  );

  return Yup.object({
    ...(systemFullName && {
      fullName: getStringFieldValidation(t, systemFullName.required),
    }),
    ...(systemPhoneNumber && {
      phone: getPhoneFieldValidation(t, systemPhoneNumber.required),
    }),
    ...(systemEmailAddress && {
      email: getEmailFieldValidation(t, systemEmailAddress.required),
    }),
    ...(systemMessage && {
      message: getStringFieldValidation(t, systemMessage.required),
    }),
    ...(systemSlotQuantity && {
      quantity: Yup.number().min(1, t("common:validation.slots-quantity")),
    }),
    ...(isAcceptRequired && {
      requireAgreement: Yup.boolean().isTrue(t("common:validation.required")),
    }),
  });
};

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
  const textBase =
    servicePriceValue && servicePriceValue.price > 0
      ? `${t("bookServiceButton")} ${servicePriceValue.price.toFixed(2)} ${
          servicePriceValue.currency
        }`
      : t("bookFreeServiceButton");

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
}

const initialValues: BookServiceSlotFormProps = {
  fullName: "",
  phone: "",
  email: "",
  message: "",
  requireAgreement: false,
  quantity: 1,
};

const BookService = () => {
  const locale = useLocale();
  const { t } = useTranslation(["forms"]);
  const selectedSlotValue = useRecoilValue(selectedSlot);
  const servicePriceValue = useRecoilValue(servicePrice);
  const service = useRecoilValue(serviceAtom);
  const { formFields } = service ?? {};
  const showWarning = useRecoilValue(slotsFiltersAtom).triggerId !== 0;
  const slot = useRecoilValue(selectedSlotSelector);
  const { bookSlotMutation, loading } = useBookSlot();
  const { id } = useParams<{ id: string }>();
  const uploadState = useRecoilValue(uploadAttachmentsAtom);

  const formattedDate =
    selectedSlotValue &&
    formatInTimeZone(selectedSlotValue, "UTC", "iii dd MMM, H:mm", {
      locale,
    });
  const handleSubmit = (value: BookServiceSlotFormProps) => {
    if (slot === undefined) return;

    const fullName = _.find(formFields, { fieldType: "SYSTEM_FULL_NAME" });
    const quantity = _.find(formFields, { fieldType: "SYSTEM_SLOT_QUANTITY" });
    const message = _.find(formFields, { fieldType: "SYSTEM_MESSAGE" });
    const email = _.find(formFields, { fieldType: "SYSTEM_EMAIL_ADDRESS" });
    const phone = _.find(formFields, { fieldType: "SYSTEM_PHONE_NUMBER" });

    const json = JSON.stringify({
      ...(fullName && { [fullName.fieldId]: value.fullName }),
      ...(quantity && { [quantity.fieldId]: value.quantity }),
      ...(message && { [message.fieldId]: value.message }),
      ...(email && { [email.fieldId]: value.email }),
      ...(phone && { [phone.fieldId]: value.phone }),
    });

    bookSlotMutation({
      variables: {
        serviceId: id!,
        slotId: slot.slotId,
        formFields: json,
      },
    });
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
          initialValues={{
            ...initialValues,
            quantity: 1,
          }}
          validationSchema={generateValidationSchema(t, formFields, false)}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Column ai="stretch">
                <BookingServiceFormContent />
                {showWarning && (
                  <StyledWarning>
                    <IconInfoCircle size={20} color="#EA4335" />
                    <Typography
                      className="info-text"
                      typographyType="body"
                      as="span"
                      color="inherit"
                    >
                      {t("Slot already booked")}
                    </Typography>
                  </StyledWarning>
                )}
                <Button
                  type="submit"
                  buttonType="primary"
                  disabled={
                    selectedSlotValue === "" ||
                    loading ||
                    uploadState.state === "inProgress"
                  }
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
