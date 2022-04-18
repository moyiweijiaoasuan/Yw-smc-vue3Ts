// 编写的表单验证规则
export const rules2 = {
  phone: [
    {
      required: true,
      message: '请填写手机号',
      trigger: 'blur'
    },
    {
      pattern:
        /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      message: '手机号必须是11位数字~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: '验证码必须是6位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
