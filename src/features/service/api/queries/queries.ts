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
        googleTagId
      }
      title
      description
      price
      promoPrice
      currency
      locations {
        locationId
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
        bookingStatus {
          ACCEPTED {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              reschedule
              service
              spaces
            }
            description
            details
            iconUrl
            title
          }
          CANCELED {
            actions {
              cancel
              calendar
              hide
              pay
              qr
              reschedule
              service
              spaces
            }
            description
            details
            iconUrl
            title
          }
          CONFIRMED {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              reschedule
              service
              spaces
            }
            description
            details
            iconUrl
            title
          }
          NEW {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              reschedule
              service
              spaces
            }
            description
            details
            iconUrl
            title
          }
          REJECTED {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              reschedule
              service
              spaces
            }
            description
            details
            iconUrl
            title
          }
        }
        paymentStatus {
          CANCELED {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              service
            }
            description
            details
            iconUrl
            title
          }
          NEW {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              service
            }
            description
            details
            iconUrl
            title
          }
          PROCESSING {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              service
            }
            description
            details
            iconUrl
            title
          }
          SUCCEEDED {
            actions {
              calendar
              cancel
              hide
              pay
              qr
              service
            }
            description
            details
            iconUrl
            title
          }
        }
        displayType
        days {
          duration
          maxSelect
          minSelect
          multiSelect
          quantity
        }
        list {
          duration
          maxSelect
          minSelect
          multiSelect
          quantity
          showTime
        }
        calendar {
          maxRange
          maxSelect
          minRange
          minSelect
          multiSelect
          rangeSelect
          quantity
        }
        multiList {
          duration
          quantity
          showTime
        }
        preorder {
          duration
          quantity
          showDate
          showTime
        }
      }
      paymentProviders
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
        ... on FormFieldSystemGuestsList {
          fieldId
          fieldType
          required
          label
          order
          minGuests
          maxGuests
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
        ... on FormFieldSystemPromoCode {
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
        ... on FormFieldFileUpload {
          accept
          buttonText
          capture
          fieldId
          fieldType
          label
          multiple
          order
          required
        }
        ... on FormFieldHidden {
          fieldId
          fieldType
          label
        }
      }
    }
  }
`;

export const GET_SERVICE_SLOTS = gql`
  query GetServiceSlots($serviceId: ID!, $from: DateTime, $to: DateTime, $locations: [ID!]) {
    service(serviceId: $serviceId) {
      slots(dateTimeTo: $to, dateTimeFrom: $from, slotType: AVAILABLE, locations: $locations) {
        slotId
        quantity
        dateTimeFrom
        dateTimeTo
      }
    }
  }
`;
