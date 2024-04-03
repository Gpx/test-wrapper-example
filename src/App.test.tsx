import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestWrapper } from "./TestWrapper";

test("testing", () => {
  render(
    <TestWrapper withNetwork networkMode="online">
      <div>Hello</div>
    </TestWrapper>
  );
  screen.debug();
});
