import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RankingRow from "../RankingScore.vue";
import type { Ranking } from "../../types/ranking";

describe("RankingRow", () => {
  const ranking: Ranking = {
    id: 1,
    name: "Ash",
    score: 999,
  };

  it("affiche la position", () => {
    const wrapper = mount(RankingRow, {
      props: { place: 1, ranking },
    });

    expect(wrapper.text()).toContain("#1");
  });

  it("affiche le nom", () => {
    const wrapper = mount(RankingRow, {
      props: { place: 2, ranking },
    });

    expect(wrapper.text()).toContain("Ash");
  });

  it("affiche le score", () => {
    const wrapper = mount(RankingRow, {
      props: { place: 3, ranking },
    });

    expect(wrapper.text()).toContain("999 P$");
  });

  it("a les bonnes classes HTML", () => {
    const wrapper = mount(RankingRow, {
      props: { place: 1, ranking },
    });

    expect(wrapper.find(".ranking-row").exists()).toBe(true);
    expect(wrapper.find(".place").exists()).toBe(true);
    expect(wrapper.find(".name").exists()).toBe(true);
    expect(wrapper.find(".score").exists()).toBe(true);
  });
});
