import { request} from 'utils'
import {api} from 'config';
const { farmInfo:{
  farmList,
  off,
  putaway
}} = api
const fetch = {
	// 农场列表
	getfarmList (data = {}) {
		return request({
	    url: farmList,
	    method: 'form',
	    data,
	  })
	},
 // 下架农场
	off ( data ={ }) {
		return request({
			url: off,
			method: 'form',
			data,
		})
	},
  // 上架农场
  putaway ( data ={ }) {
		return request({
			url: putaway,
			method: 'form',
			data,
		})
	},
}

export default fetch
