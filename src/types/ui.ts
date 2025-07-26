import type { Component } from "vue";

export interface TableColumn {
  key: string;
  title: string;
  align?: "left" | "center" | "right";
}

export interface TableRow {
  [key: string]: unknown;
  _class?: string;
  // Horse properties
  id?: number;
  name?: string;
  color?: string;
  condition?: number;
  position?: number;
  // Race properties
  round?: number;
  distance?: number;
  horses?: number;
  status?: string;
}
export interface TabItem {
  key: string;
  title: string;
  icon?: string | Component;
  color?: string;
}
