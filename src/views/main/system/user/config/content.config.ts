export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '80' },
    { prop: 'cellphone', label: '手机号码', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '240',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '240',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '80', slotName: 'handler' }
  ],
  title: '用户列表',
  showNumerical: true,
  showCheck: true
}
