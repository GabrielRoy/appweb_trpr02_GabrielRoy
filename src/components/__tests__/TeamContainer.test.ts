import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TeamContainer from "../TeamContainer.vue";

function createPlayer() {
  const team = [
    { id: 1, name: "Pikachu", hp: 100, maxHp: 100 },
    { id: 2, name: "Bulbasaur", hp: 50, maxHp: 100 },
    { id: 3, name: "Charmander", hp: 0, maxHp: 100 },
  ];

  return {
    name: "Ash",
    experience: "Maitre",
    score: 0,
    team,
    activePokemon: team[0], // ✅ même référence
  };
}

describe("TeamContainer", () => {
  it("affiche tous les pokemons", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    expect(wrapper.text()).toContain("Pikachu");
    expect(wrapper.text()).toContain("Bulbasaur");
    expect(wrapper.text()).toContain("Charmander");
  });

  it("affiche les HP correctement", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    expect(wrapper.text()).toContain("(100/100)");
    expect(wrapper.text()).toContain("(50/100)");
    expect(wrapper.text()).toContain("(0/100)");
  });

  it("affiche bouton Switch seulement pour pokemon valide", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    const buttons = wrapper.findAll("button");

    // Bulbasaur seulement (pas actif et pas KO)
    expect(buttons.length).toBe(1);
    expect(buttons[0].text()).toBe("Switch");
  });

  it("n'affiche pas bouton pour pokemon actif", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    const rows = wrapper.findAll(".pokemon-row");

    const pikachuRow = rows[0];

    expect(pikachuRow.find("button").exists()).toBe(false);
  });

  it("n'affiche pas bouton pour pokemon KO", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    expect(wrapper.text()).not.toMatch(/Charmander[\s\S]*Switch/);
  });

  it("appelle switchPokemon au clic", async () => {
    const switchMock = vi.fn();

    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: switchMock,
      },
    });

    const button = wrapper.find("button");

    await button.trigger("click");

    expect(switchMock).toHaveBeenCalled();
  });

  it("affiche la barre de vie avec bonne largeur", () => {
    const wrapper = mount(TeamContainer, {
      props: {
        player: createPlayer(),
        switchPokemon: vi.fn(),
      },
    });

    const bars = wrapper.findAll(".hp-fill");

    expect(bars[0].attributes("style")).toContain("100%");
    expect(bars[1].attributes("style")).toContain("50%");
  });
});
