/*
 * @Descripttion: 单链表
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-03-03 16:01:52
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-03-13 15:24:38
 */
/** head
 *  next ---> value     next -···-> value
 *  count     next ---> value       null
 */
// 节点
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
// 头部
class Head {
  constructor() {
    this.count = 0
    this.next = null
  }
}
// 插入
function insert(head, value) {
  const node = new Node(value)
  if(head.next === null) {
    head.next = node
  }else {
    let tem = head.next
    while(tem.next) {
      tem = tem.next
    }
    tem.next = node
  }
  head.count++
}
// 头插
function headInsert(head, value) {
  const node = new Node(value)
  node.next = head.next
  head.next = node
}
// 前插
function frontInsert(head, value, target) {
  const node = new Node(value)
  if(head.next === null) {
    head.next = node
    head.count++
  }else {
    let pre = head, cur = head.next
    while(cur !== null) {
      if(cur.value === target) {
        node.next = cur
        pre.next = node
        return
      }
      cur = cur.next
      pre = pre.next
      head.count++
    }
  }
  console.log('err: not found')
}
// 后插
function backInsert(head, value, target) {
  const node = new Node(value)
  if(head.next === null) {
    head.next = node
    head.count++
  }else {
    let cur = head.next
    while(cur.next !== null) {
      if(cur.value === target) {
        break
      }
      cur = cur.next
    }
    node.next = cur.next
    cur.next = node
    head.count++
    return
  }
  console.log('err: not found')
}
// 删除
function del(head, target) {
  let pre = head, cur = head.next
  while(cur) {
    if(cur.value === target) {
      pre.next = cur.next
      cur.next = null
      head.count--
      return true
    }
    cur = cur.next
    pre = pre.next
  }
  console.log('err: not found')
}
// 反转链表
function reverseList(head) {
  let pre = null, cur = head.next
  while(cur) {
    let temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  head.next = pre
}

const head = new Head()
insert(head, 1)
insert(head, 2)
insert(head, 3)
insert(head, 4)
// reverseList(head)
// headInsert(head, 0)
// frontInsert(head, 2, 3)
// backInsert(head, 4, 3)
// del(head, 0)
// console.log(JSON.stringify(head))


/**
 * 双向链表
 */
/** head
 *       <--- prev <--- prev <-...-       <--- tail
 *  next ---> value     next -···-> value
 *  count     next ---> value       null
 */
class DoubleNode {
  constructor(value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}
class DoubleHead {
  constructor() {
    this.count = 0
    this.next = null
    this.tail = null
  }
  append(value) {
    const node = new DoubleNode(value)
    if(this.next === null) {
      this.next = node
      this.tail = node
    }else {
      let temp = this.next
      while(temp.next) {
        temp = this.next
      }
      temp = this.tail
      temp.next = node
      node.prev = temp
      // node.prev = temp.value
      this.tail = node
    }
    this.count++
  }
}

// const doubleHead = new DoubleHead()
// doubleHead.append(1)
// doubleHead.append(2)
// console.log(JSON.stringify(doubleHead))
// console.log(doubleHead)

/**
 * 循环链表
 */
/** head        ↓----------------------------
 *  next ---> value     next -···-> value   ↑
 *  count     next ---> value       next ----
 */
class CircleNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
class CircleHead {
  constructor() {
    this.count = 0
    this.next = null
  }
  append(value) {
    const node = new CircleNode(value)
    if(this.next === null) {
      this.next = node
    }else {
      let first = this.next
      let temp = this.next
      let num = 0
      while(num <= this.count && temp.next) {
        temp = temp.next
        num++ 
      }
      temp.next = node
      node.next = first
    }
    this.count++
  }
}
const circleHead = new CircleHead()
circleHead.append(1)
circleHead.append(2)
circleHead.append(3)
// console.log(circleHead)
// console.log(JSON.stringify(circleHead))
// 判断是否循环链表
function isCircleLinkList (head) {
  let p1 = head.next
  let p2 = head.next
  while(p2 && p2.next) {
    p1 = p1.next
    p2 = p2.next.next
    if(p1 === p2) {
      console.log('is circle link list')
      return
    }
  }
  console.log('not circle link list')
}

isCircleLinkList(head)