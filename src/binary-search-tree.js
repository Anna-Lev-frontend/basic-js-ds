const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.tree = null;
  }
  root() {
    return this.tree;
  }

  add(data) {
    if (typeof data !== "number") {
      return this.tree;
    }
    const node = new Node(data); // новая node (5 ждет куда)

    if (!this.tree) {
      this.tree = node;
      return this.tree;
    }
    let currentNode = this.tree; //текущая node (10 верхушка)
    let stop = false;
    while (!stop) {
      if (currentNode.data < node.data) {
        if (currentNode.right === null) {
          currentNode.right = node;
          stop = true;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        if (currentNode.left === null) {
          currentNode.left = node; //записали
          stop = true; // остановили цикл
        } else {
          currentNode = currentNode.left;
        }
      }
    }
  }
  //data это аргумент функции
  has(data) {
    //5
    const foundNode = this.find(data);
    if (foundNode) {
      return true;
    }
    return false;
  }

  find(data) {
    if (typeof data !== "number") {
      return null;
    }
    let stop = false;
    let currentNode = this.tree;
    let foundNode;

    while (!stop) {
      if (!currentNode) {
        stop = true;
        foundNode = null;
        return foundNode;
      }
      if (currentNode.data === data) {
        stop = true;
        foundNode = currentNode;
      } else {
        if (currentNode.data < data) {
          // 7 < 5
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
    return foundNode;
  }

  remove(data) {
    if (typeof data !== "number") {
      return null;
    }
    let stop = false;
    let currentNode = this.tree;
    let foundNode;
    let parentNode;

    while (!stop) {
      if (currentNode.data === data) {
        stop = true;
        if (!parentNode) {
          if (!currentNode.left && !currentNode.right) {
            this.tree = null;
          } else if (currentNode.left && currentNode.right) {
            const newCurrentNode = this.min(currentNode.right);
            newCurrentNode.left = currentNode.left;
            newCurrentNode.right = currentNode.right;
            this.tree = newCurrentNode;
          } else if (!currentNode.right) {
            this.tree = currentNode.left;
          } else if (!currentNode.left) {
            this.tree = currentNode.right;
          }
        } else if (parentNode.left === currentNode) {
          if (!currentNode.left && !currentNode.right) {
            parentNode.left = null;
          } else if (currentNode.left && currentNode.right) {
            const newCurrentNode = this.min(currentNode.right);
            newCurrentNode.left = currentNode.left;
            newCurrentNode.right = currentNode.right;
            parentNode.left = newCurrentNode;
          } else if (!currentNode.right) {
            parentNode.left = currentNode.left;
          } else if (!currentNode.left) {
            parentNode.left = currentNode.right;
          }
        } else {
          if (!currentNode.left && !currentNode.right) {
            parentNode.right = null;
          } else if (currentNode.left && currentNode.right) {
            const newCurrentNode = this.min(currentNode.right);
            newCurrentNode.left = currentNode.left;
            newCurrentNode.right = currentNode.right;
            parentNode.right = newCurrentNode;
          } else if (!currentNode.right) {
            parentNode.right = currentNode.left;
          } else if (!currentNode.left) {
            parentNode.right = currentNode.right;
          }
        }
      } else {
        if (currentNode.data === null) {
          stop = true;
        }
        if (currentNode.data < data) {
          // 7 < 5
          parentNode = currentNode;
          currentNode = currentNode.right;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.left;
        }
      }
    }
    return foundNode;
  }

  min(node = this.tree) {
    if (!node.left) {
      return node;
    } else {
      return this.min(node.left);
    }
  }

  max(node = this.tree) {
    if (!node.right) {
      return node;
    } else {
      return this.min(node.right);
    }
  }
}
const tree = new BinarySearchTree();

tree.add(9);
tree.add(14);
tree.add(2);
tree.add(6);
tree.add(128);
tree.add(8);
tree.add(31);
tree.add(54);
tree.add(1);
tree.remove(14);
tree.remove(8);
tree.remove(9);
// console.log(tree.has(14), false);
// console.log(tree.has(8), false);
// console.log(tree.has(9), false);
// console.log(tree.has(2), true);
// console.log(tree.has(6), true);
// console.log(tree.has(128), true);
// console.log(tree.has(31), true);
// console.log(tree.has(54), true);
// console.log(tree.has(1), true);
module.exports = {
  BinarySearchTree,
};
