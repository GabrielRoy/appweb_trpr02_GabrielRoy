import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PlayerInfo from "../PlayerInfo.vue";

describe("PlayerInfo", () => {
  const mockPlayer = {
    name: "Ash",
    experience: "Maître",
    score: 250,
    team: [],
    activePokemon: { id: 1, name: "Pikachu", hp: 100, maxHp: 100 },
  };

  it("affiche le nom du joueur", () => {
    const wrapper = mount(PlayerInfo, {
      props: {
        player: mockPlayer,
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    expect(wrapper.text()).toContain("Ash");
  });

  it("affiche le score", () => {
    const wrapper = mount(PlayerInfo, {
      props: {
        player: mockPlayer,
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    expect(wrapper.text()).toContain("250");
  });

  it("affiche le numéro du combat", () => {
    const wrapper = mount(PlayerInfo, {
      props: {
        player: mockPlayer,
        currentBattle: 2,
        totalBattles: 5,
      },
    });

    expect(wrapper.text()).toContain("Combat 2 / 5");
  });

  it("met à jour quand les props changent", async () => {
    const wrapper = mount(PlayerInfo, {
      props: {
        player: mockPlayer,
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    await wrapper.setProps({
      currentBattle: 3,
    });

    expect(wrapper.text()).toContain("Combat 3 / 5");
  });
});
