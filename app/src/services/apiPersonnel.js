import post from './post';
import host from './host';

export default {
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
	// 工作台 - 员工关怀 导出
	usercareExport: host['base'] + '/workbench/usercare/export',
	// 工作台 - 代办事项（预警）
	todoList(param = {}) {
		return post('base', '/todo/list', param);
	},
	// 工作台 - 代办事项 导出
	todoExport: host['base'] + '/todo/export',
	// 工作台 - 提醒信息完整性
	remindIncomplete(param = {}) {
		return post('base', '/remind/user/incomplete', param);
	},

	// 调动-门店或部门
	getDeptChangeList(param = {}) {
		return post('base', '/userChange/dept', param);
	},
	// 调动 - 岗位
	getPositionChangeList(param = {}) {
		return post('base', '/userChange/position', param);
	},
	// 调动 - 职级
	getUserTypeChangeList(param = {}) {
		return post('base', '/userChange/type', param);
	},
}