import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import HealContainer from "../HealContainer.vue";

describe("HealContainer", () => {
  const player = {
    activePokemon: { hp: 50 },
  };

  it("affiche le input si ennemi KO", () => {
    const wrapper = mount(HealContainer, {
      props: {
        player,
        hpPercentAskToHeal: 0,
        healActivePokemon: vi.fn(),
        currentTrainer: { pokemon: { hp: 0 } },
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("émet update quand on tape", async () => {
    const wrapper = mount(HealContainer, {
      props: {
        player,
        hpPercentAskToHeal: 0,
        healActivePokemon: vi.fn(),
        currentTrainer: { pokemon: { hp: 0 } },
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    const input = wrapper.find("input");
    await input.setValue(30);

    expect(wrapper.emitted()["update:hpPercentAskToHeal"]).toBeTruthy();
  });

  it("appelle healActivePokemon au clic", async () => {
    const heal = vi.fn();

    const wrapper = mount(HealContainer, {
      props: {
        player,
        hpPercentAskToHeal: 20,
        healActivePokemon: heal,
        currentTrainer: { pokemon: { hp: 0 } },
        currentBattle: 1,
        totalBattles: 5,
      },
    });

    await wrapper.find("button").trigger("click");

    expect(heal).toHaveBeenCalledWith(20);
  });
});
