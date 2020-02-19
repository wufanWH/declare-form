import request from '@/utils/request'
import api from '@/api/api'

const businessform = {

  // 业务列表查询
  getBusinessList (params) {
    return request({
      url: api.business_list,
      method: 'get',
      params
    })
  },
  // 查询单个业务信息
  getBusinessById (id) {
    return request({
      url: api.business_byId + id,
      method: 'get'
    })
  },
  // 业务新增
  businessAdd (data) {
    return request({
      url: api.business_add,
      method: 'post',
      data
    })
  },
  // 业务修改
  businessEdit (data) {
    return request({
      url: api.business_edit,
      method: 'post',
      data
    })
  },
  // 业务删除
  businessDelete (params) {
    return request({
      url: api.business_delete,
      method: 'delete',
      params
    })
  },
  // 表单列表查询
  getBusinessFormList (params) {
    return request({
      url: api.business_form_list,
      method: 'get',
      params
    })
  },
  // 查询单个业务表单信息
  getBusinessFormById (id) {
    return request({
      url: api.business_form_byId + id,
      method: 'get'
    })
  },
  // 业务表单新增
  businessFormAdd (data) {
    return request({
      url: api.business_form_add,
      method: 'post',
      data
    })
  },
  // 业务表单修改
  businessFormEdit (data) {
    return request({
      url: api.business_form_edit,
      method: 'post',
      data
    })
  },
  // 业务表单删除
  businessFormDelete (params) {
    return request({
      url: api.business_form_delete,
      method: 'delete',
      params
    })
  },
  // 业务表单生成json
  createBusinessFormJson (id) {
    return request({
      url: api.business_form_createjson + id,
      method: 'get'
    })
  }
}
export default businessform
