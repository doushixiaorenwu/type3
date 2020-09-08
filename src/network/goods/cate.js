import { axios } from '../axios'
// 商品分类数据
export function getCategories (queInfo) {
  return axios({
    url: 'categories',
    params: queInfo
  })
}

// 获取父级分类的数据列表
export function getParentCateData () {
  return axios({
    url: 'categories',
    params: {
      type: 2
    }
  })
}

// 添加新的分类
export function addCateData (data) {
  return axios({
    url: 'categories',
    method: 'post',
    data
  })
}

// 根据id查询分类信息
export function geteditCateData (id) {
  return axios({
    url: `categories/${id}`
  })
}

// 修改分类信息
export function editCateData (data) {
  return axios({
    url: `categories/${data.cat_id}`,
    method: 'put',
    data: {
      cat_name: data.cat_name
    }
  })
}

// 删除分类信息
export function delCateData (id) {
  return axios({
    url: `categories/${id}`,
    method: 'delete'
  })
}
