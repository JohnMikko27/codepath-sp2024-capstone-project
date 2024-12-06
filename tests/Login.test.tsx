import { render, screen } from "@testing-library/react";
import Login from "../src/routes/login";
import React from "react";
import { MemoryRouter } from "react-router-dom";
// import userEvent from "@testing-library/user-event";

describe("Login route", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    screen.debug();
  });

  it("inputs exist", async() => {
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    // const user = userEvent.setup();
    // await user.keyboard(usernameInput, "lola");
    // console.log(usernameInput.value);
    // expect(usernameInput).toHaveValue(/lola/i);
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("button exists", () => {
    const submitBtn = screen.getByRole("button", { name: /submit/i});
    // const user = userEvent.setup()
    // await user.click(submitBtn)
    expect(submitBtn).toBeInTheDocument();
  });

  it("link exists", () => {
    const link = screen.getByRole("link", { name: /create an account/i});
    expect(link).toBeInTheDocument();
  });
});
