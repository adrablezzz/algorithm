/*
 * @Descripttion: 
 * @version: 
 * @Author: zhang jianjun
 * @Date: 2023-03-27 09:49:19
 * @LastEditors: zhang jianjun
 * @LastEditTime: 2023-03-27 09:49:25
 */
const arr = [
  {
    branchId: 8,
    title: '同泽',
    currencyCode: "RMB",
    deleteFlag: 0,
    id: 1521,
    negativeRate: 1.66,
    positiveRate: 3.15,
    postTimestamp: 1679561345,
    postUserId: 39,
    rateEndTimestamp: 1680278399,
    rateStartTimestamp: 1677600000,
    rateType: 0,
  },
  {
    branchId: 3,
    title: '同泽',
    currencyCode: "RMB",
    deleteFlag: 0,
    id: 1526,
    negativeRate: 1.667,
    positiveRate: 3.15,
    postTimestamp: 1679561345,
    postUserId: 39,
    rateEndTimestamp: 1680278399,
    rateStartTimestamp: 1677600000,
    rateType: 1,
  },
  // {
  //   branchId: 1,
  //   title: '同泽1',
  //   currencyCode: "RMB",
  //   deleteFlag: 0,
  //   id: 1526,
  //   negativeRate: 1.667,
  //   positiveRate: 3.15,
  //   postTimestamp: 1679561345,
  //   postUserId: 39,
  //   rateEndTimestamp: 1680278399,
  //   rateStartTimestamp: 1677600000,
  //   rateType: 1,
  // },
];
// const mergeObjArr = (arr, typeKey, idKey, merRowKey) => {
//   const res = []
//   arr.forEach(el => {
//     let index = res.findIndex(item => {
//       let flag = item[idKey] === el[idKey] && item[typeKey][el[typeKey]] !== el[typeKey] && (merRowKey ? item[merRowKey] === el[merRowKey] : true)
//       if(flag) return true
//     })
//     if(index === -1) {
//       let obj = {}
//       Object.keys(el).forEach(key => {
//         if(key === idKey || key === merRowKey) {
//           obj[key] = el[key]
//         }else {
//           obj[key] = {[el[typeKey]]: el[key]}
//         }
//       })
//       res.push(obj)
//     }else {
//       Object.keys(el).forEach(key => {
//         if(key === idKey) {
//           res[index][key] = el[key]
//         }else {
//           res[index][key][el[typeKey]] = el[key]
//         }
//       })
//     }
//   });
//   res.forEach(el => {
//     Object.keys(el).forEach(key => {
//       if(el[key] instanceof Object) {
//         let values = [...new Set(Object.values(el[key]))]
//         if(values.length === 1) {
//           el[key] = values[0]
//         }
//       }
//     })
//   })
//   return res
// }
const mergeObjArr = (arr, typeKey, idKey, merKey) => {
  const res = []
  arr.forEach(el => {
    let index = res.findIndex(item => {
      let merFlag = merKey ? Object.values(item[merKey]).some(v => v==el[merKey]) : true
      let flag = item[idKey] === el[idKey] && item[typeKey][el[typeKey]] !== el[typeKey] && merFlag
      if(flag) return true
    })
    if(index === -1) {
      let obj = {}
      Object.keys(el).forEach(key => {
        if(key === idKey) {
          obj[key] = el[key]
        }else {
          obj[key] = {[el[typeKey]]: el[key]}
        }
      })
      res.push(obj)
    }else {
      Object.keys(el).forEach(key => {
        if(key === idKey) {
          res[index][key] = el[key]
        }else {
          res[index][key][el[typeKey]] = el[key]
        }
      })
    }
  });
  res.forEach(el => {
    Object.keys(el).forEach(key => {
      if(el[key] instanceof Object) {
        let values = [...new Set(Object.values(el[key]))]
        if(values.length === 1) {
          el[key] = values[0]
        }
      }
    })
  })
  return res
}
let b = mergeObjArr(arr, 'rateType', 'currencyCode', )
console.log(b)
const divideObjArr = (arr, typeKey, idKey) => {
  const res = []
  arr.forEach(el => {
    let strItem = {}, objItem = []
    Object.keys(el).forEach(key => {
      if(el[key] instanceof Object) {
        Object.keys(el[key]).forEach(key2 => {
          let index = objItem.findIndex(i => i[key2])
          if(index === -1) {
            objItem.push({
              [key2]: { 
                [key]: el[key][key2] 
              }
            })
          }else {
            objItem[index][key2][key] = el[key][key2] 
          }
        })
      }else {
        strItem[key] = el[key]
      }
    })
    const elArr = objItem.map(obj => {
      return Object.values(obj).map(item => {
        return {
          ...item,
          ...strItem
        }
      })
    }).flat(Infinity)
    res.push(...elArr)
  })
  return res
}
// console.log(divideObjArr(b))