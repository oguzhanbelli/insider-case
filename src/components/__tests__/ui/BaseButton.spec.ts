import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "@/components/ui/BaseButton.vue";

describe("BaseButton", () => {
  it("renders with default props", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.classes()).toContain("base-button");
    expect(wrapper.classes()).toContain("base-button--primary");
    expect(wrapper.classes()).toContain("base-button--md");
  });

  it("applies correct variant classes", () => {
    const variants = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
    ] as const;

    variants.forEach((variant) => {
      const wrapper = mount(BaseButton, {
        props: { variant },
      });
      expect(wrapper.classes()).toContain(`base-button--${variant}`);
    });
  });

  it("applies correct size classes", () => {
    const sizes = ["sm", "md", "lg"] as const;

    sizes.forEach((size) => {
      const wrapper = mount(BaseButton, {
        props: { size },
      });
      expect(wrapper.classes()).toContain(`base-button--${size}`);
    });
  });

  it("handles disabled state correctly", () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });

    expect(wrapper.classes()).toContain("base-button--disabled");
    expect(wrapper.attributes("disabled")).toBeDefined();
  });

  it("handles loading state correctly", () => {
    const wrapper = mount(BaseButton, {
      props: { loading: true },
      slots: {
        default: "Submit",
      },
    });

    expect(wrapper.classes()).toContain("base-button--loading");
    expect(wrapper.find(".loading-spinner").exists()).toBe(true);
    expect(wrapper.text()).toBe("Submit");
  });

  it("applies block class when block prop is true", () => {
    const wrapper = mount(BaseButton, {
      props: { block: true },
    });

    expect(wrapper.classes()).toContain("base-button--block");
  });

  it("emits click event when clicked", async () => {
    const wrapper = mount(BaseButton);

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
    expect(wrapper.emitted("click")).toHaveLength(1);
  });

  it("does not emit click event when disabled", async () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted("click")).toBeFalsy();
  });

  it("passes through attributes correctly", () => {
    const wrapper = mount(BaseButton, {
      attrs: {
        type: "submit",
        "data-testid": "submit-button",
      },
    });

    expect(wrapper.attributes("type")).toBe("submit");
    expect(wrapper.attributes("data-testid")).toBe("submit-button");
  });

  it("renders slot content correctly", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "<span class=\"icon\">🎯</span> Target",
      },
    });

    expect(wrapper.html()).toContain("<span class=\"icon\">🎯</span> Target");
  });
});
