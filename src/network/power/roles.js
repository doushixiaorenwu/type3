import { axios } from '../axios'

export function getRolesLsit () {
  return axios({
    url: 'roles'
  })
}

// 添加角色
export function addRoleData (data) {
  return axios({
    url: 'roles',
    method: 'post',
    data
  })
}
// 根据id查询角色
export function getRoleById (id) {
  return axios({
    url: `roles/${id}`
  })
}
// 提交用户修改信息
export function editRolesInfo (datainfo) {
  return axios({
    url: `roles/${datainfo.roleId}`,
    method: 'put',
    data: {
      roleName: datainfo.roleName,
      roleDesc: datainfo.roleDesc
    }
  })
}
// 山删除角色数据
export function delRolesData (id) {
  return axios({
    url: 'roles/' + id,
    method: 'delete'
  })
}
// 删除权限数据
export function removeRightData (role, id) {
  return axios({
    url: `roles/${role.id}/rights/${id}`,
    method: 'delete'
  })
}
// 获得所有权限列表
export function getRightList () {
  return axios({
    url: 'rights/tree'
  })
}
// 角色授权
export function setRights (roleId, strId) {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: {
      rids: strId
    }
  })
}
