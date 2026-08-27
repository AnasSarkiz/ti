import { describe, expect, test } from "bun:test";
import { getNextDownloadMenuIndex } from "./OutputPanel";

describe("download menu keyboard navigation", () => {
  test("opens at the first item with ArrowDown and the last with ArrowUp", () => {
    expect(getNextDownloadMenuIndex("ArrowDown", -1, 3)).toBe(0);
    expect(getNextDownloadMenuIndex("ArrowUp", -1, 3)).toBe(2);
  });

  test("wraps in both directions", () => {
    expect(getNextDownloadMenuIndex("ArrowDown", 2, 3)).toBe(0);
    expect(getNextDownloadMenuIndex("ArrowUp", 0, 3)).toBe(2);
  });

  test("supports Home and End", () => {
    expect(getNextDownloadMenuIndex("Home", 1, 3)).toBe(0);
    expect(getNextDownloadMenuIndex("End", 1, 3)).toBe(2);
  });

  test("ignores unsupported keys and empty menus", () => {
    expect(getNextDownloadMenuIndex("Escape", 1, 3)).toBeUndefined();
    expect(getNextDownloadMenuIndex("ArrowDown", -1, 0)).toBeUndefined();
  });
});
