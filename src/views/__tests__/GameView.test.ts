import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import GameView from "../GameView.vue";

// Test fait par IA pour débugguer et tester la vue
vi.mock("vue-router", () => ({
  useRoute: () => ({
    query: {
      team: "1,2,3",
      name: "Ash",
    },
  }),
}));

vi.stubGlobal(
  "fetch",
  vi.fn((url: string) => {
    if (url.includes("pokemons")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, name: "Pikachu" },
            { id: 2, name: "Bulbasaur" },
            { id: 3, name: "Charmander" },
          ]),
      });
    }

    if (url.includes("trainers")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              name: "Enemy",
              experience: 1,
              reward: 50,
              pokemon: { hp: 100, maxHp: 100 },
            },
          ]),
      });
    }

    return Promise.resolve({ json: () => Promise.resolve([]) });
  }),
);

describe("GameView", () => {
  it("render GameView", async () => {
    const wrapper = mount(GameView);

    // attendre le onMounted async
    await new Promise((resolve) => setTimeout(resolve));

    expect(wrapper.exists()).toBe(true);
  });
});
