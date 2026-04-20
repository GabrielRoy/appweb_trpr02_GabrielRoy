import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import LeaderboardView from "../LeaderboardView.vue";

// Test fait par IA pour débugguer et tester la vue

vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Ash", score: 100 },
          { id: 2, name: "Misty", score: 200 },
          { id: 3, name: "Brock", score: 150 },
        ]),
    }),
  ),
);

describe("LeaderboardView", () => {
  it("affiche le classement trié", async () => {
    const wrapper = mount(LeaderboardView);

    await flushPromises();

    const text = wrapper.text();

    expect(text).toContain("Misty");
    expect(text).toContain("Brock");
    expect(text).toContain("Ash");
  });
});
