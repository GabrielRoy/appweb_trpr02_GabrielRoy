import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import MainMenuView from "../MainMenuView.vue";

// mock fetch
vi.stubGlobal(
  "fetch",
  vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Pikachu" },
          { id: 2, name: "Bulbasaur" },
        ]),
    }),
  ),
);

// mock router
vi.mock("../../router", () => ({
  default: {
    push: vi.fn(),
  },
}));

describe("MainMenuView", () => {
  it("render la page", async () => {
    const wrapper = mount(MainMenuView);

    await flushPromises();

    expect(wrapper.text()).toContain("Bienvenue");
  });

  it("affiche les pokemons dans les select", async () => {
    const wrapper = mount(MainMenuView);

    await flushPromises();

    const options = wrapper.findAll("option");

    expect(options.some((o) => o.text() === "Pikachu")).toBe(true);
    expect(options.some((o) => o.text() === "Bulbasaur")).toBe(true);
  });

  it("affiche erreur si formulaire invalide", async () => {
    const wrapper = mount(MainMenuView);

    await wrapper.find("button").trigger("click");

    expect(wrapper.text()).toContain("Please enter a trainer name.");
  });

  it("redirige si valide", async () => {
    const router = (await import("../../router")).default;

    const wrapper = mount(MainMenuView);

    await flushPromises();

    //Pas de vrai erreurs le test pass avec mais pas sans
    wrapper.vm.trainerName = "Ash";
    wrapper.vm.pokemonTeam = [
      { id: 1, name: "Pikachu" },
      { id: 1, name: "Pikachu" },
      { id: 1, name: "Pikachu" },
      { id: 1, name: "Pikachu" },
      { id: 1, name: "Pikachu" },
    ];

    await wrapper.find("button").trigger("click");

    expect(router.push).toHaveBeenCalled();
  });
});
