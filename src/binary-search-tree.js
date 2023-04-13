const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.tree;
  }
  root() {
    return this.tree;
  }

  add(data) {
    if (!this.tree) {
      this.tree = new Node(data);
      return;
    }
    let currentNode = this.tree;
    while (currentNode.left && currentNode.right) {
      if(currentNode.left){
        
      }
      currentNode = currentNode.left;
    }
    if (currentNode.left && !currentNode.right) {
      currentNode.right = new Node(data);
    } else {
      currentNode.left = new Node(data);
    }
  }

  has(data) {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  find(/* data */) {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  remove(/* data */) {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  min() {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }

  max() {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }
}

module.exports = {
  BinarySearchTree,
};
