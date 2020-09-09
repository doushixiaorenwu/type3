import { axios } from '../axios'

export function goodsList (queryInfo) {
  return axios({
    url: 'goods',
    params: queryInfo
  })
}
// 删除商品
export function deleteData (id) {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}

// 获取添加商品页面参数
export function addGetData () {
  return axios({
    url: 'categories'
  })
}
// 获取动态参数
// export function getCategories(id, type) {
//     return axios({
//         url: `categories/${id}/attributes`,
//         params: {
//             sel: type
//         }
//     })
// }
export function getCategories (id, type) {
  return axios({
    url: `categories/${id}/attributes`,
    params: {
      sel: type
    }
  })
}
// 添加商品
export function addGoodData (data) {
  return axios({
    url: 'goods',
    method: 'post',
    data
  })
}
