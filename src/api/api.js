// const baseUrl = '/manager' // process.env.BASE_URL
const baseUrl = process.env.BASE_URL

var api = {
  // 登录地址专用
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/api/logout`,
  // 后台上传
  uploadFile: `${baseUrl}/managerFiles/api/file4IE/upload`,

  // 字段管理
  field_list: `${baseUrl}/api/field/findByAll`,
  field_byId: `${baseUrl}api/field/`,
  field_add: `${baseUrl}/api/field/create`,
  field_edit: `${baseUrl}/api/field/update`,
  field_delete_condition: `${baseUrl}/api/field/findByFieldFk`, // 字段删除校验是否使用
  field_delete: `${baseUrl}/api/field/deletes`,
  all_dict: `${baseUrl}/api/tmpdic/query?parentId=0`,

  // 模板管理
  template_list: `${baseUrl}/api/template/findByAll`,
  template_byId: `${baseUrl}/api/template/`,
  template_add: `${baseUrl}/api/template/create`,
  template_edit: `${baseUrl}/api/template/update`,
  template_delete: `${baseUrl}/api/template/deletes`,
  template_field: `${baseUrl}/api/field/findByFieldType`, // 查询template不同字段类型下的所有字段
  template_field_list: `${baseUrl}/api/template_field/findByTemplateFk/`,
  template_field_add: `${baseUrl}/api/template_field/create`, // 模板字段新增
  template_field_edit: `${baseUrl}/api/template_field/update`, // 模板字段修改
  template_field_delete: `${baseUrl}/api/template_field/deletes`, // 模板字段删除
  template_field_clear: `${baseUrl}/api/template_field/clear`, // 模板字段清空
  // 字典表
  getDict: `${baseUrl}/api/tmpdic/query`,
  getDictByCode: `${baseUrl}/api/tmpdic/queryByCode`,
  gitAllDictByCode: `${baseUrl}/api/tmpdic/queryAllByCode`,
  saveDict: `${baseUrl}/api/tmpdic/save`,
  updateDict: `${baseUrl}/api/tmpdic/update`,
  deleteDict: `${baseUrl}/api/tmpdic/`,
  getDictDetail: `${baseUrl}/api/tmpdic/`
}

export default api
