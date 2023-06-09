/*
 * @Descripttion: 
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-03-13 11:47:53
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-03-13 12:00:04
 */
// 无序且唯一
let set = new Set()

set.add(0)
set.add(1)
set.add(2)
set.add(3)
// set.delete(0)
// console.log(set.has(1))

// console.log(set)

let set2 = new Set([2,3,4])
let out = new Set()
// 交集
// set.forEach(item => {
//   if(set2.has(item)) {
//     out.add(item)
//   }
// })
// 差集
// set - set2
set.forEach(item => {
  if(!set2.has(item)) {
    out.add(item)
  }
})
// 并集
out = new Set([...set,...set2])
console.log(out)
