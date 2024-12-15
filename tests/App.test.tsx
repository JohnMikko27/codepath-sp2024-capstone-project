import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";

describe("App component", () => {
  it("true to be true", () => {
    expect(1+1).toBe(2);
  });
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  screen.debug();
});
