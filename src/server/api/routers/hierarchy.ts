import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Tree } from "../model/tree";

export type EmployeeType = {
  name: string;
  id: string;
  manager_id: string | null;
};

let newTree: Tree | null = null;

const employeeData: EmployeeType[] = [
  { name: "Jamie", id: "150", manager_id: null },
  { name: "Allan", id: "100", manager_id: "150" },
  { name: "Martin", id: "220", manager_id: "100" },
  { name: "Alex", id: "275", manager_id: "100" },
  { name: "Steve", id: "400", manager_id: "150" },
  { name: "David", id: "190", manager_id: "400" },
];

export const hierarchyRouter = createTRPCRouter({
  insert: publicProcedure.query(() => {
    for (const employee of employeeData) {
      if (!newTree) {
        newTree = new Tree(employee.id, employee.name);
      } else {
        newTree.insert(employee.manager_id, employee.id, employee.name);
      }
    }
    if (newTree) {
      return {
        success: true,
        data: newTree.customPreOrderTraversal(),
      };
    } else {
      return {
        success: false,
      };
    }
  }),
  getAll: publicProcedure.query(() => {
    return {
      success: true,
      results: employeeData,
    };
  }),
});
