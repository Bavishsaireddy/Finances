import {
  formatCurrency,
  formatDate,
  formatDateShort,
  getChangeColor,
  getChangeLabel,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
} from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats positive amounts with $ and 2 decimal places", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("formats zero correctly", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats negative amounts", () => {
    expect(formatCurrency(-500)).toBe("-$500.00");
  });

  it("uses compact notation for amounts ≥ 1000 when compact=true", () => {
    const result = formatCurrency(12500, true);
    expect(result).toMatch(/\$12\.5K|\$12\.5k/i);
  });

  it("does NOT compact amounts < 1000 even when compact=true", () => {
    expect(formatCurrency(999, true)).toBe("$999.00");
  });
});

describe("formatDate", () => {
  it("formats a date string as Month Day, Year", () => {
    expect(formatDate("2026-06-10")).toMatch(/Jun\w* 10, 2026/);
  });
});

describe("formatDateShort", () => {
  it("formats a date string as Month Day without year", () => {
    const result = formatDateShort("2026-06-10");
    expect(result).toMatch(/Jun\w* 10/);
    expect(result).not.toContain("2026");
  });
});

describe("getChangeColor", () => {
  it("returns danger color for positive change (spending went up)", () => {
    expect(getChangeColor(5)).toBe("text-danger-DEFAULT");
  });

  it("returns success color for negative change (spending went down)", () => {
    expect(getChangeColor(-3)).toBe("text-success-DEFAULT");
  });

  it("returns secondary color for zero change", () => {
    expect(getChangeColor(0)).toBe("text-text-secondary");
  });
});

describe("getChangeLabel", () => {
  it("prepends + for positive numbers", () => {
    expect(getChangeLabel(5)).toBe("+5.0%");
  });

  it("includes the minus sign for negative numbers", () => {
    expect(getChangeLabel(-3.5)).toBe("-3.5%");
  });
});

describe("CATEGORY_COLORS", () => {
  it("has a color for every key in CATEGORY_ICONS", () => {
    Object.keys(CATEGORY_ICONS).forEach(key => {
      expect(CATEGORY_COLORS[key]).toBeDefined();
    });
  });

  it("all color values start with #", () => {
    Object.values(CATEGORY_COLORS).forEach(color => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });
});
