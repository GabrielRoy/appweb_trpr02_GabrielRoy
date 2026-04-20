import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PlayerActivePokemon from "../PlayerActivePokemon.vue";

function createPlayer(hp: number) {
  return {
    name: "Ash",
    experience: "Maitre",
    score: 0,
    team: [],
    activePokemon: {
      id: 1,
      name: "Pikachu",
      hp,
      maxHp: 100,
    },
  };
}

describe("PlayerActivePokemon", () => {
  it("affiche le nom du pokemon", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(100) },
    });

    expect(wrapper.text()).toContain("Pikachu");
  });

  it("affiche les HP", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(80) },
    });

    expect(wrapper.text()).toContain("80 / 100 HP");
  });

  it("calcule la largeur de la barre HP", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(50) },
    });

    const bar = wrapper.find(".hp-fill");
    expect(bar.attributes("style")).toContain("50%");
  });

  it("applique hp-low si hp < 30", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(20) },
    });

    expect(wrapper.find(".hp-fill").classes()).toContain("hp-low");
  });

  it("applique hp-mid si 30 <= hp < 60", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(40) },
    });

    expect(wrapper.find(".hp-fill").classes()).toContain("hp-mid");
  });

  it("aucune classe spéciale si hp >= 60", () => {
    const wrapper = mount(PlayerActivePokemon, {
      props: { player: createPlayer(80) },
    });

    const classes = wrapper.find(".hp-fill").classes();

    expect(classes).not.toContain("hp-low");
    expect(classes).not.toContain("hp-mid");
  });
});
