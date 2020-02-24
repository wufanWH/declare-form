// const baseUrl = '/manager' // process.env.BASE_URL
const baseUrl = process.env.BASE_URL

var api = {
  // 登录地址专用
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/api/logout`,
  // 后台上传
  uploadFile: `${baseUrl}/managerFiles/api/file4IE/upload`,

  // 申报接口
  declare_init: `static/bigData.json`,
  declare_init_value: `static/valueJson.json`,
  // 字段管理
  field_list: `${baseUrl}/api/field/findByAll`,
  field_byId: `${baseUrl}api/field/`,
  field_add: `${baseUrl}/api/field/create`,
  field_edit: `${baseUrl}/api/field/update`,
  field_delete_condition: `${baseUrl}/api/field/findByFieldFk`, // 字段删除校验是否使用
  field_delete: `${baseUrl}/api/field/deletes`,
  all_dict: `${baseUrl}/api/tmpdic/query?parentId=0`
}

export default api
