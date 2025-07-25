import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseTable from "@/components/ui/BaseTable.vue"; // Adjust the import path as necessary
import type { TableColumn } from "@/types/ui";
import { h } from "vue";

const mockColumns: TableColumn[] = [
  { key: "id", title: "ID", align: "center" },
  { key: "name", title: "Name" },
  { key: "score", title: "Score", align: "right" },
  { key: "status", title: "Status" },
];

const mockData = [
  { id: 1, name: "John Doe", score: 95, status: "Active" },
  {
    id: 2,
    name: "Jane Smith",
    score: 87,
    status: "Inactive",
    _class: "highlighted-row",
  },
  { id: 3, name: "Bob Johnson", score: 92, status: "Active" },
];

describe("BaseTable", () => {
  it("renders table with correct structure", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.find("thead").exists()).toBe(true);
    expect(wrapper.find("tbody").exists()).toBe(true);
  });

  it("renders column headers correctly", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const headers = wrapper.findAll("thead th");
    expect(headers).toHaveLength(mockColumns.length);

    mockColumns.forEach((column, index) => {
      expect(headers[index].text()).toBe(column.title);
    });
  });

  it("applies correct alignment classes to headers", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const headers = wrapper.findAll("thead th");
    expect(headers[0].classes()).toContain("text-center"); // ID column
    expect(headers[1].classes()).toContain("text-left"); // Name column (default)
    expect(headers[2].classes()).toContain("text-right"); // Score column
  });

  it("renders data rows correctly", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(mockData.length);
  });

  it("renders cell data correctly", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const firstRowCells = wrapper.findAll("tbody tr:first-child td");
    expect(firstRowCells[0].text()).toBe("1"); // ID
    expect(firstRowCells[1].text()).toBe("John Doe"); // Name
    expect(firstRowCells[2].text()).toBe("95"); // Score
    expect(firstRowCells[3].text()).toBe("Active"); // Status
  });

  it("applies custom row classes when provided", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows[1].classes()).toContain("highlighted-row");
  });

  it("applies correct alignment classes to cells", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const firstRowCells = wrapper.findAll("tbody tr:first-child td");
    expect(firstRowCells[0].classes()).toContain("text-center"); // ID column
    expect(firstRowCells[1].classes()).toContain("text-left"); // Name column
    expect(firstRowCells[2].classes()).toContain("text-right"); // Score column
  });

  it("renders custom cell content via slots", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
      slots: {
        "cell(status)": (props: { value: unknown }) =>
          h("span", { class: "status-badge" }, String(props.value)),
      },
    });

    const statusCells = wrapper.findAll("tbody td:nth-child(4)");
    statusCells.forEach((cell) => {
      expect(cell.html()).toContain("<span class=\"status-badge\">");
    });
  });

  it("handles empty data gracefully", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: [],
      },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(0);
  });

  it("has proper scrollable container", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const container = wrapper.find(".max-h-96.overflow-y-auto");
    expect(container.exists()).toBe(true);
    expect(container.classes()).toContain("custom-scrollbar");
  });

  it("has sticky header", () => {
    const wrapper = mount(BaseTable, {
      props: {
        columns: mockColumns,
        data: mockData,
      },
    });

    const thead = wrapper.find("thead");
    expect(thead.classes()).toContain("sticky");
    expect(thead.classes()).toContain("top-0");
  });
});
