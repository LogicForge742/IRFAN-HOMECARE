import { describe, it, expect } from "vitest";
import { CHART_FORMATTERS } from "../chart-formatters";

describe("CHART_FORMATTERS", () => {
  it("should format currency correctly", () => {
    expect(CHART_FORMATTERS.currency(500)).toBe("KES 500");
    expect(CHART_FORMATTERS.currency(1500)).toBe("KES 2K");
    expect(CHART_FORMATTERS.currency(2000000)).toBe("KES 2.0M");
  });

  it("should format numbers with suffixes", () => {
    expect(CHART_FORMATTERS.number(500)).toBe("500");
    expect(CHART_FORMATTERS.number(1500)).toBe("1.5K");
    expect(CHART_FORMATTERS.number(2000000)).toBe("2.0M");
  });

  it("should format percentages", () => {
    expect(CHART_FORMATTERS.percentage(12.55)).toBe("12.6%");
  });
});
