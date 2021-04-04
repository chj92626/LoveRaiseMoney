<template>
	<view class="content">
	   <view class="home-bg" :style="{'padding-top':statusHeight}">
		   <view class="hone-mag" @tap='account'>
			   <u-avatar :src="headImg" size="large" ></u-avatar>
			   <view class="name ellipsis">你的名字是是么你的名字是是么你的名字是是么</view>
		   </view>
	   </view>
	   <view class="conterCon" :style="{'top':absHeight}">
			<view class="signin conter1">
				<view class="flex" @tap="fundraising">
					<u-icon name="moments" color="#999" size="58"></u-icon>
					<text >发起筹款</text>
				</view>
				<u-line color="#D81E06" direction="col"/>
				<view class=" flex" @tap="phone">
					<u-icon name="chat" color="#999" size="58"></u-icon>
					<text >在线咨询</text>
				</view>
			</view>
			
			<view class="conter conter1">
				<u-cell-item title="个人设置" icon="setting-fill" bg-color="#ffffff" @tap='account'></u-cell-item>
				<u-cell-item title="企业认证" icon="photo" bg-color="#ffffff" :border-bottom="false" @tap='Enterprise'></u-cell-item>
				<u-cell-item title="爱心职位" icon="photo" bg-color="#ffffff" :border-bottom="false" @tap='lovePro'></u-cell-item>
			</view>
			<view class="conter conter1 ">
				<u-cell-item title="捐赠历史" icon="setting-fill" bg-color="#ffffff"  @click='historys'></u-cell-item>
				<u-cell-item title="常见问题" icon="setting-fill" bg-color="#ffffff"  @click='commonProblem'></u-cell-item>
				<u-cell-item title="联系客户" icon="setting-fill" bg-color="#ffffff"  @click='phone'></u-cell-item>
				<!-- <u-cell-item title="筹款管理" icon="setting-fill" bg-color="#ffffff" :border-bottom="false" @click='newMess'></u-cell-item> -->
			</view>
			<!-- #ifdef APP-PLUS -->
				<view class="conter ">
					<u-cell-item title="清除缓存" icon="setting-fill" bg-color="#ffffff" :arrow="false" @click='removeS()' >
						 <u-badge :count="this.fileSizeString" :absolute="false" slot="right-icon" :border-bottom="false"></u-badge>
					</u-cell-item>
				</view>
			<!-- #endif -->
			<!-- <u-button class="custom-style animation-slide-bottom" type="primary" :ripple="true" ripple-bg-color="#f0f0f0" :style="[{animationDelay: '0.9s'}]" @tap="loginOut">退出登录</u-button> -->
		
	   </view>
	</view>
</template>

<script>
	// import api from '@/api/api'
	import utils from '@/common/js/utils.js'
	
	export default {
		name: "people",
		data() {
			return {
				headImg:uni.getStorageSync('userInfo').avatar,
				realname:uni.getStorageSync('userInfo').realname,
				statusHeight:0,
				absHeight:'',
				queryListUserList:[],
				personalList:{
				  avatar:'',
				  realname:'',
				  username:'',
				  post:''
				},
				  userId:'',
				  id:'',
				  allNum:'',
				  
				  fileSizeString :'',
				  clientid:'',
				  alias:uni.getStorageSync('userInfo').id,
				  bustype:uni.getStorageSync('userInfo').busType,
			};
		},
		watch: {
		},
		onShow() {
			this.headImg = uni.getStorageSync('userInfo').avatar
			this.realname = uni.getStorageSync('userInfo').realname
			this.allNum = uni.getStorageSync('allNum')
		},
		onReady() {
			this.statusHeight = utils.getstatusInfo();
			this.absHeight = parseInt(260)+ parseInt(this.statusHeight)
		},
		created() {
			// this.queryListUsers()
			// #ifdef APP-PLUS
			this.formatSize()
			// #endif
		},
		methods: {
			account(){
				uni.navigateTo({
					url:"/pages/shezhi/accounts"
				})
			},
			shehzi(){
				uni.navigateTo({
					url:"/pages/shezhi/shezhi"
				})
			},
			remove(){
				 uni.removeStorageSync('Access-Token')
			},
			Enterprise(){
				uni.navigateTo({
					url:"/pages/myList/EnterpriseCertification"
				})
			},
			lovePro(){
				uni.navigateTo({
					url:"/pages/myList/lovePro"
				})
			},
			commonProblem(){
				uni.navigateTo({
					url:"/pages/myList/commonProblem"
				})
			},
			historys(){
				uni.navigateTo({
					url:"/pages/myList/historyList"
				})
			},
			phone(){
				uni.makePhoneCall({
				    phoneNumber: '114' //仅为示例
				});
			},
			fundraising(){
				uni.switchTab({
					url:"/pages/choukuan/choukuan"
				})
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
					console.log(that.fileSizeString)
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
	.ellipsis{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.flex{
		display:flex;
		align-items:center;
	}
	
.t-icon{
	font-size:46upx;
	margin-right: 14upx;
}
.home-bg{
	background-image: -moz-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(211,85,38) 100%);
	background-image: -webkit-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(255,34,38) 100%);
	background-image: -ms-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(255,34,38) 100%);
	position: relative;
}
.hone-mag{
	margin-left:40upx;
	padding-top:100upx;
	display: flex;
	align-items:center;
	padding-bottom:180upx;
	background-image: -moz-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(255,34,38) 100%);
	background-image: -webkit-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(255,34,38) 100%);
	background-image: -ms-linear-gradient( 90deg, rgb(216,30,6) 13%, rgb(255,34,38) 100%);
	position: relative;
}
.name{
	margin-left:25upx;
	color: #fff;
	font-size: 32upx;
	padding-top:10upx;
	font-weight: 600;
	width:400upx;
}
.grade{
	font-size:20upx;
	background: rgba(255, 255, 255, 0.5);
	border-radius: 10upx;
	padding:5upx 10upx;
}


.conterCon{
	margin:0 auto;
	position: absolute;
	top:260upx;
	left:40upx;
	right:40upx;
	.signin{
		height:160upx;
		border-radius:12upx;
		background:#fff;
		padding:40upx;
		display: flex;
		align-items:center;
		justify-content: space-around;
		font-size: 32upx;
		color:#333333;
		font-weight: 500;
		position:relative;
		view{
			flex-direction: column;
			text{
				margin-top: 10upx;
			}
		}
		image{
			width: 320upx;
			height: 228upx;
			position: absolute;
			top: -96upx;
			right:-20upx;
		}
	}
	.list{
		background-color: #FFFFFF;
		margin-top:30upx;
		border-radius: 10upx;
		font-weight:500;
		font-size:30upx;
		.li{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:24upx 0;
			margin: 0 24upx;
			color:#3B3B3B;
			border-bottom:1upx solid #EEEEEE;
			.c_right{
				color: #999999;
				display: flex;
				align-items: center;
			}
		}
		view:first-child{
			display: flex;
			align-items: center;
		}
	}
}

.tt-icon{
		// width: 42upx;
		color: #FFFFFF;
		background-repeat: no-repeat;
		margin-left: 30upx;
	}
	
	
	
	.conter{
		padding: 0upx 30upx;
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
