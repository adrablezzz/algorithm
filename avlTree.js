/*
 * @Descripttion:
 * @version:
 * @Author: zhang jianjun
 * @Date: 2023-03-20 10:51:19
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-06-01 17:11:31
 */
/**
 * 1.AVL树是自平衡树
 * 2.左右子树高度差最多为1
 *
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const balanceFactor = {
  UNBALANCED_RIGHT: 5,
  SLIGHTLY_UNBALANCED_RIGHT: 4,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 2,
  UNBALANCED_LEFT: 1,
};

class AvlTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let that = this
    function insertNode(node) {
      if (!node) {
        return new Node(value);
      }
      if (value < node.value) {
        node.left = insertNode(node.left);
      } else if (value > node.value) {
        node.right = insertNode(node.right);
      } else {
        return node;
      }
      return that.balanceTree(node, value)
    }
    this.root = insertNode(this.root);
  }
  // 平衡树
  balanceTree(node, value) {
    const factor = this.getBalanceFactor(node);
    if (factor === balanceFactor.UNBALANCED_LEFT) {
      if (value < node.left.value) {
        node = this.rotateLL(node);
      } else {
        return this.rotateLR(node);
      }
    }
    if (factor === balanceFactor.UNBALANCED_RIGHT) {
      if (value > node.right.value) {
        node = this.rotateRR(node);
      } else {
        return this.rotateRL(node);
      }
    }
    return node;
  }
  // 获取节点高度
  getNodeHeight(node) {
    if (node === null) {
      return -1;
    } else {
      return (
        Math.max(
          this.getNodeHeight(node.left),
          this.getNodeHeight(node.right)
        ) + 1
      );
    }
  }
  // 获取平衡因子
  getBalanceFactor(node) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return balanceFactor.UNBALANCED_RIGHT;
      case -1:
        return balanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return balanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return balanceFactor.UNBALANCED_LEFT;
      default:
        return balanceFactor.BALANCED;
    }
  }
  // 左左
  rotateLL(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }
  // 右右
  rotateRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }
  // 左右(左子树右偏)
  rotateLR(node) {
    node.left = this.rotateRR(node.left);
    return this.rotateLL(node);
  }
  // 右左(右子树左偏)
  rotateRL(node) {
    node.right = this.rotateLL(node.right);
    return this.rotateRR(node);
  }

  getTree() {
    return this.root;
  }
  
  getTreeMap() {
    let node = this.root
    let queue = []
    if(node === null) return queue
    queue.push(node)
    let res = []
    while(queue.length) {
      node = queue.shift()
      res.push(node.value)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    let mapStr = '', maxCount = 1
    for(let i=0; i<res.length; i++) {
      mapStr += `${res[i]} `
    }
    return res
  }
}

const avlTree1 = new AvlTree();
avlTree1.insert(10);
avlTree1.insert(9);
avlTree1.insert(8);
avlTree1.insert(6);
avlTree1.insert(5);
avlTree1.insert(11);
avlTree1.insert(12);
/**
 *   9
 *  6 11 
 * 5 8 10 12
 */
// console.log(JSON.stringify(avlTree1,null,2));
console.log(avlTree1.getTreeMap());
