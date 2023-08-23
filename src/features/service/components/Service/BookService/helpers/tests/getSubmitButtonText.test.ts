import { getSubmitButtonText } from "../";

describe("getSubmitButtonText", () => {
  const tMock = (key: string) => {
    if (key === "book-free-button") {
      return "Book now";
    }
    return "";
  };

  it("returns base text when no selectedSlotValue and selectedSlotsValue", () => {
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "",
      selectedSlotsValue: [],
      t: tMock,
    });

    expect(buttonText).toBe("Book now");
  });

  it("returns text with selectedSlotsValue length when no selectedSlotValue", () => {
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "",
      selectedSlotsValue: ["slot1", "slot2"],
      t: tMock,
    });

    expect(buttonText).toBe("Book now (2)");
  });

  it("returns text with selectedSlotValue", () => {
    const buttonText = getSubmitButtonText({
      selectedSlotValue: "slot1",
      selectedSlotsValue: [],
      t: tMock,
    });

    expect(buttonText).toBe("Book now: slot1");
  });
});
