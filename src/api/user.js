import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/message/auth/login',
    method: 'post',
    data
  })
}

// 获取验证码 /message/auth/captcha
export function captcha(data) {
  return request({
    url: '/message/auth/captcha',
    method: 'post',
    data
  })
}

export function queryUserAuthLis(data) {
  return request({
    url: '/message/auth/queryUserAuthLis',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
