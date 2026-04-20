import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import EnemyTrainerInfo from "../EnemyTrainerInfo.vue";

function createTrainer(hp: number) {
  return {
    experience: 2,
    reward: 50,
    pokemon: {
      name: "Salameche",
      hp,
      maxHp: 100,
    },
  };
}

describe("EnemyTrainerInfo", () => {
  it("n'affiche rien si pas de trainer", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: null,
        getExperienceLabel: () => "",
      },
    });

    expect(wrapper.find(".card").exists()).toBe(false);
  });

  it("affiche le nom du pokemon", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(100),
        getExperienceLabel: () => "Confirmé",
      },
    });

    expect(wrapper.text()).toContain("Salameche");
  });

  it("affiche la récompense", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(100),
        getExperienceLabel: () => "Confirmé",
      },
    });

    expect(wrapper.text()).toContain("50 P$");
  });

  it("affiche le label d'expérience", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(100),
        getExperienceLabel: () => "Expert",
      },
    });

    expect(wrapper.text()).toContain("Expert");
  });

  it("calcule la largeur de la barre HP", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(50),
        getExperienceLabel: () => "",
      },
    });

    const bar = wrapper.find(".hp-fill");

    expect(bar.attributes("style")).toContain("50%");
  });

  it("applique hp-low si hp < 30", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(20),
        getExperienceLabel: () => "",
      },
    });

    expect(wrapper.find(".hp-fill").classes()).toContain("hp-low");
  });

  it("applique hp-mid si 30 <= hp < 60", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(40),
        getExperienceLabel: () => "",
      },
    });

    expect(wrapper.find(".hp-fill").classes()).toContain("hp-mid");
  });

  it("n'applique aucune classe si hp >= 60", () => {
    const wrapper = mount(EnemyTrainerInfo, {
      props: {
        currentTrainer: createTrainer(80),
        getExperienceLabel: () => "",
      },
    });

    const classes = wrapper.find(".hp-fill").classes();

    expect(classes).not.toContain("hp-low");
    expect(classes).not.toContain("hp-mid");
  });
});
