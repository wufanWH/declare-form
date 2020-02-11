// const baseUrl = '/manager' // process.env.BASE_URL
const baseUrl = process.env.BASE_URL

var api = {
  // 登录地址专用
  login: `${baseUrl}/login`,
  logout: `${baseUrl}/api/logout`,
  // 后台上传
  uploadFile: `${baseUrl}/managerFiles/api/file4IE/upload`
}

export default api
