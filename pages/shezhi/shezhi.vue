<template>
	<view class="content">
		<view class="conter animation-slide-bottom" :style="[{animationDelay: '0.1s'}]">
			<u-cell-item title="账户与安全" bg-color="#ffffff"  @click="accounts"></u-cell-item>
		</view>
		<view class="conter conter1 animation-slide-bottom" :style="[{animationDelay: '0.3s'}]">
			<u-cell-item title="新消息通知" bg-color="#ffffff" :border-bottom="false" @click='newMess'></u-cell-item>
		</view>
		<view class="conter animation-slide-bottom" :style="[{animationDelay: '0.5s'}]">
			<u-cell-item title="清除缓存" bg-color="#ffffff" :arrow="false" @click='removeS()' >
				 <u-badge :count="this.fileSizeString" :absolute="false" slot="right-icon"></u-badge>
			</u-cell-item>
		</view>
		<view class="conter animation-slide-bottom" :style="[{animationDelay: '0.7s'}]">
			<u-cell-item title="隐私政策" bg-color="#ffffff" @tap='privacy'></u-cell-item>
		</view>
		<view class="conter ">
			<u-cell-item title="版本信息" bg-color="#ffffff" @tap='projectL'></u-cell-item>
		</view>
		<view class="conter conter1 animation-slide-bottom" :style="[{animationDelay: '0.7s'}]">
			<u-cell-item title="关于金利达" bg-color="#ffffff" @click='jinlida'></u-cell-item>
		</view>
		<u-button class="custom-style animation-slide-bottom" type="primary" :ripple="true" ripple-bg-color="#f0f0f0" :style="[{animationDelay: '0.9s'}]" @tap="loginOut">退出登录</u-button>
	</view>
</template>

<script>
	// import { userLogout } from '@/api/index.js'
	// import http from '@/utils/httpOps.js'
	// const baseUrl = http.baseUrl;
	export default{
		data(){
			return{
				fileSizeString :'',
				clientid:'',
				alias:uni.getStorageSync('userInfo').id,
				bustype:uni.getStorageSync('userInfo').busType,
			}
		},
		created() {
		// #ifdef APP-PLUS
			this.clientid = plus.push.getClientInfo().clientid
			console.log(plus.push.getClientInfo().clientid,"1111111111111111");
			if (!this.clientid) { //如果获取的cid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
				setTimeout(() => {
					this.clientid = plus.push.getClientInfo().clientid
					console.log(plus.push.getClientInfo().clientid,"222222222");
				}, 4000)
			}
		// #endif
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.formatSize()
			// #endif
		},
		methods:{
			//账户与安全
			accounts(){
				uni.navigateTo({
					url:"/pages/shezhi/accounts"
				})
			},
			//关于金利达
			jinlida(){
				uni.navigateTo({
					url:"/pages/shezhi/jinlidaCon"
				})
			},
			projectL(){
				uni.navigateTo({
					url:"/pages/shezhi/jinlida/jinlida"
				})
			},
			//新消息通知
			newMess(){
				uni.navigateTo({
					url:"/pages/shezhi/newMess"
				})
			},
			// 隐私政策
			privacy(){
				uni.navigateTo({
					url:"/pages/shezhi/jinlida/privacys"
				})
			},
			// 退出登录
			loginOut(){
				var _that = this
				uni.showModal({
				    title: '提示',
				    content: '确认退出登录',
				    success: function (res) {
				        if (res.confirm) {
							uni.request({
							    url: baseUrl + 'sys/logout',
								method: 'POST',
								header: { 'X-Access-Token': uni.getStorageSync('token') },
							    success: (res) => {
									uni.showToast({
										title: '退出登录成功',
										icon: 'none',
									})
									setTimeout(function() {
										uni.reLaunch({
											url:"/pages/login/login"
										})
									}, 1000)
									
									// #ifdef APP-PLUS
									uni.request({
									  url: baseUrl + 'jld-cloud-message-biz/message/unBindAlias?alias='+_that.alias+'&clientId='+_that.clientid+'&busType='+_that.bustype,
									  header: {
										  "Content-Type": "application/json; charset=UTF-8"
									  },
									  method:'POST',
									  success: (res) => {
										  	console.log(res,"解绑成功")
									  }
									});
									// #endif
									
									uni.removeStorage({key: 'tripbackUrls'});
									uni.removeStorage({key: 'tripbackUrlsType'});
									uni.removeStorage({key: 'token'});
									uni.removeStorage({key: 'userInfo'});
									uni.removeStorage({key: 'flash'});
									
									clearInterval( getApp().globalData.timeLant );
									// uni.removeStorageSync(ACCESS_TOKEN)
							    },
								fail :(err) => {
								}
							});
				        } else if (res.cancel) {
				        }
				    }
				});
			},
			// 计算缓存大小
			formatSize() {  
				let that = this;  
				plus.cache.calculate(function(size) {  
					let sizeCache = parseInt(size);  
					if (sizeCache == 0) {  
						that.fileSizeString = "0B";  
					} else if (sizeCache < 1024) {  
						that.fileSizeString = sizeCache + "B";  
					} else if (sizeCache < 1048576) {  
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
					} else if (sizeCache < 1073741824) {  
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
					} else {  
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
					}  
				});  
			},
			// 清除缓存
			 clearCache() {  
				let that = this;  
				let os = plus.os.name;  
				if (os == 'Android') {  
					let main = plus.android.runtimeMainActivity();  
					let sdRoot = main.getCacheDir();  
					let files = plus.android.invoke(sdRoot, "listFiles");  
					let len = files.length;  
					for (let i = 0; i < len; i++) {  
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
							if (entry.isDirectory) {  
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.showToast({  
										title: '缓存清理完成',  
										duration: 2000  
									});  
									that.formatSize(); // 重新计算缓存  
								}, function(e) {  
									// console.log(e.message)  
								});  
							} else {  
								entry.remove();  
							}  
						}, function(e) {  
							console.log('文件路径读取失败')  
						});  
					}  
				} else { // ios  
					plus.cache.clear(function() {  
						uni.showToast({  
							title: '缓存清理完成',  
							duration: 2000  
						});  
						that.formatSize();  
					});  
				}  
			},
			removeS(){
				// #ifdef APP-PLUS
				var that = this
				uni.showModal({
				    title: '确认清除缓存',
				    success: function (res) {
				        if (res.confirm) {
							that.clearCache()
				        } else if (res.cancel) {
				        }
				    }
				});
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	.content{
		padding-top: 40upx;
		color: #333333!important;
		font-weight:500;
	}
	.conter{
		padding: 0upx 34upx;
		background-color: #FFFFFF;
		font-size:28upx;
	}
	.conter1{
		// padding: 0;
		margin-bottom: 24upx;
	}
	.custom-style {
		background-color:#FFFFFF!important;
		color: #333333!important;
		letter-spacing: 4upx;
		font-size:28upx;
	}
	/deep/ [data-v-245a4366] [data-v-245a4366] .u-cell__value[data-v-65423b64]{
		display: flex;
		justify-content: flex-end;
	}
	/deep/ .u-cell[data-v-65423b64]{
		padding:20upx 0!important;
		font-size:28upx!important;
		// border-bottom:2upx solid #D6D6D6;
	}
	/deep/ .u-cell__value[data-v-65423b64]{
		text-align: left;
		color: #CCCCCC;
		font-size:28upx!important;
		// padding-left: 80upx;
	}
</style>
