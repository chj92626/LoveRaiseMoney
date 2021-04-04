const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://118.178.180.139:9009',
		// baseUrl: 'http://192.168.1.106:9009',
		// baseUrl: 'http://192.168.2.238:9009',
		loadingText: '努力加载中~',
		loadingTime: 800,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		}
	});
	// 请求拦截部分，如配置，每次请求前都会执行，见上方说明
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync('wx_yh_token');
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if(config.url != '/login'){
			config.header.CusAuthorization = token;
		};
		console.log(config.header)
		return config;
	}
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		console.log(res)
		if(res.statusCode == 8201) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			console.log(res.data);
			return res;
		} else if(res.statusCode == 1401) {
			// 假设201为token失效，这里跳转登录
			// vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				// vm.$u.route()
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}, 1500)
			return false;
		} else {
			uni.showToast({
				icon:"none",
				title:res.message,
			})
			return false;
		}
	}
}
export default {
	install
}
