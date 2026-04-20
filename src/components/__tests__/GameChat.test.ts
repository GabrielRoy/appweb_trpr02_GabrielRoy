import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GameChat from "../GameChat.vue";

describe("GameChat", () => {
  it("n'affiche rien si aucun message", () => {
    const wrapper = mount(GameChat, {
      props: {
        chatMessages: [],
      },
    });

    expect(wrapper.find(".chat").exists()).toBe(false);
  });

  it("affiche un message", () => {
    const wrapper = mount(GameChat, {
      props: {
        chatMessages: ["Hello"],
      },
    });

    expect(wrapper.text()).toContain("Hello");
  });

  it("affiche plusieurs messages", () => {
    const wrapper = mount(GameChat, {
      props: {
        chatMessages: ["Hello", "World"],
      },
    });

    const messages = wrapper.findAll(".chat > div");

    expect(messages.length).toBe(2);
    expect(messages[0].text()).toBe("Hello");
    expect(messages[1].text()).toBe("World");
  });

  it("affiche la div .chat si messages présents", () => {
    const wrapper = mount(GameChat, {
      props: {
        chatMessages: ["Test"],
      },
    });

    expect(wrapper.find(".chat").exists()).toBe(true);
  });
});
