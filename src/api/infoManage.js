import request from '@/utils/request'

// /message/client/queryClientList 客户管理
export function queryClientList(data) {
  return request({
    url: '/message/client/queryClientList',
    method: 'POST',
    data
  })
}

// 增加客户信息  /message/client/addClientInfo
export function addClientInfo(data) {
  return request({
    url: '/message/client/addClientInfo',
    method: 'POST',
    data
  })
}

// 查询客户详情 /message/client/queryClientInfo
export function queryClientInfo(data) {
  return request({
    url: '/message/client/queryClientInfo',
    method: 'POST',
    data
  })
}

// 编辑客户信息 /message/client/updateClientInfo
export function updateClientInfo(data) {
  return request({
    url: '/message/client/updateClientInfo',
    method: 'POST',
    data
  })
}

// 删除客户 /message/client/deleteClientInfo
export function deleteClientInfo(data) {
  return request({
    url: '/message/client/deleteClientInfo',
    method: 'POST',
    data
  })
}

// 查询用户列表
export function queryUserList(data) {
  return request({
    url: '/message/user/queryUserList',
    method: 'POST',
    data
  })
}

// 新增用户 /message/user/addUserInfo
export function addUserInfo(data) {
  return request({
    url: '/message/user/addUserInfo',
    method: 'POST',
    data
  })
}

// 编辑用户 /message/user/updateUserInfo
export function updateUserInfo(data) {
  return request({
    url: '/message/user/updateUserInfo',
    method: 'POST',
    data
  })
}

// 查询用户详细信息 /message/user/queryUserInfo
export function queryUserInfo(data) {
  return request({
    url: '/message/user/queryUserInfo',
    method: 'POST',
    data
  })
}

// 删除用户 /message/user/deleteUserInfo
export function deleteUserInfo(data) {
  return request({
    url: '/message/user/deleteUserInfo',
    method: 'POST',
    data
  })
}

// 查询车辆列表 /message/car/queryCarList
export function queryCarList(data) {
  return request({
    url: '/message/car/queryCarList',
    method: 'POST',
    data
  })
}

// 新增车辆信息 message/car/addCarInfo
export function addCarInfo(data) {
  return request({
    url: '/message/car/addCarInfo',
    method: 'POST',
    data
  })
}

// 车辆详情查看 message/car/queryCarInfo
export function queryCarInfo(data) {
  return request({
    url: '/message/car/queryCarInfo',
    method: 'POST',
    data
  })
}

// 车辆信息编辑 message/car/updateCarInfo
export function updateCarInfo(data) {
  return request({
    url: '/message/car/updateCarInfo',
    method: 'POST',
    data
  })
}

// 删除车辆信息 message/car/deleteCarInfo
export function deleteCarInfo(data) {
  return request({
    url: '/message/car/deleteCarInfo',
    method: 'POST',
    data
  })
}

// 查询长租车列表 message/car/queryLongRentList
export function queryLongRentList(data) {
  return request({
    url: '/message/car/queryLongRentList',
    method: 'POST',
    data
  })
}

// 新增长租车 message/car/addLongRent
export function addLongRent(data) {
  return request({
    url: '/message/car/addLongRent',
    method: 'POST',
    data
  })
}

// 查询长租车详情 message/car/queryLongRent
export function queryLongRent(data) {
  return request({
    url: '/message/car/queryLongRent',
    method: 'POST',
    data
  })
}

// 更新长租车 updateLongRent
export function updateLongRent(data) {
  return request({
    url: '/message/car/updateLongRent',
    method: 'POST',
    data
  })
}

// 删除长租车 delLongRent
export function delLongRent(data) {
  return request({
    url: '/message/car/delLongRent',
    method: 'POST',
    data
  })
}

// 查询外租车辆列表 message/car/queryOutRentList
export function queryOutRentList(data) {
  return request({
    url: '/message/car/queryOutRentList',
    method: 'POST',
    data
  })
}

// 新增外租车 message/car/addOutRent
export function addOutRent(data) {
  return request({
    url: '/message/car/addOutRent',
    method: 'POST',
    data
  })
}

// 编辑外租车辆 message/car/updateOutRent
export function updateOutRent(data) {
  return request({
    url: '/message/car/updateOutRent',
    method: 'POST',
    data
  })
}

// 查询外租车详情 message/car/queryOutRent
export function queryOutRent(data) {
  return request({
    url: '/message/car/queryOutRent',
    method: 'POST',
    data
  })
}

// 删除外租车 message/car/delOutRent
export function delOutRent(data) {
  return request({
    url: '/message/car/delOutRent',
    method: 'POST',
    data
  })
}

// 查询车队列表 /message/fleet/queryList
export function queryFleetList(data) {
  return request({
    url: '/message/fleet/queryList',
    method: 'POST',
    data
  })
}

// 添加车队 message/fleet/add
export function addFleetList(data) {
  return request({
    url: '/message/fleet/add',
    method: 'POST',
    data
  })
}

// 查询车队详情 message/fleet/queryDetail
export function fleetQueryDetail(data) {
  return request({
    url: '/message/fleet/queryDetail',
    method: 'POST',
    data
  })
}

// 更新车队  message/fleet/update
export function fleetUpdate(data) {
  return request({
    url: '/message/fleet/update',
    method: 'POST',
    data
  })
}

// 删除车队 message/fleet/delete
export function fleetDelete(data) {
  return request({
    url: '/message/fleet/delete',
    method: 'POST',
    data
  })
}

// 查询角色列表 /message/auth/queryRoleList
export function queryRoleList(data) {
  return request({
    url: '/message/auth/queryRoleList',
    method: 'POST',
    data
  })
}

// 查询角色信息详情 /message/auth/queryRoleInfo
export function queryRoleInfo(data) {
  return request({
    url: '/message/auth/queryRoleInfo',
    method: 'POST',
    data
  })
}

// 新增角色信息 /message/auth/addRoleInfo
export function addRoleInfo(data) {
  return request({
    url: '/message/auth/addRoleInfo',
    method: 'POST',
    data
  })
}

// 查询菜单列表 /message/auth/queryMenuTree
export function queryMenuTree(data) {
  return request({
    url: '/message/auth/queryMenuTree',
    method: 'POST',
    data
  })
}

// 修改角色信息 /message/auth/updateRoleInfo
export function updateRoleInfo(data) {
  return request({
    url: '/message/auth/updateRoleInfo',
    method: 'POST',
    data
  })
}

// 删除角色信息 /message/auth/deleteRoleInfo
export function deleteRoleInfo(data) {
  return request({
    url: '/message/auth/deleteRoleInfo',
    method: 'POST',
    data
  })
}

// 查询客户权限 /message/auth/queryUserAuthList
export function queryUserAuthList(data) {
  return request({
    url: '/message/auth/queryUserAuthList',
    method: 'POST',
    data
  })
}