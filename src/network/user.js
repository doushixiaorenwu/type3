import { axios } from './axios'

// 获取用户列表
export function getUserList (queryInfo) {
  return axios({
    url: 'users',
    params: queryInfo
  })
}

// 修改用户状态
export function userPut (userinfo) {
  return axios({
    url: `users/${userinfo.id}/state/${userinfo.mg_state}`,
    method: 'put'
  })
}

// 添加用户信息
export function addUserData (data) {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
// 根据ID查询信息
export function getUserData (id) {
  return axios({
    url: `users/${id}`
  })
}

// 编辑用户提交
export function editUserDataForm (editForm) {
  return axios({
    url: `users/${editForm.id}`,
    method: 'put',
    data: {
      email: editForm.email,
      mobile: editForm.mobile
    }
  })
}
// 删除用户
export function deleteUserData (id) {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 获取角色列表
export function getRoleList () {
  return axios({
    url: 'roles'
  })
}

// 更新角色信息
export function allotRole (id, rid) {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid: rid
    }
  })
}
