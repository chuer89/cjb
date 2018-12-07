import post from './post';
import host from './host';

// 后台配置接口
export default {
  // 获取所有岗位
	getPosition(param = {}) {
		return post('base', '/position/getAll', param);
	},
	// 添加岗位
	addPosition(param = {}) {
		return post('base', '/position/addPosition', param);
	},
	// 更新岗位
	updatePositionById(param = {}) {
		return post('base', '/position/updatePositionById', param);
	},
	// 删除岗位
	deletePositionById(param = {}) {
		return post('base', '/position/deletePositionById', param);
	},
	// 获取当前用户岗位
	getUserPositionRecordByUid(param = {}) {
		return post('base', '/userPosition/getUserPositionRecordByUid', param);
	},
	// 岗位变化
	updateUserPosition(param = {}) {
		return post('base', '/userPosition/add', param);
	},

	// 员工编制 添加
	addUserStaffing(param = {}) {
		return post('base', '/userStaffing/add', param);
	},
	// 员工编制 更新
	updateUserStaffing(param = {}) {
		return post('base', '/userStaffing/update', param);
	},
	// 员工编制 删除
	deleteUserStaffing(param = {}) {
		return post('base', '/userStaffing/delete', param);
	},
	// 员工编制 获取
	getUserStaffing(param = {}) {
		return post('base', '/userStaffing/get', param);
	},
	// 员工编制导出模版
	exportTemplateStaffing: host['base'] + '/userStaffing/exportTemplate',
	// 员工编制导入
	importStaffing: host['base'] + '/userStaffing/import',
	// 员工导出
	exportStaffing: host['base'] + '/userStaffing/export',

	// 获取门店的二级部门
	getTwoDepartmentBySid(param = {}) {
		return post('base', '/user/getTwoDepartmentBySid', param);
	},

	// 当前用户是否初始化组织架构
	getOrgInit(param = {}) {
		return post('base', '/common/org-init', param);
	},

	// 添加品牌
	addCommonBrand(param = {}) {
		return post('base', '/commonBrand/addCommonBrand', param);
	},
	// 编辑品牌
	editCommonBrand(param = {}) {
		return post('base', '/commonBrand/updateCommonBrandById', param);
	},
	// 删除品牌
	deleteCommonBrandById(param = {}) {
		return post('base', '/commonBrand/deleteCommonBrandById', param);
	},
	// 品牌列表
	getCommonBrandList(param = {}) {
		return post('base', '/commonBrand/getCommonBrandList', param);
	},

	// 添加区域
	addCommonArea(param = {}) {
		return post('base', '/commonArea/addCommonArea', param);
	},
	// 删除区域
	deleteCommonAreaById(param = {}) {
		return post('base', '/commonArea/deleteCommonAreaById', param);
	},
	// 更新区域
	updateCommonAreaById(param = {}) {
		return post('base', '/commonArea/updateCommonAreaById', param);
	},

	// 添加门店
	addCommonStore(param = {}) {
		return post('base', '/commonStore/addCommonStore', param);
	},
	// 更新门店
	updateCommonStoreById(param = {}) {
		return post('base', '/commonStore/updateCommonStoreById', param);
	},
	// 删除门店
	deleteCommonStoreById(param = {}) {
		return post('base', '/commonStore/deleteCommonStoreById', param);
	},

	// 获取当前用户所在企业组织架构
	getOrganizations(param = {}) {
		return post('base', '/common/organizations', param);
	},

	// 获取当前用户所在的部门架构
	getUserOrganizations(param = {}) {
		return post('base', '/common/user-organizations', param);
	},
	// 获取所有部门架构（分页目录）
	getEnterpriseOrgInfoList(param = {}) {
		return post('base', '/enterpriseOrgInfo/getEnterpriseOrgInfoList', param);
	},
	// 添加行政目录
	addEnterpriseOrgInfo(param = {}) {
		return post('base', '/enterpriseOrgInfo/addEnterpriseOrgInfo', param);
	},
	// 删除行政部门
	deleteEnterpriseOrgInfoById(param = {}) {
		return post('base', '/enterpriseOrgInfo/deleteEnterpriseOrgInfoById', param);
	},
	// 编辑行政部门
	editEnterpriseOrgInfoById(param = {}) {
		return post('base', '/enterpriseOrgInfo/updateEnterpriseOrgInfoById', param);
	},
}