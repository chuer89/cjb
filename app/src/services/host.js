// 测试环境地址
let host = {
	base: '//118.24.7.207',
}

// 线上环境地址
let hostName = _.toLower(window.location.hostname);
if (hostName === 'www.canjian.com') {
	host = {
		base: '//admin.canjian.com',
	}
}

export default host;