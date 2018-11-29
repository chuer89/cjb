// import request from '../utils/request';
import { message } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';

// 测试环境地址
let host = {
	base: '//118.24.7.207',
	// base: 'http://worldfram.com/'
}

// 线上环境地址
let hostName = _.toLower(window.location.hostname);
if (hostName === 'www.canjian.com') {
	host = {
		base: '//admin.canjian.com',
	}
}

let post = (region, api, params = {}) => {
	let userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

	_.extend(params, {
		'token': userInfo.token,
	});

	let url = (host[region] || '') + api;

	// let ajax = request(url, config);
	// let ajax = axios(config);
	let ajax  = axios.post(url, qs.stringify(params));

	ajax.then(({data}) => {
		// 超时登录
		// 102,"无效的token" 103,"token已过期"
		if (data && (data.code === 103 || data.code === 102)) {
			// 去登录
			window.location = '/login';
			// window.location.reload();
		}
	}).catch(function () {
		message.warning('服务器有误，请稍候再试。');
	});

	return ajax;
}

let httpApi = {
	// 上传头像图片 公共接口
	addImg: host['base'] + '/file/addFile',

	// 用户导出
	exportUser: host['base'] + '/user/export',
	// 用户导入
	importUser: host['base'] + '/user/import',

	// 获取多企业
	checkupCompany(param = {}) {
		return post('base', '/sso/checkup', param);
	},
	// 登录
	login(param = {}) {
		return post('base', '/sso/login', param);
	},
	// 发送验证码
	sendCode(param = {}) {
		return post('base', '/sso/sendCode', param);
	},
  // 注册
  register(param = {}) {
    return post('base', '/sso/register', param);
	},
	// 获取菜单
	menus(param = {}) {
		return post('base', '/common/menus', param);
	},
	// 获取直属部门菜单权限
	getEnterpriseOrgMenuByOrgId(param = {}){
		return post('base', '/enterpriseOrgMenu/getEnterpriseOrgMenuByOrgId', param);
	},
	// 添加菜单权限
	addEnterpriseOrgMenu(param = {}) {
		return post('base', '/enterpriseOrgMenu/addEnterpriseOrgMenu', param);
	},
	// 删除菜单权限
	deleteEnterpriseOrgMenuById(param = {}) {
		return post('base', '/enterpriseOrgMenu/deleteEnterpriseOrgMenuById', param);
	},

	// 添加员工
	addUser(param = {}) {
		return post('base', '/user/addUser', param);
	},
	// 批量修改
	updateAll(param = {}) {
		return post('base', '/user/updateAll', param);
	},
	// 员工字段必填
	getUserMaster(param = {}) {
		return post('base', '/enum/userMust', param);
	},
	// 删除员工
	deleteUserById(param = {}) {
		return post('base', '/user/deleteUserById', param);
	},
	// 批量删除
	delUserAll(param = {}) {
		return post('base', '/user/deleteAll', param);
	},
	// 修改员工
	updateUser(param = {}) {
		return post('base', '/user/updateUserById', param);
	},
	// 获取用户详情
	getUserById(param = {}) {
		return post('base', '/user/getUserById', param);
	},
	// 工作经验-添加
	addUserWork(param = {}) {
		return post('base', '/userWork/addUserWork', param);
	},
	// 获取工作经验
	getUserWorkByUid(param = {}) {
		return post('base', '/userWork/getUserWorkByUid', param);
	},
	// 删除工作经验
	deleteUserWorkById(param = {}) {
		return post('base', '/userWork/deleteUserWorkById', param);
	},
	// 获取-员工画像
	getUserPortrayalByUid(param = {}) {
		return post('base', '/userPortrayal/getUserPortrayalByUid', param);
	},
	// 员工画像添加
	addUserPortrayal(param = {}) {
		return post('base', '/userPortrayal/addUserPortrayal', param);
	},
	// 员工列表
	getUserList(param = {}) {
		return post('base', '/user/getUserList', param);
	},
	// 工资记录-获取
	getUserSalaryRecordByUid(param = {}) {
		return post('base', '/userSalaryRecord/getUserSalaryRecordByUid', param);
	},
	// 工作调整 - 添加
	addUserSalaryRecord(param = {}) {
		return post('base', '/userSalaryRecord/addUserSalaryRecord', param);
	},
	// 员工操作记录
	getUserOperationLogList(param = {}) {
		return post('base', '/userOperationLog/getUserOperationLogList', param);
	},

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

	// 年龄分布
	chartAge(param = {}) {
		return post('base', '/statistics/age', param);
	},
	// 学历分布
	chartEducation(param = {}) {
		return post('base', '/statistics/education', param);
	},
	// 性别分布
	chartGender(param = {}) {
		return post('base', '/statistics/gender', param);
	},
	// 招聘渠道
	chartApplyChannel(param = {}) {
		return post('base', '/statistics/applyChannel', param);
	},
	// 离职率
	chartResignation(param = {}) {
		return post('base', '/statistics/resignation', param);
	},
	// 兼职全职分布
	chartJobType(param = {}) {
		return post('base', '/statistics/jobType', param);
	},
	// 满编率
	chartOnJobProportion(param = {}) {
		return post('base', '/statistics/onJobProportion', param);
	},
	// 员工流动
	chartUserTurnover(param = {}) {
		return post('base', '/statistics/userTurnover', param);
	},
	// 离职-原因
	chartDepartureReason(param = {}) {
		return post('base', '/statistics/resignation/reason', param);
	},
	// 离职 - 年龄分析
	chartDepartureAge(param = {}) {
		return post('base', '/statistics/resignation/age', param);
	},
	// 离职 - 学历分析
	chartDepartureEducation(param = {}) {
		return post('base', '/statistics/resignation/education', param);
	},
	// 离职 - 工作年限分析
	chartDepartureWork(param = {}) {
		return post('base', '/statistics/resignation/work', param);
	},
	// 离职 - 按时间纬度分析
	chartDepartureTime(param = {}) {
		return post('base', '/statistics/resignation/time', param);
	},

	// 工作台 - 人员信息
	workUserinfo(param = {}) {
		return post('base', '/workbench/userinfo', param);
	},
	// 工作台 - 员工关怀
	workusercare(param = {}) {
		return post('base', '/workbench/usercare', param);
	},
	// 工作台 - 代办事项（预警）
	todoList(param = {}) {
		return post('base', '/todo/list', param);
	},
	// 工作台 - 提醒信息完整性
	remindIncomplete(param = {}) {
		return post('base', '/remind/user/incomplete', param);
	},

	// 培训 - 上传培训资料
	addTrainLibrary(param = {}) {
		return post('base', '/trainLibrary/addTrainLibrary', param);
	},
	// 培训 - 课程列表
	getTrainLibraryAllClass(param = {}) {
		return post('base', '/trainLibrary/getTrainLibraryAllClass', param);
	},
	// 培训 - 查询课程种类
	getTrainLibraryTagType(param = {}) {
		return post('base', '/trainLibrary/getTrainLibraryTagType', param);
	},
	// 培训 - 当前用户学习的课程
	getNowClass(param = {}) {
		return post('base', '/trainUserLibrary/getNowClass', param);
	},
	// 培训 - 删除课程
	deleteMoreClass(param = {}) {
		return post('base', '/trainLibrary/deleteMoreClass', param);
	},
	// 培训 - 添加课程
	addTrainStorePositionRef(param = {}) {
		return post('base', '/trainStorePositionRef/addTrainStorePositionRef', param);
	},
	// 课程学习状态
	getClassByPosition(param = {}) {
		return post('base', '/trainUserLibrary/getClassByPosition', param);
	},
};

export default httpApi;
