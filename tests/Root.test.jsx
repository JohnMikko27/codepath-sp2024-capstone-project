import { render, } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Root from "../src/routes/Root";

describe("Root component", () => {
  it("renders snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});