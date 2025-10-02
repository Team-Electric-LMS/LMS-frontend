import { SelectionDto, SelectionType, Course, Module, Activity } from "../types";

export function getSelectedNodes(tree: Course[], selectedIds: string[]): SelectionDto[] {
  const result: SelectionDto[] = [];

  function traverse(node: Course | Module | Activity, type: SelectionType) {
    if (selectedIds.includes(node.id)) {
      result.push({ id: node.id, type });
    }

    if ("modules" in node) {
      node.modules.forEach(m => traverse(m, "module"));
    }
    if ("activities" in node) {
      node.activities.forEach(a => traverse(a, "activity"));
    }
  }

  tree.forEach(c => traverse(c, "course"));
  return result;
}
