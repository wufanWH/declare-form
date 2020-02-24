import request from '@/utils/request'
import api from '@/api/api'

const declare = {

  // 申报初始化模板
  declareInit (params) {
    return request({
      url: api.declare_init,
      method: 'get',
      params
    })
  },
  // 申报初始化value
  declareInitValue (params) {
    return request({
      url: api.declare_init_value,
      method: 'get',
      params
    })
  },
  // 字段列表查询
  getFieldList (params) {
    return request({
      url: api.field_list,
      method: 'get',
      params
    })
  },
  // 查询单个字段信息
  getFieldById (id) {
    return request({
      url: api.field_byId + id,
      method: 'get'
    })
  },
  // 字段新增
  fieldAdd (data) {
    return request({
      url: api.field_add,
      method: 'post',
      data
    })
  },
  // 字段修改
  fieldEdit (data) {
    return request({
      url: api.field_edit,
      method: 'post',
      data
    })
  },
  // 字段删除时校验是否使用
  fieldDeleteCondition (params) {
    return request({
      url: api.field_delete_condition,
      method: 'get',
      params
    })
  },
  // 字段删除
  fieldDelete (params) {
    return request({
      url: api.field_delete,
      method: 'delete',
      params
    })
  },
  // 获取所有字典
  getAllDict () {
    return request({
      url: api.all_dict,
      method: 'get'
    })
  }
}
export default declare
