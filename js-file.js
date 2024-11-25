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
    console.log(node.data);
    return node;
  }

  deleteItem(node = this.root, value) {
    if (node === null) {
      return;
    }
    if (node.data === value) {
      if (node.right === null && node.left === null) {
        return true;
      }
    }

    const right = this.deleteItem(node.right, value);
    if (right === true) {
      console.log("FOUND");
      node.right = null;
      return;
    }
    const left = this.deleteItem(node.left, value);
    if (left === true) {
      this.left = null;
      return;
    }
    console.log(this.root);
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
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const root = buildTree(array);
const test = new Tree(array);

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

prettyPrint(root);
