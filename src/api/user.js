import request from '@/utils/request'
import api from '@/api/api'

export function login (data) {
  return request({
    url: api.login,
    method: 'post',
    headers: {
      'resourceCode': 'system.manager.login'
    },
    data: 'username=' +
      data.username +
      '&password=' +
      data.password +
      '&time=' +
      (new Date()).valueOf()
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: api.logout,
    method: 'post'
  })
}
