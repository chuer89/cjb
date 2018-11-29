
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
  value: '再入职', code: '7'
}, {
  value: '自主招聘', code: '8'
}, {
  value: '现场招聘', code: '9'
}, {
  value: '校园招聘', code: '10'
}, {
  value: '其他', code: '3'
}];
export const invitationChannelObj = {
  '1': '内推', '2': '网络招聘', '3': '其他', '4': '门店海报招聘', '5': '51job', '6': '58同城',
  '7': '再入职', '8': '自主招聘', '9': '现场招聘', '10': '校园招聘'
}

// 合同类型
export const contractTypeMap = [{
  value: '固定期限', code: '1'
}, {
  value: '非固定期限', code: '2'
}, {
  value: '试用', code: '3'
}, {
  value: '劳务协议', code: '4'
}];
export const contractTypeObj = {
  '1': '固定期限', '2': '非固定期限', '3': '试用', '4': '劳务协议'
}

//职级 1转正 2兼职 3见习期 4小店 5储备期 6其他
export const rankTypeMap = [{
  value: '转正', code: '1'
// }, {
//   value: '兼职', code: '2'
}, {
  value: '实习', code: '3'
}, {
  value: '小店', code: '4'
}, {
  value: '储备期', code: '5'
}, {
  value: '其他', code: '6'
}, {
  value: '学徒', code: '7'
}, {
  value: '一星', code: '8'
}, {
  value: '二星', code: '9'
}, {
  value: '三星', code: '10'
}, {
  value: '组长', code: '11'
}];
export const rankTypeObj = {
  '1': '转正', '2': '兼职', '3': '见习期', '4': '小店', '5': '储备期', '6': '其他',
  '7': '学徒', '8': '一星', '9': '二星', '10': '三星', '11': '组长',
}

// 性别
export const genderObj = {
  '1': '男', '2': '女', '0': '未知',
}

// 在职状态
export const statusMap = [{
  value: '实习', code: '1'
}, {
  value: '全职', code: '2'
}, {
  value: '兼职', code: '5',
}, {
  value: '离职', code: '3'
}, {
  value: '待离职', code: '4'
}];
export const statusMapObj = {
  '1': '实习', '2': '全职', '5': '兼职', '3': '离职', '4': '待离职'
}

// 婚姻情况
export const marryMapObj = {
  '1': '已婚', '0': '未婚', '2': '离异'
}
export const marryMap = [{
  value: '未婚', code: '0'
}, {
  value: '已婚', code: '1'
}, {
  value: '离异', code: '2'
}]

// 离职类型
export const resignationTypeMap = [{
  value: '自离', code: 1,
}, {
  value: '辞退', code: 2
}, {
  value: '辞职', code: 3
}, {
  value: '开除', code: 4
}]
export const resignationTypeObj = {
  '1': '自离', '2': '辞退', '3': '辞职', '4': '开除',
}
