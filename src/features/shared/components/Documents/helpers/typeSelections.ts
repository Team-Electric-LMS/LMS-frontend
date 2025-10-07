import { SelectionDto, SelectionType, ICourse, IModule, IActivity } from "../types";

export function getSelectedNodes(tree: ICourse[], selectedIds: string[]): SelectionDto[] {
  const result: SelectionDto[] = [];

  function traverse(node: ICourse | IModule | IActivity, type: SelectionType) {
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
