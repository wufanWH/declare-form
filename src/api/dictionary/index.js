import request from '@/utils/request'
import api from '@/api/api'

const dictionary = {
  getDict (params) {
    return request({
      url: api.getDict,
      method: 'get',
      params
    })
  },
  getDictByCode (params) {
    return request({
      url: api.getDictByCode,
      method: 'get',
      params
    })
  },
  gitAllDictByCode (params) {
    return request({
      url: api.gitAllDictByCode,
      method: 'get',
      params
    })
  },
  saveDict (data) {
    return request({
      url: api.saveDict,
      method: 'post',
      data
    })
  },
  updateDict (data) {
    return request({
      url: api.updateDict,
      method: 'post',
      data
    })
  },
  deleteDict (params) {
    return request({
      url: api.deleteDict,
      method: 'delete',
      params
    })
  },
  getDictDetail (params) {
    return request({
      url: api.getDictDetail,
      method: 'get',
      params
    })
  }
}

export default dictionary
