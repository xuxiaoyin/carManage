import request from '@/utils/request'

// /message/order/queryOrderListForPC 订单列表查看
export function queryOrderListForPC(data) {
  return request({
    url: 'message/order/queryOrderListForPC',
    method: 'POST',
    data
  })
}

// message/order/deleteOrder 删除订单信息
export function deleteOrder(data) {
  return request({
    url: 'message/order/deleteOrder',
    method: 'POST',
    data
  })
}

// message/order/addOrder 新增订单信息
export function addOrder(data) {
  return request({
    url: 'message/order/addOrder',
    method: 'POST',
    data
  })
}

// message/order/updateOrder 更新订单信息
export function updateOrder(data) {
  return request({
    url: 'message/order/updateOrder',
    method: 'POST',
    data
  })
}

// message/order/queryOrderInfo 查询订单详情
export function queryOrderInfo(data) {
  return request({
    url: 'message/order/queryOrderInfo',
    method: 'POST',
    data
  })
}
