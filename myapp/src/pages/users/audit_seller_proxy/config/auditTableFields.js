import { AUDIT_STATUS } from './enums'
export const auditTableFields = [
  {
    title: '用户 ID',
    key: "userId",
  },
  {
    title: '手机号',
    key: 'mobile',
  },
  {
    title: '姓名',
    key: 'realName',
  },
  {
    title: '提交时间',
    type: 'datetime',
    key: 'createTime',
  },
  {
    title: '状态',
    enums: AUDIT_STATUS,
    key: 'status',
  },
]