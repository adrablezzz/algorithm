/*
 * @Descripttion:
 * @version:
 * @Author: zhang jianjun
 * @Date: 2023-02-21 11:07:10
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-03-08 11:26:48
 */
const list = [5, 4, 3, 2, 1];

// 冒泡排序
// 两层for循环；前>后交换顺序
function bubble(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
}
// bubble(arr)

// 插入排序
// 从第二位开始，前面的>后面的，前后交换
function insert(arr) {
  // 5 4 3 2 1
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i]; // 4,
    let j = i - 1; // 0
    while (j >= 0 && arr[j] > current) {
      // 5>4
      arr[j + 1] = arr[j]; // 5 5 3 2 1
      j--; // -1
    }

    arr[j + 1] = current; // 4 5 3 2 1
  }
}
/** i   arr     current  j     
 *  1   54321     4      0
 *      55321            -1
 *      45321
 *  2             3      1
 *      45521            0
 *      44521            -1
 *      34521
 */
// insert(list);

// 选择排序
// 选择第一位为最小值记录索引，后面有更小的照此，有交换顺序
function select(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}
// select(arr)

// 快速排序
// 递归 小值放左边 大值放右边 最后合并
function quick(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let left = [],
    right = [];
  let mark = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < mark) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quick(left).concat([mark], quick(right));
}

let arr2 = [1, 2, 3, 4, 5];
// 二分查找
function divide(arr, target) {
  let left = 0, right = arr.length - 1, mid
  while(left <= right) {
    mid = Math.floor((left + right) / 2)
    if(target === arr[mid]) {
      return mid
    }else if(target < arr[mid]) {
      right = mid -1
    }else {
      left = mid + 1
    }
  }
  return -1
}
// let res = divide(arr2, 1)
// console.log(res)

// 归并排序
let mergeArr = [5,2,3,4,1]
function mergeSort(arr) {
  let n = arr.length
  if(n <= 1) {
    return arr
  }
  const mid = Math.floor(n / 2)
  const left = mergeSort(arr.slice(0, mid)) //52 341 
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}
function merge(left, right) {
  let result = [] // 3 2 
  let i = 0, j = 0
  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      result.push(left[i++])
    }else {
      result.push(right[j++])
    }
  }

  while(i < left.length) {
    result.push(left[i++])
  }
  while(j < right.length) {
    result.push(right[j++]) // 1
  }
  return result
}
// let res = mergeSort(mergeArr)
// console.log(res)