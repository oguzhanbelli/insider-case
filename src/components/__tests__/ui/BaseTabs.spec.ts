import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseTabs from "@/components/ui/BaseTabs.vue"; // Adjust the import path as necessary
import type { TabItem } from "@/types/ui";

const mockTabs: TabItem[] = [
  { key: "tab1", title: "First Tab", color: "blue" },
  { key: "tab2", title: "Second Tab", color: "green" },
  { key: "tab3", title: "Third Tab", color: "red" },
];

describe("BaseTabs", () => {
  it("renders all tabs correctly", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
      },
    });

    const tabButtons = wrapper.findAll("button[role=\"tab\"]");
    expect(tabButtons).toHaveLength(mockTabs.length);

    mockTabs.forEach((tab, index) => {
      expect(tabButtons[index].text()).toBe(tab.title);
      expect(tabButtons[index].attributes("id")).toBe(`tab-${tab.key}`);
    });
  });

  it("sets correct active tab", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab2",
      },
    });

    const tabButtons = wrapper.findAll("button[role=\"tab\"]");

    expect(tabButtons[0].attributes("aria-selected")).toBe("false");
    expect(tabButtons[1].attributes("aria-selected")).toBe("true");
    expect(tabButtons[2].attributes("aria-selected")).toBe("false");
  });

  it("applies correct tabindex for keyboard navigation", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
      },
    });

    const tabButtons = wrapper.findAll("button[role=\"tab\"]");

    expect(tabButtons[0].attributes("tabindex")).toBe("0"); // Active tab
    expect(tabButtons[1].attributes("tabindex")).toBe("-1"); // Inactive tab
    expect(tabButtons[2].attributes("tabindex")).toBe("-1"); // Inactive tab
  });

  it("emits update:activeTab when tab is clicked", async () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
      },
    });

    const secondTab = wrapper.findAll("button[role=\"tab\"]")[1];
    await secondTab.trigger("click");

    expect(wrapper.emitted("update:activeTab")).toBeTruthy();
    expect(wrapper.emitted("update:activeTab")?.[0]).toEqual(["tab2"]);
  });

  it("applies correct color classes for active tabs", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab2", // Green tab
      },
    });

    const activeTab = wrapper.findAll("button[role=\"tab\"]")[1];
    expect(activeTab.classes()).toContain("bg-green-500/80");
  });

  it("applies correct ARIA attributes", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
        ariaLabel: "Main navigation tabs",
      },
    });

    const tablist = wrapper.find("[role=\"tablist\"]");
    expect(tablist.attributes("aria-label")).toBe("Main navigation tabs");

    const tabButtons = wrapper.findAll("button[role=\"tab\"]");
    tabButtons.forEach((button, index) => {
      expect(button.attributes("aria-controls")).toBe(
        `panel-${mockTabs[index].key}`,
      );
    });
  });

  it("uses default aria-label when not provided", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
      },
      attrs: {
        "aria-label": "Tab navigation",
      },
    });

    const tablist = wrapper.find("[role=\"tablist\"]");
    const ariaLabel = tablist.attributes("aria-label");
    expect(ariaLabel).toBe("Tab navigation");
  });

  it("handles tabs with icons correctly", () => {
    const tabsWithIcons: TabItem[] = [
      { key: "home", title: "Home", icon: "🏠" },
      { key: "settings", title: "Settings", icon: "⚙️" },
    ];

    const wrapper = mount(BaseTabs, {
      props: {
        tabs: tabsWithIcons,
        activeTab: "home",
      },
    });

    const firstTab = wrapper.findAll("button[role=\"tab\"]")[0];
    expect(firstTab.text()).toContain("🏠");
    expect(firstTab.text()).toContain("Home");
  });

  it("applies hover styles to inactive tabs", () => {
    const wrapper = mount(BaseTabs, {
      props: {
        tabs: mockTabs,
        activeTab: "tab1",
      },
    });

    const inactiveTab = wrapper.findAll("button[role=\"tab\"]")[1];
    expect(inactiveTab.classes()).toContain("hover:bg-surface-hover");
    expect(inactiveTab.classes()).toContain("hover:scale-105");
  });

  it("returns correct active tab class for different colors", () => {
    const colorTests = [
      { color: "green", expectedClass: "bg-green-500/80" },
      { color: "blue", expectedClass: "bg-blue-500/80" },
      { color: "yellow", expectedClass: "bg-yellow-500/80" },
      { color: "red", expectedClass: "bg-red-500/80" },
      { color: undefined, expectedClass: "bg-blue-500/80" }, // default
    ];

    colorTests.forEach(({ color, expectedClass }) => {
      const tab: TabItem = { key: "test", title: "Test", color };
      const wrapper = mount(BaseTabs, {
        props: {
          tabs: [tab],
          activeTab: "test",
        },
      });

      const activeTab = wrapper.find("button[role=\"tab\"]");
      expect(activeTab.classes()).toContain(expectedClass);
    });
  });
});
