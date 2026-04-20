import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ActionController from "../ActionController.vue";

const baseProps = {
  checkIfAllPokemonKO: () => false,
  playTurn: vi.fn(),
  nextBattle: vi.fn(),
  pushToLeaderboard: vi.fn(),
};

const global = {
  stubs: {
    RouterLink: {
      template: "<a><slot /></a>",
    },
  },
};

describe("ActionController", () => {
  it("affiche Attaquer si combat actif", () => {
    const wrapper = mount(ActionController, {
      props: {
        ...baseProps,
        currentTrainer: { pokemon: { hp: 50 } },
        currentBattle: 1,
        totalBattles: 5,
      },
      global,
    });

    expect(wrapper.text()).toContain("Attaquer");
  });

  it("affiche Next Battle si ennemi KO", () => {
    const wrapper = mount(ActionController, {
      props: {
        ...baseProps,
        currentTrainer: { pokemon: { hp: 0 } },
        currentBattle: 1,
        totalBattles: 5,
      },
      global,
    });

    expect(wrapper.text()).toContain("Next");
  });

  it("affiche leaderboard au dernier combat", () => {
    const wrapper = mount(ActionController, {
      props: {
        ...baseProps,
        currentTrainer: { pokemon: { hp: 0 } },
        currentBattle: 5,
        totalBattles: 5,
      },
      global,
    });

    expect(wrapper.text()).toContain("Terminer");
  });

  it("cache tout si tous les Pokémon KO", () => {
    const wrapper = mount(ActionController, {
      props: {
        ...baseProps,
        checkIfAllPokemonKO: () => true,
        currentTrainer: { pokemon: { hp: 50 } },
        currentBattle: 1,
        totalBattles: 5,
      },
      global,
    });

    expect(wrapper.text()).not.toContain("Attaquer");
  });
});
