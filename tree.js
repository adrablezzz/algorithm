/*
 * @Descripttion: 树
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-03-13 15:34:26
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-06-08 09:57:03
 */
/**
 * 1.树： n个节点组成的集合 n有限且n∈自然数；
 *        每个节点有0或多个结点
 *        没有父节点的节点叫根节点
 *        每个非根节点有且只有一个父节点
 *        除了根节点外，每个子节点分为多个不相交的子树
 * 2.节点的度：节点拥有的子叶个数
 * 3.树的度：最大的节点的度
 * 4.叶子结点：度为0的节点
 * 5.父节点：
 * 6.子节点：
 * 7.兄弟节点：相同父节点的节点
 * 8.祖先节点：
 * 9.子孙节点：
 * 10.节点层次：以根开始，根为第一层，根的子节点为第二层…，如果一个节点在第n层，则它的子树的根节点在n+1层
 * 11.深度或高度： 树中节点的最大层次
 * 12.森林： 由n棵互不相交的树的集合，例如图中节点A去掉，以节点B为根的树和以节点C为根的树组成的集合就叫做森林
 */

/**
 * 二叉树：是每个节点最多只有两个子树的树结构，这两种子树通常叫做左子树和右子树，具有左右次序，不能颠倒
 * 二叉树特点：
 *  a.二叉树的第i层至多有2^(i-1)个节点
 *  b.高度为k的二叉树至多有2^k-1个节点
 *  c.非空二叉树中，叶子结点数为n0,度为2的节点数为n2，则n0=n2+1
 *  d.具有n个节点的完全二叉树的深度不大于log2n的最大整数
 * 满二叉树：在一棵二叉树中，所有的分支节点都存在左子树和右子树，并且所有的叶子结点都在同一层上
 * 完全二叉树：如果二叉树中除去最后一层节点为满二叉树，且最后一层的结点依次从左到右分布，则此二叉树被称为完全二叉树。
 */
/**
 *    A        A                10          根节点      第0层
 *  B   C    B   C            8     12      子叶节点    子树：879
 * D E F G  D E F           7  9   11 13    叶节点      深度为3层
 * 满二叉树  完全二叉树        二叉搜索树
 */
/**
 * 二叉搜索树：
 *    若它的左子树不为空，则左子树上所有节点的值都小于根节点的值 若它的右子树不为空，则右子树上所有节点的值都大于根节点的值；
 *    它的左右子树也分别为二叉搜索树
 */
