import * as assert from "assert";
import { Tree } from "./tree";

type EmployeeType = {
  name: string;
  id: string;
  manager_id: string | null;
};

function exampleTree(): Tree | undefined {
  const employeeData: EmployeeType[] = [
    { name: "Jamie", id: "150", manager_id: null },
    { name: "Allan", id: "100", manager_id: "150" },
    { name: "Martin", id: "220", manager_id: "100" },
    { name: "Alex", id: "275", manager_id: "100" },
    { name: "Steve", id: "400", manager_id: "150" },
    { name: "David", id: "190", manager_id: "400" },
  ];

  let tree: Tree | undefined;
  for (const employee of employeeData) {
    if (!tree) {
      tree = new Tree(employee.id, employee.name);
    } else {
      tree.insert(employee.manager_id, employee.id, employee.name);
    }
  }
  return tree;
}

describe("Tree", () => {
  const tree = exampleTree();

  describe("#find", () => {
    it("should find a node when given existing id", () => {
      const res = tree?.find("100");
      assert.strictEqual(res?.key, "100");
    });

    it("should return undefined when given unknown id", () => {
      const res = tree?.find("100000");
      assert.strictEqual(res, undefined);
    });
  });

  describe("#insert", () => {
    const newEmployee = { name: "Temp", id: "180", manager_id: "400" };
    const newEmployee2 = { name: "Test", id: "280", manager_id: "500" };
    it("should add a node with proper manager id", () => {
      tree?.insert(newEmployee.manager_id, newEmployee.id, newEmployee.name);
      const res = tree?.find(newEmployee.id);
      assert.strictEqual(res?.key, newEmployee.id);
    });

    it("should not add a node to the tree with unknown manager id", () => {
      tree?.insert(newEmployee2.manager_id, newEmployee2.id, newEmployee2.name);
      const res = tree?.find(newEmployee2.id);
      assert.strictEqual(res, undefined);
    });
  });

  describe("#customPreOrderTraversal", () => {
    it("should return the proper expected response", () => {
      const res = tree?.customPreOrderTraversal();
      assert.deepEqual(res, [
        { name: "Jamie", level: 0 },
        { name: "Allan", level: 1 },
        { name: "Martin", level: 2 },
        { name: "Alex", level: 2 },
        { name: "Steve", level: 1 },
        { name: "David", level: 2 },
        { name: "Temp", level: 2 },
      ]);
    });
  });
});
