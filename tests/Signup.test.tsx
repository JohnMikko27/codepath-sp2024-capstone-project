import { render, screen } from "@testing-library/react";
import Signup from "../src/routes/signup";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("Signup route", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    screen.debug();
  });

  it("inputs exist", () => {
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const confirmPasswordInput = screen.getByPlaceholderText("confirm password");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it("button exists", () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i});
    expect(submitBtn).toBeInTheDocument();
  });

  it("link exists", () => {
    const link = screen.getByRole("link", { name: /Login to your account/i});
    expect(link).toBeInTheDocument();
  });
});