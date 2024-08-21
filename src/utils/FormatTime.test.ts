import { FormatTime } from "./FormatTime";

describe("FormatTime", () => {
  it("should format time correctly", () => {
    expect(FormatTime(0)).toBe("0:00");
    expect(FormatTime(30)).toBe("0:30");
    expect(FormatTime(60)).toBe("1:00");
    expect(FormatTime(90)).toBe("1:30");
    expect(FormatTime(120)).toBe("2:00");
    expect(FormatTime(180)).toBe("3:00");
    expect(FormatTime(240)).toBe("4:00");
  });
});
