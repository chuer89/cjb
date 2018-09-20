// import request from '../utils/request';
import { message } from 'antd';
import axios from 'axios';
import _ from 'lodash';

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
	let config = {
		url,
		params,
		method: 'post',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8'
		}
	}

	// let ajax = request(url, config);
	let ajax = axios(config);

	ajax.then(({data}) => {
		let disableAjax = localStorage.getItem('disableAjax');
		if (data && data.status === 'ERROR') {
			if (data.errorCode === '10010019' || data.errorCode === '10000019') {
				
				// 退出登录
				// common.clickQuit();

				if (disableAjax === 'true') {
				
				} else {
					// message.info(data.errorMsg);
					localStorage.setItem('disableAjax', 'true');
				}
			} else {
				localStorage.setItem('disableAjax', 'false');
			}
		}
	}).catch(function () {
		message.warning('服务器有误，请稍候再试。');
	});

	return ajax;
}

let httpApi = {
	// 上传头像图片 公共接口
	addImg: host['tarde'] + '/common/user/upload-head-img',
	// 图片上传（签证资料、认证、审核资料） 公共接口
	userUploadExt: host['tarde'] + '/common/user/upload-ext',

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
};

export default httpApi;
