/*
 * @Descripttion: 
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-04-07 13:46:01
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-04-07 17:07:13
 */
/**
 * 红黑树：
 *  0.是avl树
 *  1.每个节点是红色或黑色
 *  2.树的根节点是黑色
 *  3.所有叶节点都是黑色(null)
 *  4.如果一个节点是红色，它的两个子节点都是黑色
 *  5.不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
 *  6.从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点
 */
const Colors = {
  'RED': 1,
  'BLACK': 2
}
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.color = Colors.RED
    this.parent = null
    this.height = null
  }
  isRed() {
    return this.color === Colors.RED
  }
}

class RedBlackTree {
  constructor() {
    this.root = null
  }
  insert(value) {
    if(this.root == null) {
      this.root = new Node(value)
      this.root.color = Colors.BLACK
    }else {
      const newNode = this.insertNode(this.root, value)
      this.fixTreeProperties(newNode)
    }
  }
  insertNode(node, value) {
    if(value < node.value) {
      if(node.left == null) {
        node.left = new Node(value)
        node.left.parent = node
        return node.left
      }else {
        return this.insertNode(node.left, value)
      }
    }else if(node.right == null) {
      node.right = new Node(value)
      node.right.parent = node
      return node.right
    }else {
      return this.insertNode(node.right, value)
    }
  }
  fixTreeProperties(node) {
    while(node.parent && node.parent.isRed()) {
      let parent = node.parent
      let grandParent = parent.parent
      // 父节点是左节点
      if(grandParent && grandParent.left === parent) {
        const uncle = parent.right
        // 叔节点是红--重新填色
        if(uncle && uncle.isRed()) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        }else {
          // 节点是右侧节点--左旋转
          if(node === node.right) {
            this.rotateRR(parent)
            node = parent
            parent = node.parent
          }
          // 节点是左侧节点--右旋转
          this.rotateLL(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
      // 父节点是右侧节点
      else {
        const uncle = parent.left
        // 叔节点是红--重新填色
        if(uncle && uncle.isRed()) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color= Colors.BLACK
          node = grandParent
        }
        else {
          // 节点是左侧节点--右旋转
          if(node === parent.left) {
            this.rotateLL(parent)
            node = parent
            parent = node.parent
          }
          // 节点是右侧节点--左旋转
          this.rotateRR(grandParent) 
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
    }
    this.root.color = Colors.BLACK
  }
  // 左左
  rotateLL(node) {
    const tmp = node.left;
    node.left = tmp.right;
    if(tmp.right && tmp.right.value) {
      tmp.right.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent) {
      this.root = tmp
    }
    else {
      if(node === node.parent.left) {
        node.parent.left = tmp
      }
      else {
        node.parent.right = tmp
      }
    }
    tmp.right = node
    node.parent = tmp
  }
  // 右右
  rotateRR(node) {
    const tmp = node.right; 
    node.right = tmp.left; 
    if (tmp.left && tmp.left.key) { 
    tmp.left.parent = node;
    } 
    tmp.parent = node.parent; 
    if (!node.parent) { 
    this.root = tmp; 
    } 
    else { 
    if (node === node.parent.left) { 
    node.parent.left = tmp;
    } 
    else { 
    node.parent.right = tmp;
    } 
    } 
    tmp.left = node; 
    node.parent = tmp;
  }
  // // 左右(左子树右偏)
  // rotateLR(node) {
  //   node.left = this.rotateRR(node.left);
  //   return this.rotateLL(node);
  // }
  // // 右左(右子树左偏)
  // rotateRL(node) {
  //   node.right = this.rotateLL(node.right);
  //   return this.rotateRR(node);
  // }
  getTree() {
    return this.root
  }
  // 广度优先：从上到下、从左往右，一层一层遍历
  levelOrderTraverse() {
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
    return res
  }
}