
// 学历 1本科 5大专 2高中 3初中 6中专 7小学 4其他
export const educationMap = [{
  value: '本科', code: '1'
}, {
  value: '大专', code: '5'
}, {
  value: '中专', code: '6'
}, {
  value: '高中', code: '2'
}, {
  value: '初中', code: '3'
}, {
  value: '小学', code: '7'
}, {
  value: '其他', code: '4'
}];
export const educationObj = {
  '1': '本科', '5': '大专', '2': '高中', '3': '初中', '6': '中专', '7': '小学', '4': '其他'
}

// 应聘渠道 1内推 2网络招聘 3其他 4门店海报招聘 5.51job 6.58同城
export const invitationChannelMap = [{
  value: '内推', code: '1'
}, {
  value: '网络招聘', code: '2'
}, {
  value: '门店海报招聘', code: '4'
}, {
  value: '51job', code: '5'
}, {
  value: '58同城', code: '6'
}, {
  value: '其他', code: '3'
}];
export const invitationChannelObj = {
  '1': '内推', '2': '网络招聘', '3': '其他', '4': '门店海报招聘', '5': '51job', '6': '58同城'
}

// 合同类型
export const contractTypeMap = [{
  value: '固定期限', code: '1'
}, {
  value: '非固定期限', code: '2'
}, {
  value: '试用', code: '3'
}];
export const contractTypeObj = {
  '1': '固定期限', '2': '非固定期限', '3': '试用'
}

//职级 1转正 2兼职 3见习期 4小店 5储备期 6其他
export const rankTypeMap = [{
  value: '转正', code: '1'
}, {
  value: '兼职', code: '2'
}, {
  value: '见习期', code: '3'
}, {
  value: '小店', code: '4'
}, {
  value: '储备期', code: '5'
}, {
  value: '其他', code: '6'
}];
export const rankTypeObj = {
  '1': '转正', '2': '兼职', '3': '见习期', '4': '小店', '5': '储备期', '6': '其他'
}

// 性别
export const genderObj = {
  '1': '男', '2': '女', '0': '未知',
}
