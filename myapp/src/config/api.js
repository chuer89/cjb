import HOST from './host.js'
const commonPath = '../assets'

const {SSO, ADMIN, ROLE, IM, UC,FARM} = HOST

const API = {
  defaultImg: `${commonPath}/defaultImg.png`,

  // 公共接口
  base: {
    getAllAreaList: `${ADMIN}/config/common/get-aus-all`, // 国家地区
    getNation: `${ADMIN}/config/common/get-nation-list`, // 获取国家
    getCity: `${ADMIN}/config/common/get-city-list`, // 获取城市
    upLoadImg: `${ADMIN}/common/farm/upload-ext` // 上传图片
  },

  // 用户操作
  user: {
    // 登陆
    login: `${SSO}/web/sso/service-emp-login`,
    // 退出登陆
    logout: `${SSO}/web/sso/logout`,
    // 查询用户角色权限
    permissions: `${UC}/admin/role/list-by-user`,
    // 获取im config
    imExtends: `${IM}/admin/im-auth/get/im-account/service`,
  },
  // 账号操作
  account: {
    // 内部账号 账户类型
    ids: `${ROLE}/admin/role/get-ids`,
    // 内部账号列表
    internalAccountList: `${ROLE}/admin/emp/list`,
    //重置密码
    resetPwd: `${ROLE}/admin/emp/reset-pwd`,
    // 冻结内部账号
    frozenIn: `${ROLE}/admin/emp/frozen`,
    // 解冻
    unfrozenIn: `${ROLE}/admin/emp/unfrozen`,
    // 账号角色
    accountList: `${ROLE}/admin/role/get-ids`,

    // 用户列表
    userlist: `${ROLE}/admin/user/list`,
    // 解冻
    unfrozenUser: `${ROLE}/admin/user/unfrozen`,
    // 冻结
    frozenUser: `${ROLE}/admin/user/frozen`,
    userDetail: `${ROLE}/admin/user/detail`, // 用户详情

    // 创建账号角色选择
    rolesSelectData: `${ROLE}/admin/role/list`,
    // 创建账号
    createAccount: `${ROLE}/admin/emp/add`,

    getUserDetailByMobile: `${ROLE}/admin/user/detail-by-mobile`, // 根据手机号获取详情
  },
  //农场信息
  farmInfo: {
    // 添加农场
    addFarm:`${ADMIN}/admin/farm-manage/add`,
    // 获取农场主
    getFarm: `${UC}/admin/user/detail-by-mobile-or-userid`,
    // 获取农场列表
    farmList: `${ADMIN}/admin/farm-manage/list`,
    // 下架农场
    off: `${ADMIN}/admin/farm-manage/off`,
    // 上架农场
    putaway:`${ADMIN}/admin/farm-manage/open`,
    //审核农场
    audit:`${ADMIN}/admin/farm-manage/audit`,
    // 卖家中介发布农场详情
    farmDetail:`${ADMIN}/admin/farm-manage/detail`,
    // 买家自行添加农场详情
    ownerDetail:`${ADMIN}/admin/farm-manage/owner-detail`,
    // 农场信息确认修改
    confirmUpdate:`${ADMIN}/admin/farm-manage/confirm-update`,
    // 资质列表
    farmInformation:`${ADMIN}/admin/farm-information/list`,
    // 资质详情
    farmInformationDetail:`${ADMIN}/admin/farm-information/detail`,
    // 农场名录
    farmDirectories: `${FARM}/admin/gather/farm/list`,
    detail: `${FARM}/admin/gather/farm/detail`
  },
  // 已发布弄农场
  publishFarm: {
    translate: `${ADMIN}/admin/farm/translate-detail`, // 已发布农场翻译详情
    save: `${ADMIN}/admin/farm/translate-save`, // 翻译农场保存
    farmDetail: `${ADMIN}/admin/farm/detail`, // 农场信息详情
  },
  admin: {
    auditSeller: `${ADMIN}/admin/cs/seller-agency/list`,
    auditSellerDetail: `${ADMIN}/admin/cs/seller-agency/detail`,
    auditSellerImgs: `${ADMIN}/admin/cs/seller-agency/detail-resource-list`,
    doAudit: `${ADMIN}/admin/cs/seller-agency/audit`,
  },

  // 订单管理
  orders: {
    dealList: `${ADMIN}/admin/order/list`, // 交易订单列表
    addDeal: `${ADMIN}/admin/order/add`, // 新增交易订单
    closeDeal: `${ADMIN}/admin/order/close`, // 关闭交易订单
    completeDeal: `${ADMIN}/admin/order/complete`, // 订单完成
    detailDeal: `${ADMIN}/admin/order/detail`, // 交易订单详情
  },

  // 商机管理
  business: {
    intentList: `${ADMIN}/admin/intent-order/list`, // 意向单列表
    intentComplete: `${ADMIN}/admin/intent-order/complete`, // 完成意向单
    intentClose: `${ADMIN}/admin/intent-order/close`, // 关闭意向单
    intentAdd: `${ADMIN}/admin/intent-order/add`, // 新建意向单
  },

  // 聊天相关
  contact: {
    userSubDetail: `${ADMIN}/admin/im-chat/sub-detail`, // 用户---订阅
    userPublishFarm: `${ADMIN}/admin/farm/im-list`, // 用户---发布农场
    userViewsDetail: `${ADMIN}/admin/user/detail`, // 用户---基本信息
    farmDetail: `${ADMIN}/admin/im-chat/farm-detail`, // 获取当前聊天的农场详情
    remarkUserList: `${ADMIN}/admin/customer-service-remark/user-list`, // 用户备注列表
    remarkUserUpdate: `${ADMIN}/admin/customer-service-remark/update-user`, // 修改用户备注
    remarkUserAdd: `${ADMIN}/admin/customer-service-remark/add-user`, // 新增用户备注
    remarkFarmList: `${ADMIN}/admin/customer-service-remark/farm-list`, // 农场备注列表
    remarkFarmUpdate: `${ADMIN}/admin/customer-service-remark/update-farm`, // 修改备注
    remarkFarmAdd: `${ADMIN}/admin/customer-service-remark/add-farm`, // 新增备注
  }
}

export default API
