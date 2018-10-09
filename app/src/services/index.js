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
		if (data && data.code === 103) {
			// 去登录
			window.location.hash = '#/login';
		}
	}).catch(function () {
		message.warning('服务器有误，请稍候再试。');
	});

	return ajax;
}

let httpApi = {
	// 上传头像图片 公共接口
	addImg: host['base'] + '/file/addFile',

	// 获取多企业
	checkupCompany(param = {}) {
		return post('base', '/sso/checkup', param);
	},
	// 登录
	login(param = {}) {
		return post('base', '/sso/login', param);
  },
  // 注册
  register(param = {}) {
    return post('base', '/sso/register', param);
	},
	// 获取菜单
	menus(param = {}) {
		return post('base', '/common/menus', param);
	},

	// 添加员工
	addUser(param = {}) {
		return post('base', '/user/addUser', param);
	},
	// 删除员工
	deleteUserById(param = {}) {
		return post('base', '/user/deleteUserById', param);
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

	// 获取所有岗位
	getPosition(param = {}) {
		return post('base', '/position/getAll', param);
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
		return post('base', 'enterpriseOrgInfo/deleteEnterpriseOrgInfoById', param);
	},
	// 编辑行政部门
	editEnterpriseOrgInfoById(param = {}) {
		return post('base', 'enterpriseOrgInfo/editEnterpriseOrgInfoById', param);
	},
};

export default httpApi;
