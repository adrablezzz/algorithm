/*
 * @Descripttion: 
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-03-03 17:39:10
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-03-13 11:39:49
 */
const input = '/3x632545x'
const m = new Map()
m.set('/', 0)
m.set('1', 1)
m.set('2', 2)
m.set('3', 3)
m.set('4', 4)
m.set('5', 5)
m.set('6', 6)
m.set('7', 7)
m.set('8', 8)
m.set('9', 9)
m.set('x', 10)
// console.log(m.get('a'))
// m.delete('a')
// m.clear()
// console.log(m)
let res = input.split('')
               .map(item => m.get(item))
               .reduce((pre,cur) => pre + cur)
console.log(res)