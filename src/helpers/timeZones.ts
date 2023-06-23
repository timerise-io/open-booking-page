import ct from "countries-and-timezones";

export const acceptedTimezonesRegex =
  /('Africa)|(America)|(Antarctica)|(Asia)|(Atlantic)|(Australia)|(Europe)|(Indian)|(Pacific).*/s;

export const zonesArray = Object.values(ct.getAllTimezones()).filter((item) => item.name.match(acceptedTimezonesRegex));

export const zonesSelectObject = zonesArray.map((item) => {
  return {
    text: `${item.name.replace("_", " ")}`,
    value: item.name,
  };
});
