import { FormField } from "models/formFields";

export const splitFormConfigIntoRows = (fields: Array<FormField>) => {
  const result: Array<Array<FormField>> = [];

  fields.forEach((item) => {
    if (result.length === 0) {
      result.push([{ ...item }]);
      return;
    }

    const currentRow = result[result.length - 1];

    const currentRowWidth = currentRow.reduce((acc, rowItem) => {
      const itemWidth = "width" in rowItem ? rowItem.width : 100;
      return acc + (itemWidth ?? 100);
    }, 0);

    const itemWidth = "width" in item ? item.width : 100;
    if (currentRowWidth + (itemWidth ?? 100) > 100) {
      result.push([{ ...item }]);
    } else {
      currentRow.push({ ...item });
    }
  });

  return result;
};
