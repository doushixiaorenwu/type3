import { axios } from '../axios'

// 商品分类数据
export function getCategories (queInfo) {
  return axios({
    url: 'categories',
    params: queInfo
  })
}

// 获取动态/静态参数
export function getCateData (id, type) {
  return axios({
    url: `categories/${id}/attributes`,
    params: {
      sel: type
    }
  })
}

// 添加动态/静态参数
export function addParamData (data) {
  return axios({
    url: `categories/${data.id}/attributes`,
    method: 'post',
    data: {
      attr_name: data.attr_name,
      attr_sel: data.attr_sel
    }
  })
}

// 根据id查询动态/静态参数
export function getParamById (cateId, attrId, attrSel) {
  return axios({
    url: `categories/${cateId}/attributes/${attrId}`,
    params: {
      attrSel
    }
  })
}

// 编辑动态/静态参数
export function editParamData (data) {
  return axios({
    url: `categories/${data.cat_id}/attributes/${data.attr_id}`,
    method: 'put',
    data: {
      attr_name: data.attr_name,
      attr_sel: data.attr_sel,
      attr_vals: data.attr_vals
    }
  })
}

// 删除动态/静态参数
export function delParamData (catId, attrId) {
  return axios({
    url: `categories/${catId}/attributes/${attrId}`,
    method: 'delete'
  })
}
