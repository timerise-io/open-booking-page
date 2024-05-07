import { Service } from "models/service";
import { getSubmitButtonText } from "../";

describe("getSubmitButtonText", () => {
  const tMock = (key: string) => {
    if (key === "book-free-button") {
      return "Book now";
    }
    return "";
  };

  const serviceMock = {
    title: "Service name",
    viewConfig: {
      displayType: "LIST",
    },
  } as Service;

  const serviceConfigMock = {
    multiSelect: false,
  } as Service["viewConfig"]["days" | "list" | "calendar"];

  it("returns base text when no selectedSlotValue and selectedSlotsValue", () => {
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "",
      selectedSlotsValue: [],
      t: tMock,
      serviceConfig: serviceConfigMock,
      service: serviceMock,
    });

    expect(buttonText).toBe("Book now");
  });

  it("returns text with selectedSlotsValue length when no selectedSlotValue", () => {
    serviceConfigMock.multiSelect = true;
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "slot1",
      selectedSlotsValue: ["slot1", "slot2"],
      t: tMock,
      serviceConfig: serviceConfigMock,
      service: serviceMock,
    });

    expect(buttonText).toBe("Book now (2)");
  });

  it("returns text with selectedSlotValue", () => {
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "slot1",
      selectedSlotsValue: [],
      t: tMock,
      serviceConfig: serviceConfigMock,
      service: serviceMock,
    });

    expect(buttonText).toBe("Book now: slot1");
  });
});
