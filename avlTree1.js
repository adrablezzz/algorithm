// import treeUnit from '../unit/TreeUnit.js'

/**
 * 平衡因子： 某个结点的左子树的高度减去右子树的高度得到的差值
 */
function TreeCode() {
  var tree = null;
  let TreeNode = function (value) {
    this.key = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  };

  this.createTree = function () {
    this.insert(5);
    this.insert(2);
    this.insert(7);
    this.insert(9);
    this.insert(8);
    this.insert(10);
    this.insert(11);
    this.insert(12);
    this.insert(13);
    this.insert(14);
    this.insert(15);
    return tree;
  };

  this.createTreeArray = () => {
    //前序遍历
    function NLR(biTree, index) {
      if (biTree === null) return;
      treeArray[index] = biTree.key + "";
      NLR(biTree.left, 2 * index + 1);
      NLR(biTree.right, 2 * index + 2);
    }
    let treeArray = [];
    NLR(tree, 0);
    return treeArray;
  };
  /**
   * 插入
   * @param {number} key 结点的键值
   */
  this.insert = function (key) {
    function insert(tree) {
      if (!tree) {
        return new TreeNode(key);
      }
      if (key < tree.key) {
        tree.left = insert(tree.left);
      } else if(key > tree.key) {
        tree.right = insert(tree.right);
      }else { // 重复值不插入
        return tree
      }
      tree.height = 1 + Math.max(getHeight(tree.left), getHeight(tree.right));
      var balance = getBalance(tree);
      if (Math.abs(balance) > 1) {
        // 平衡因子绝对值 > 1 平衡二叉树
        return keepBalance(balance, tree);
      }
      return tree;
    }
    tree = insert(tree);
  };

  function keepBalance(balance, tree) {
    //                  左子树高度-右子树高度
    if (balance < -1 && getBalance(tree.right) <= 0) {
      // RR
      return leftRotate(tree);
    }
    if (balance > 1 && getBalance(tree.left) >= 0) {
      // LL
      return rightRotate(tree);
    }
    if (balance > 1 && getBalance(tree.left) < 0) {
      // LR
      tree.left = leftRotate(tree.left);
      return rightRotate(tree);
    }
    if (balance < -1 && getBalance(tree.right) > 0) {
      // RL
      tree.right = rightRotate(tree.right);
      return leftRotate(tree);
    }
  }
  /**
   *
   * |-----y-----|
   *          |--x--|
   *          t1    z
   * @param {object} y 平衡因子>1,待旋转的节点
   */
  function leftRotate(y) {
    var x = y.right;
    var t1 = x.left;
    y.right = t1;
    x.left = y;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  }
  /**
   *
   *    |-----y-----|
   * |--x--|
   * z     t1
   * @param {object} y 平衡因子>1,待旋转的节点
   */
  function rightRotate(y) {
    var x = y.left;
    var t1 = x.right;
    y.left = t1;
    x.right = y;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
  }

  function getHeight(node) {
    if (node == null) {
      return 0;
    }
    return node.height;
  }

  function getBalance(node) {
    if (node == null) {
      return 0;
    }
    return getHeight(node.left) - getHeight(node.right);
  }

  /**
   * 查询
   * @param {number} tree 结点的键值
   * @returns 查询结果，若查到返回
   */
  function search(key) {
    function search(tree) {
      if (tree) {
        if (tree.key === key) {
          return tree;
        } else if (key < tree.key) {
          return search(tree.left);
        } else {
          return search(tree.right);
        }
      }
    }
    return search(tree);
  }
  /**
   * 删除
   * @param {number} tree 结点的键值
   */
  function deleteNode(key) {
    function deleteNode(tree, key) {
      if (!tree) {
        return null;
      }
      if (tree.key === key) {
        if (tree.left && tree.right) {
          var minKey = minNode(tree.right).key;
          tree.key = minKey;
          tree.right = deleteNode(tree.right, minKey);
        } else if (tree.left) {
          return tree.left;
        } else if (tree.right) {
          return tree.right;
        } else {
          return null;
        }
      } else if (key < tree.key) {
        tree.left = deleteNode(tree.left, key);
      } else {
        tree.right = deleteNode(tree.right, key);
      }
      tree.height = 1 + Math.max(getHeight(tree.left), getHeight(tree.right));
      var balance = getBalance(tree);
      if (Math.abs(balance) > 1) {
        // 平衡因子绝对值 > 1 平衡二叉树
        return keepBalance(balance, tree);
      }
      return tree;
    }
    tree = deleteNode(tree, key);
  }

  function minNode(tree) {
    if (!tree) {
      console.log("not find");
    } else if (tree.left) {
      return minNode(tree.left);
    } else {
      return tree;
    }
  }

  this.search = (key) => {
    var result = search(key);
    return result === undefined ? -1 : result.key;
  };

  this.delete = (key) => {
    console.log("删除结点：" + key);
    deleteNode(key);
  };

  this.getTree = () => {
    return tree;
  };
}

var tree = new TreeCode();
// tree.createTree()
// treeUnit.printTree(tree.createTreeArray())
// tree.delete(5)
// treeUnit.printTree(tree.createTreeArray())
// tree.delete(2)
tree.insert(10);
tree.insert(8);
tree.insert(8);
// treeUnit.printTree(tree.createTreeArray())

console.log(tree.getTree());
