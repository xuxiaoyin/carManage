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

// /message/role/addRole POST 新增角色
export function addRole(data) {
  return request({
    url: '/message/role/addRole',
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

// 查询车队列表 /message/fleet/queryList
export function queryFleetList(data) {
  return request({
    url: '/message/fleet/queryList',
    method: 'POST',
    data
  })
}
