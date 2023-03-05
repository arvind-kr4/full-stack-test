export class TreeNode {
  key: string;
  value: string;
  parent: TreeNode | null;
  children: TreeNode[];

  constructor(key: string, value = key, parent: TreeNode | null = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }

  get isLeaf(): boolean {
    return this.children.length === 0;
  }

  get hasChildren(): boolean {
    return !this.isLeaf;
  }
}

type PreOrderTraversalReturnType = {
  name: string;
  level: number;
};

export class Tree {
  root: TreeNode;
  constructor(key: string, value = key) {
    this.root = new TreeNode(key, value);
  }

  /**
   * Standard preOrder traversal which handles the tree structure
   * and returns list of TreeNodes
   * @param node => initial node to traverse from
   * @param acc => standard use of accumulator
   * @returns TreeNode[]
   */
  preOrderTraversal(node = this.root, acc: TreeNode[] = []): TreeNode[] {
    if (!node) {
      return acc;
    }
    acc.push(node);
    for (let child of node.children) {
      this.preOrderTraversal(child, acc);
    }
    return acc;
  }

  /**
   * This custom traversal limits the information returned and
   * its response can be shared with client
   * @param node => initial node to traverse from
   * @param level => height of the node (will used in client)
   * @param acc => standard use of accumulator
   * @returns PreOrderTraversalReturnType[]
   */
  customPreOrderTraversal(
    node = this.root,
    level: number = 0,
    acc: PreOrderTraversalReturnType[] = []
  ): PreOrderTraversalReturnType[] {
    if (!node) {
      return acc;
    }
    acc.push({ name: node.value, level });
    for (let child of node.children) {
      this.customPreOrderTraversal(child, level + 1, acc);
    }
    return acc;
  }

  /**
   * This func creates a new node and adds it to a existing tree and
   * thus its not capable of adding a new root node.
   * @param parentNodeKey => manager id
   * @param key => new node's key
   * @param value => new node's values
   * @returns status of the insert operation as a boolean
   */
  insert(parentNodeKey: string | null, key: string, value = key): boolean {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        // stop duplicate child inserts
        for (const child of node.children) {
          if (child?.key === key && child.value === value) {
            return false;
          }
        }
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  /**
   * This is a standard remove node operation on a tree where we
   * traverse through the tree and filter the child
   * @param key => key of node to remove
   * @returns status of the remove operation as a boolean
   */
  remove(key: string): boolean {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  /**
   * This func performs a pre order traversal and tries to find the node
   * @param key => key of node to search for
   * @returns TreeNode | undefined
   */
  find(key: string): TreeNode | undefined {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}
