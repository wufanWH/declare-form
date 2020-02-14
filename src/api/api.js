// const baseUrl = '/manager' // process.env.BASE_URL
const baseUrl = process.env.BASE_URL

var api = {
  // 登录地址专用
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/api/logout`,
  // 后台上传
  uploadFile: `${baseUrl}/managerFiles/api/file4IE/upload`,
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
