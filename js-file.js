class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(array);
  }

  insert(node = this.root, value) {
    if (node === null) {
      return new Node(value);
    }
    if (node.data === value) {
      return node;
    }
    if (node.data < value) {
      node.right = this.insert(node.right, value);
    } else {
      node.left = this.insert(node.left, value);
    }
    return node;
  }

  deleteItem(node = this.root, value) {
    if (node === null) {
      return;
    }
    if (node.data === value) {
      if (node.right === null && node.left === null) {
        return "leaf";
      } else if (
        (node.right !== null && node.left === null) ||
        (node.right === null && node.left !== null)
      ) {
        return "singleChild";
      } else {
        let tmp = node.right;
        while (tmp.left !== null) {
          tmp = tmp.left;
        }
        node.data = tmp.data;
        tmp.data = value;
        this.deleteItem(node, value);
      }
    }

    const right = this.deleteItem(node.right, value);
    if (right === "leaf") {
      node.right = null;
      return;
    } else if (right === "singleChild") {
      if (node.right.right !== null) {
        node.right = node.right.right;
      } else {
        node.right = node.right.left;
      }
    }
    const left = this.deleteItem(node.left, value);
    if (left === "leaf") {
      this.left = null;
      return;
    } else if (left === "singleChild") {
      if (node.left.left !== null) {
        node.left = node.left.left;
      } else {
        node.left = node.left.right;
      }
    }
  }

  find(node = this.root, value) {
    if (node === null) {
      return;
    }

    if (node.data === this.root.data) {
      if (value > node.data) {
        node = node.right;
      } else {
        node = node.left;
      }
    }

    if (value === node.data) {
      return node;
    }

    const right = this.find(node.right, value);
    if (typeof right === "object") {
      return right;
    }
    const left = this.find(node.left, value);
    if (typeof left === "object") {
      return left;
    }

    return null;
  }

  levelOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required!");
    }
    const queue = new Queue();
    queue.enqueue(this.root);

    while (queue.size() > 0) {
      if (queue.front().left !== null) {
        queue.enqueue(queue.front().left);
      }
      if (queue.front().right !== null) {
        queue.enqueue(queue.front().right);
      }
      callback(queue.dequeue());
    }
  }

  inOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required!");
    }

    const traverse = (node) => {
      if (!node) {
        return;
      }

      traverse(node.left);

      callback(node);

      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required!");
    }

    const traverse = (node) => {
      if (!node) {
        return;
      }

      callback(node);

      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrder(callback) {
    if (!callback) {
      throw new Error("Callback is required!");
    }

    const traverse = (node) => {
      if (!node) {
        return;
      }

      traverse(node.left);
      traverse(node.right);

      callback(node);
    };

    traverse(this.root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    if (node.left === null && node.right === null) {
      return 0;
    }
    const left = this.height(node.left);
    const right = this.height(node.right);
    if (left >= right) {
      return left + 1;
    } else return right + 1;
  }

  depth(node, topNode = this.root) {
    if (topNode === null) {
      return;
    }
    if (node === topNode) {
      return 0;
    }
    const left = this.depth(node, topNode.left);
    if (typeof left === "number") {
      return left + 1;
    }
    const right = this.depth(node, topNode.right);
    if (typeof right === "number") {
      return right + 1;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const left = this.height(node.left);
    const right = this.height(node.right);

    if (Math.abs(left - right) > 1) {
      return false;
    } else {
      const leftBal = this.isBalanced(node.left);
      if (leftBal === false) {
        return false;
      }

      const rightBal = this.isBalanced(node.right);
      if (rightBal === false) {
        return false;
      }

      if (leftBal === true && rightBal === true) {
        return true;
      }
    }
  }

  rebalance(tree) {
    const newInput = [];
    tree.inOrder((node) => newInput.push(node.data));
    console.log(newInput);
    this.array = newInput;
    this.root = buildTree(newInput);
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Empty";
    }

    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "No elements in queue";
    }
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  printQueue() {
    var string = "";
    for (let i = 0; i < this.items.length; i++) {
      string += this.items[i] + " ";
    }
    return string;
  }
}
function sortAndRemoveDupe(array) {
  const sortedArray = mergeSort(array);
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i + 1]) {
      sortedArray.splice(i + 1, 1);
    }
  }
  return sortedArray;
}

function buildTree(array) {
  let mid;
  if (array.length < 1) {
    return null;
  } else if (array.length % 2 === 1) {
    mid = Math.floor(array.length / 2);
  } else {
    mid = array.length / 2 - 1;
  }
  const root = new Node();
  root.data = array[mid];
  if (array.length === 1) {
    return root;
  } else {
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));
    return root;
  }
}

function mergeSort(array) {
  const leftHalfLength = Math.ceil(array.length / 2);
  const result = [];

  const leftHalf = array.slice(0, leftHalfLength);
  const rightHalf = array.slice(leftHalfLength, array.length);
  let merge = false;

  let sortedLeft;
  let sortedRight;
  if (array.length > 2 && merge === false) {
    sortedLeft = mergeSort(leftHalf);
    sortedRight = mergeSort(rightHalf);
    merge === true;
  }

  let length;
  if (array.length <= 2) {
    length = array.length;
    for (i = 0; i < length; i++) {
      if (leftHalf[0] <= rightHalf[0]) {
        const first = leftHalf.shift();
        result.push(first);
      } else if (leftHalf[0] === undefined) {
        const first = rightHalf.shift();
        result.push(first);
      } else if (rightHalf[0] === undefined) {
        const first = leftHalf.shift();
        result.push(first);
      } else {
        const first = rightHalf.shift();
        result.push(first);
      }
    }
  } else {
    length = sortedLeft.length + sortedRight.length;
    for (i = 0; i < length; i++) {
      if (sortedLeft[0] <= sortedRight[0]) {
        const first = sortedLeft.shift();
        result.push(first);
      } else if (sortedLeft[0] === undefined) {
        const first = sortedRight.shift();
        result.push(first);
      } else if (sortedRight[0] === undefined) {
        const first = sortedLeft.shift();
        result.push(first);
      } else {
        const first = sortedRight.shift();
        result.push(first);
      }
    }
  }
  return result;
}

const array = sortAndRemoveDupe([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 55, 44, 33, 22, 5, 14, 88, 33,
]);

const root = buildTree(array);
const test = new Tree(array);

console.log(test.isBalanced());
console.log(test.levelOrder((node) => console.log(node.data)));
console.log(test.preOrder((node) => console.log(node.data)));
console.log(test.postOrder((node) => console.log(node.data)));
console.log(test.inOrder((node) => console.log(node.data)));
test.insert(test.root, 111);
test.insert(test.root, 211);
console.log(test.isBalanced());
test.rebalance(test);
console.log(test.isBalanced());
console.log(test.levelOrder((node) => console.log(node.data)));
console.log(test.preOrder((node) => console.log(node.data)));
console.log(test.postOrder((node) => console.log(node.data)));
console.log(test.inOrder((node) => console.log(node.data)));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(test.root);
