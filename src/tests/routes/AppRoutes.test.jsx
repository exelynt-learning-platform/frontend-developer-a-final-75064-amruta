import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("App and AppRoutes Integration", () => {
  it("renders without crashing inside Redux Provider", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Employee Management")).toBeInTheDocument();
  });
});
