type IFoeType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field?: string
  type: IFoeType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  fromItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
  itemStyle?: any
  title?: any
}
