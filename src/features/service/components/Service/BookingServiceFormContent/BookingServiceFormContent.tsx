import { Row } from "components/layout/Row";
import { useRecoilValue } from "recoil";
import { serviceAtom } from "state/atoms/service";
import styled from "styled-components";
import { splitFormConfigIntoRows } from "./splitFormConfigIntoRow";
import FormComponent from "./FormComponent";

const FormRow = styled(Row)`
  gap: 0 10px;
  flex-wrap: wrap;

  & > * {
    flex: 1;
    width: unset;
    min-width: 210px;
  }
`;

export const BookingServiceFormContent = () => {
  const service = useRecoilValue(serviceAtom);
  const formFields: any = service?.formFields || {};

  if (formFields === undefined || formFields?.length === 0) return null;

  const enabledFields = [...formFields].sort(
    (item, nextItem) => item.order - nextItem.order
  );

  const formRows = splitFormConfigIntoRows(enabledFields);

  return (
    <>
      {formRows.map((row, index) => {
        if (row.length === 1) {
          return <FormComponent key={row[0].fieldId} config={row[0]} />;
        }

        return (
          <FormRow key={`booking-form-row-${index}`}>
            {row.map((item) => {
              return <FormComponent key={item.fieldId} config={item} />;
            })}
          </FormRow>
        );
      })}
    </>
  );
};
