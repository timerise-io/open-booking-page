import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Booking Page header", () => {
  render(<App />);
  const headerElement = screen.getByText(/Booking Page/i);
  expect(headerElement).toBeInTheDocument();
});
