// import request from '../utils/request';
import _ from 'lodash';
import host from './host';
import post from './post';

import apiPersonnel from './apiPersonnel';
import apiDeploy from './apiDeploy';
import apiCourse from './apiCourse';

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

	...apiPersonnel,
	...apiDeploy,
	...apiCourse,
};

export default httpApi;
