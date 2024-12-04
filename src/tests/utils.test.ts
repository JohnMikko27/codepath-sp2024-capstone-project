import { describe, it, expect } from "vitest";
import { countDecimals, truncate } from "@/utils/utils";

describe("truncate util", () => {
  it("1 decimal", () => {
    expect(truncate(1.123, 1)).toBe("1.1");
    expect(truncate(4/3, 1)).toBe("1.3");
  });

  it("2 decimals", () => {
    expect(truncate(5/4, 2)).toBe("1.25");
    expect(truncate(3.14369, 2)).toBe("3.14");
  });

  it("truncates and rounds correctly", () => {
    expect(truncate(5/4, 1)).toBe("1.3");
    expect(truncate(17/3,1)).toBe("5.7");
  });

  it("whole number with one decimal", () => {
    expect(truncate(4/4,1)).toBe("1.0");
    expect(truncate(10,2)).toBe("10.0");
  });
});

describe("countDecimals util", () => {
  it("0 decimals", () => {
    expect(countDecimals(4)).toBe(0);
    expect(countDecimals(100)).toBe(0);
  });

  it("1 decimal", () => {
    expect(countDecimals(4.1)).toBe(1);
    expect(countDecimals(6.9)).toBe(1);
  });

  it("2 decimals", () => {
    expect(countDecimals(4.13)).toBe(2);
    expect(countDecimals(6.99)).toBe(2);
  });
});
