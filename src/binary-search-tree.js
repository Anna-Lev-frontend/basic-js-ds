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
    let currentNode = this.tree; 
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
          currentNode.left = node; 
          stop = true; 
        } else {
          currentNode = currentNode.left;
        }
      }
    }
  }
  
  has(data) {
  
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

    let currentNode = this.tree;
    let parentNode = null;
    let foundNode = null;

    while (currentNode !== null && currentNode.data !== data) {
      if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    
    if (currentNode === null) {
      return null;
    }

    foundNode = currentNode;

 
    if (currentNode.left === null && currentNode.right === null) {
      if (parentNode === null) {
        this.tree = null;
      } else if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    // case 2: node has one child
    else if (currentNode.left === null) {
      if (parentNode === null) {
        this.tree = currentNode.right;
      } else if (parentNode.left === currentNode) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
    } else if (currentNode.right === null) {
      if (parentNode === null) {
        this.tree = currentNode.left;
      } else if (parentNode.left === currentNode) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
    }
    // case 3: node has two children
    else {
      let minRightNode = currentNode.right;
      let minRightParent = currentNode;

      while (minRightNode.left !== null) {
        minRightParent = minRightNode;
        minRightNode = minRightNode.left;
      }

      currentNode.data = minRightNode.data;

      if (minRightParent.left === minRightNode) {
        minRightParent.left = minRightNode.right;
      } else {
        minRightParent.right = minRightNode.right;
      }
    }

    return foundNode;
  }

  min(node = this.tree) {
    if (!node.left) {
      return node.data;
    } else {
      return this.min(node.left);
    }
  }

  max(node = this.tree) {
    if (!node.right) {
      return node.data;
    } else {
      return this.max(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree,
};
