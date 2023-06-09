/*
 * @Descripttion: 
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-06-08 10:09:42
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-06-09 11:45:20
 */
class TreeNode<T> {
  value: T;
  leftChild: TreeNode<T> | null = null;
  rightChild: TreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

class BSTree<T> {
  root: TreeNode<T> | null = null;

  append(value: T) {
    const node = new TreeNode(value)
    if(!this.root) {
      this.root = node
    }else {
      this.insertNode(this.root, node)
    }
  }
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if(newNode.value < node.value) {
      if(!node.leftChild) {
        node.leftChild = newNode
      }else {
        this.insertNode(node.leftChild, newNode)
      }
    }else {
      if(!node.rightChild) {
        node.rightChild = newNode
      }else {
        this.insertNode(node.rightChild, newNode)
      }
    }
  }
  getRoot() {
    return this.root
  }
}

export default BSTree
const bst = new BSTree<number>()
bst.append(20)
console.log(bst.getRoot())
