import type { Component } from "vue";

export interface TableColumn {
  key: string;
  title: string;
  align?: "left" | "center" | "right";
}

export interface TabItem {
  key: string;
  title: string;
  icon?: string | Component;
  color?: string;
}
