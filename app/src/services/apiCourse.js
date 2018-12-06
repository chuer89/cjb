import post from './post';

export default {
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
}