class Node {
  constructor(value) {
    this.value = value
    this.leftChild = null
    this.rightChild = null
  }
}
class BinaryTree {
  constructor() {
    this.root = null
  }
  #insert(node, newNode) {
    if(newNode.value < node.value) {
      this.#insertChild(node, 'leftChild', newNode)
    }else {
      this.#insertChild(node, 'rightChild', newNode)
    }
  }
  #insertChild(node, childName, newNode) {
    if(node[childName] === null) {
      node[childName] = newNode
    }else {
      this.#insert(node[childName], newNode)
    }
  }
  append(value) {
    const node = new Node(value)
    if(this.root === null) {
      this.root = node
    }else {
      this.#insert(this.root, node)
    }
  }
  // 深度优先-中序遍历：从小到大 (左中右)
  #inOrderTraverseNode(node, callback) {
    if(node) {
      this.#inOrderTraverseNode(node.leftChild, callback)
      callback(node.value)
      this.#inOrderTraverseNode(node.rightChild, callback)
    }
  } 
  inOrderTraverse() {
    let res = []
    this.#inOrderTraverseNode(this.root, (value) => {
      res.push(value)
    })
    return res
  }
  // 中序-循环
  inOrderTraverseByLoop() {
    var res = []
    var node = this.root
    var stack = []
    while(true) {
      while(node) {
        stack.push(node)
        node = node.leftChild
      }
      node = stack.pop()
      res.push(node.value)
      node = node.rightChild
      if(!node && stack.length===0) {
        break;
      }
    }
    return res
  }
  // 深度优先-先序遍历：根节点开始，优先于后代节点，从左往右 (中左右)
  #preOrderTraverseNode(node, callback) {
    if(node) {
      callback(node.value)
      this.#preOrderTraverseNode(node.leftChild, callback)
      this.#preOrderTraverseNode(node.rightChild, callback)
    }
  }
  preOrderTraverse() {
    let res = []
    this.#preOrderTraverseNode(this.root, (value) => {
      res.push(value)
    })
    return res
  }
  // 先序-循环
  preOrderTraverseByLoop() {
    var res = []
    var node = this.root
    var stack = []
    /** stack 输出node最后一位值
     * 11 
     * 15 7 
     * 15 9 5 
     * 15 9 6 3
     * 15 9 6
     * 15 9 
     * 15 10 8
     * 15 10 
     * 15 
     * 20 13 
     * 20 14 12
     * 20 14
     * 20
     * 25 18
     * 25
     */
    while(node) {
      res.push(node.value)
      node.rightChild && stack.push(node.rightChild)
      node.leftChild && stack.push(node.leftChild)
      node = stack.pop()
    }
    return res
  }
  // 深度优先-后序遍历：先访问节点的后代节点 (左右中)
  #postOrderTraverseNode(node, callback) {
    if(node) {
      this.#postOrderTraverseNode(node.leftChild, callback)
      this.#postOrderTraverseNode(node.rightChild, callback)
      callback(node.value)
    }
  }  
  postOrderTraverse() {
    let res = []
    this.#postOrderTraverseNode(this.root, (value) => {
      res.push(value)
    })
    return res
  }
  // 后序-循环
  postOrderTraverseByLoop() {
    let res = []
    let node = this.root
    let stack = []
    /** stack 倒序输出node
     * 11
     * 7 15
     * 7 13 20 
     * 7 13 18 25
     * 7 13 18
     * 7 13
     * 7 12 14
     * 7 12
     * 7
     * 5 9
     * 5 8 10
     * 5 8 
     * 5 
     * 3 6
     * 3
     */
    stack.push(node)
    while(stack.length>0) {
      node = stack.pop()
      res.unshift(node.value)
      node.leftChild && stack.push(node.leftChild)
      node.rightChild && stack.push(node.rightChild)
    }
    return res
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
      node.leftChild && queue.push(node.leftChild)
      node.rightChild && queue.push(node.rightChild)
    }
    return res
  }
  // 最小值（最左子叶节点）
  min() {
    let current = this.root
    while(current && current.leftChild) {
      current = current.leftChild
    }
    return current.value
  }
  // 最大值（最右子叶节点）
  max() {
    let current = this.root
    while(current && current.rightChild) {
      current = current.rightChild
    }
    return current.value
  }
  // 最大深度
  maxDeep(node = this.root) {
    if(node === null) return 0
    let left = this.maxDeep(node.leftChild)
    let right = this.maxDeep(node.rightChild)
    console.log(left, right)
    return Math.max(left,right) + 1
  }
  getTree() {
    return this.root
  }
}



const tree1 = new BinaryTree()
tree1.append(11)
tree1.append(7)
tree1.append(15)
tree1.append(5)
tree1.append(9)
tree1.append(13)
tree1.append(20)
tree1.append(3)
tree1.append(6)
tree1.append(8)
tree1.append(10)
tree1.append(12)
tree1.append(14)
tree1.append(18)
tree1.append(25)
// console.log(tree1.inOrderTraverse())  //中序 
// 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
// console.log(tree1.inOrderTraverseByLoop())  //中序-循环
// console.log(tree1.preOrderTraverse()) //先序
// 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
// console.log(tree1.preOrderTraverseByLoop()) //先序-循环
// console.log(tree1.postOrderTraverse()) //后序
// 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11
// console.log(tree1.postOrderTraverseByLoop()) //后序-循环
// console.log(tree1.min()) 
// console.log(tree1.max()) 
// console.log(tree1.levelOrderTraverse()) 
// console.log(tree1.maxDeep()) 
// console.log(JSON.stringify(tree1,null,2))
console.log(tree1.getTree())