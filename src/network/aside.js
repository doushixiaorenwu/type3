import { axios } from './axios'

export function getMenuList () {
  return axios({
    url: 'menus'
  })
}
