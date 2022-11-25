import { gql } from "@apollo/client/core";

export const GET_SERVICE = gql`
  query GetService($serviceId: ID!) {
    service(serviceId: $serviceId) {
      serviceId
      project {
        projectId
        title
        logoUrl
        theme
        defaultLocale
        localTimeZone
      }
      title
      description
      price
      promoPrice
      currency
      locations {
        title
      }
      dateTimeTo
      dateTimeFrom
      media {
        url
      }
      hosts {
        fullName
      }
      viewConfig {
        slot {
          duration
          quantity
        }
      }
      formFields {
        ... on FormFieldSystemFullName {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldSystemEmailAddress {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldSystemPhoneNumber {
          fieldId
          fieldType
          required
          label
          order
          width
        }
        ... on FormFieldSystemMessage {
          fieldId
          fieldType
          required
          label
          order
          width
          height
          placeholder
        }
        ... on FormFieldSystemSlotQuantity {
          fieldId
          fieldType
          required
          label
          order
          width
          maxValue
        }
        ... on FormFieldSystemAllowlistCode {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldText {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
          validationRegex
        }
        ... on FormFieldNumber {
          fieldId
          fieldType
          required
          label
          order
          width
          maxValue
        }
        ... on FormFieldCheckbox {
          fieldId
          fieldType
          required
          label
          order
          width
        }
        ... on FormFieldSelect {
          fieldId
          fieldType
          required
          values
          label
          order
          width
        }
      }
    }
  }
`;

export const GET_SERVICE_SLOTS = gql`
  query GetServiceSlots($serviceId: ID!, $from: DateTime, $to: DateTime) {
    service(serviceId: $serviceId) {
      slots(dateTimeTo: $to, dateTimeFrom: $from, slotType: AVAILABLE) {
        slotId
        quantity
        dateTimeFrom
        dateTimeTo
      }
    }
  }
`;
