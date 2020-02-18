/**
  * api接口的统一出口
  */

// 字段管理
import field from '@/api/field'
// 模板管理
import template from '@/api/template'
// 字典管理
import dictionary from '@/api/dictionary'

// 导出接口
export default {
  field,
  template,
  dictionary
}
