import request from '@/utils/request'
import api from '@/api/api'

const template = {

  // 模板列表查询
  getTemplateList (params) {
    return request({
      url: api.template_list,
      method: 'get',
      params
    })
  },
  // 查询单个模板信息
  getTemplateById (id) {
    return request({
      url: api.template_byId + id,
      method: 'get'
    })
  },
  // 模板关联字段查询
  templateField (params) {
    return request({
      url: api.template_field,
      method: 'get',
      params
    })
  },
  // 模板新增
  templateAdd (data) {
    return request({
      url: api.template_add,
      method: 'post',
      data
    })
  },
  // 模板修改
  templateEdit (data) {
    return request({
      url: api.template_edit,
      method: 'post',
      data
    })
  },
  // 模板删除
  templateDelete (params) {
    return request({
      url: api.template_delete,
      method: 'delete',
      params
    })
  },
  // 模板字段查询
  getTemplateFieldList (id) {
    return request({
      url: api.template_field_list + id,
      method: 'get'
    })
  },
  // 模板字段新增
  templateFieldAdd (data) {
    return request({
      url: api.template_field_add,
      method: 'post',
      data
    })
  },
  // 模板字段修改
  templateFieldEdit (data) {
    return request({
      url: api.template_field_edit,
      method: 'post',
      data
    })
  },
  // 模板字段删除
  templateFieldDelete (params) {
    return request({
      url: api.template_field_delete,
      method: 'delete',
      params
    })
  },
  // 模板字段清空
  templateFieldClear (params) {
    return request({
      url: api.template_field_clear,
      method: 'delete',
      params
    })
  }
}
export default template
