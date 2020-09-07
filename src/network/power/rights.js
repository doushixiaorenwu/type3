import { axios } from '../axios'

// 获取权限数据
export function getRightsData () {
  return axios({
    url: 'rights/list'
  })
}
