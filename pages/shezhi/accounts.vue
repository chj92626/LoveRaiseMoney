<template>
	<view class="content">
		<view class="conter ">
			<u-cell-item title="头像" bg-color="#ffffff" :arrow="false" @tap='getImg' >
				<!-- <image class="u-avatar-demo" :src="avatar" style="width:60upx;height:60upx;border-radius: 50%;" mode="aspectFill"></image> -->
				<u-avatar :src="avatar" size="mini" ></u-avatar>
			</u-cell-item>
		</view>
		<view class="conter">
			<!-- <u-cell-item title="用户账户" bg-color="#ffffff"  @tap="userInfo(1)">{{username}}</u-cell-item> -->
			<u-cell-item title="用户账户" bg-color="#ffffff" :arrow="false">{{username}}</u-cell-item>
		</view>
		<view class="conter">
			<u-cell-item title="用户姓名" bg-color="#ffffff" @tap="userInfo(2)">{{realname}}</u-cell-item>
		</view>
		<view class="conter ">
			<u-cell-item title="登录密码" bg-color="#ffffff" @tap='newPwd'></u-cell-item>
		</view>
		<view class="conter conter1">
			<u-cell-item title="工号" bg-color="#ffffff" @tap="userInfo(3)">{{workNo}}</u-cell-item>
		</view>
		<!-- <view class="conter ">
			<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate">
				<u-cell-item title="生日" bg-color="#ffffff">
					{{birthday}}
				</u-cell-item>
			</gpp-date-picker>
		</view> -->
		<view class="conter ">
			<u-cell-item title="性别" bg-color="#ffffff" @tap='sexL'>{{sex == 1?'男':'女'}}</u-cell-item>
			<u-select v-model="sexShow" :list="sexList" @confirm="confirmSex"></u-select>
		</view>
		<view class="conter ">
			<u-cell-item title="邮箱" bg-color="#ffffff" @tap="userInfo(4)">{{email}}</u-cell-item>
		</view>
		<view class="conter ">
			<u-cell-item title="手机号码" bg-color="#ffffff" @tap="userInfo(5)">{{phone}}</u-cell-item>
		</view>
		<view class="conter ">
			<u-cell-item title="座机" bg-color="#ffffff" @tap="userInfo(6)">{{telephone}}</u-cell-item>
		</view>
		
		<u-button
			class="custom-style" 
			type="primary" :ripple="true"
			ripple-bg-color="#f0f0f0"
			@tap="loginOut">退出登录</u-button>
		<!-- 弹出层 -->
		<view class="">
			<u-popup v-model="shows" closeable mode="center" width="70%" height="360upx" border-radius="24">
				<view style="border-bottom:1upx solid #999999;height:80upx;line-height: 80upx;padding-left:24upx;">修改{{titleP}}</view>
				<view class="" style="margin:24upx;">
					<u-input v-model="value" type="text" :auto-height="true" :border="true" :focus="true" />
					<u-button class="custom-style" type="square" :ripple="true" ripple-bg-color="#067BF6" @tap="confirmAll">确认</u-button>
				</view>
			</u-popup>
		</view>
		<!-- 弹出层 -->
		<view class="">
			<u-popup v-model="shows1" closeable mode="center" width="70%" height="460upx" border-radius="24">
				<view style="border-bottom:1upx solid #999999;height:80upx;line-height: 80upx;padding-left:24upx;">修改{{titleP}}</view>
				<view class="" style="margin:24upx;">
					<u-input v-model="value" type="text" :auto-height="true" :border="true" :focus="true" placeholder="请输入账号"/>
					<u-input v-model="valuePwd" type="password" :auto-height="true" :border="true" placeholder="请输入密码" />
					<u-button class="custom-style" type="square" :ripple="true" ripple-bg-color="#067BF6" @tap="confirmAll">确认</u-button>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	// import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	// import {editAll} from '@/api/index.js'
	export default{
		// components:{
		// 	gppDatePicker
		// },
		data(){
			return{
				realname:uni.getStorageSync('userInfo').realname,
				avatar:uni.getStorageSync('userInfo').avatar,
				phone:uni.getStorageSync('userInfo').phone,
				email:uni.getStorageSync('userInfo').email,
				sex:uni.getStorageSync('userInfo').sex,
				birthday:uni.getStorageSync('userInfo').birthday,
				workNo:uni.getStorageSync('userInfo').workNo,
				username:uni.getStorageSync('userInfo').username,
				telephone:uni.getStorageSync('userInfo').telephone,
				startDate: "1900-08-30",
				endDate: "2022-09-20",
				pickerDate: '2020-11-25',
				sexShow:false,
				shows:false,
				shows1:false,
				value:'',
				valuePwd:'',
				titleP:'',
				userInfoStatus:'',
				sexList: [
					{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			// #endif
			this.Time()
		},
		created() {
			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.avatar = path;
				console.log(path,'99999999999999');
				// 可以在此上传到服务端
				uni.uploadFile({
					url: 'http://www.example.com/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res);
					}
				});
			})
		},
		methods:{
			confirmAll(){
				this.editAlls()
			},
			//修改用户信息的接口
			editAlls(){
				uni.showLoading({ title: '加载中',mask: true });
				if(this.userInfoStatus == 7){//生日
					var str = { "birthday":this.birthday,"id":uni.getStorageSync('userInfo').id }
				}else if(this.userInfoStatus == 8){//性别 
					var str = { "sex":this.sex,"id":uni.getStorageSync('userInfo').id }
				}else{
					if(this.value == ''){
						uni.showToast({ title:'不能为空',icon:"none" })
					}else{
						if(this.userInfoStatus == 1){//修改用户账户
							var str = { "username":this.value,"id":uni.getStorageSync('userInfo').id,password:this.valuePwd }
						}
						if(this.userInfoStatus == 2){//修改姓名
							var str = { "realname":this.value,"id":uni.getStorageSync('userInfo').id }
						}
						if(this.userInfoStatus == 3){//工号
							var str = { "workNo":this.value,"id":uni.getStorageSync('userInfo').id }
						}
						if(this.userInfoStatus == 4){//邮箱
							var str = { "email":this.value,"id":uni.getStorageSync('userInfo').id }
						}
						if(this.userInfoStatus == 5){//手机号码
							var str = { "phone":this.value,"id":uni.getStorageSync('userInfo').id }
						}
						if(this.userInfoStatus == 6){//座机
							var str = { "telephone":this.value,"id":uni.getStorageSync('userInfo').id }
						}
					}
				}
				editAll(str).then(res=>{
					let _userInfo =  uni.getStorageSync("userInfo");
					if( this.userInfoStatus == 1 ){ _userInfo.username = str.username;this.username = str.username}
					if( this.userInfoStatus == 2 ){ _userInfo.realname = str.realname;this.realname = str.realname}
					if( this.userInfoStatus == 3 ){ _userInfo.workNo = str.workNo;this.workNo = str.workNo}
					if( this.userInfoStatus == 4 ){ _userInfo.email = str.email;this.email = str.email}
					if( this.userInfoStatus == 5 ){ _userInfo.phone = str.phone;this.phone = str.phone}
					if( this.userInfoStatus == 6 ){ _userInfo.telephone = str.telephone;this.telephone = str.telephone}
					if( this.userInfoStatus == 7 ){ _userInfo.birthday = str.birthday;}
					if( this.userInfoStatus == 8 ){ _userInfo.sex = str.sex;}
					uni.setStorageSync('userInfo',_userInfo)
					this.shows = false
					uni.showToast({ title:res.message,icon:'none' })
				},error=>{
				})
			},
			userInfo(v){
				this.shows = true
				this.userInfoStatus = v
				if( v==1 ){ this.titleP = '用户账户',this.shows1 = true,this.shows = false}
				if( v==2 ){ this.titleP = '姓名'}
				if( v==3 ){ this.titleP = '工号'}
				if( v==4 ){ this.titleP = '邮箱'}
				if( v==5 ){ this.titleP = '手机号码'}
				if( v==6 ){ this.titleP = '座机'}
			},
			onCancel(e){
			},
			onConfirm(e){
				this.userInfoStatus = 7
				this.birthday = e.dateValue;
				this.editAlls()
			},
			confirmSex(e){
				this.userInfoStatus = 8
				this.sex = e[0].value
				this.editAlls()
			},
			sexL(){
				this.sexShow = true
			},
			Time(){
				uni.request({
				    url: 'http://quan.suning.com/getSysTime.do', //请求网络时间的方法
				    success: (res) => {
						var currentTime = res.data.sysTime2.split(' ')[0]
						this.endDate =  res.data.sysTime2.split(' ')[0]
				    }
				});
			},
			getImg(){
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
				// uni.navigateTo({
				// 	url:"/pages/shezhi/personIcons"
				// })
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
			newPwd(){
				uni.navigateTo({
					url:"/pages/shezhi/newPwd"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding-top: 40upx;
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
		margin-top: 30upx;
	}
	/deep/ .u-input--border[data-v-460c1d26]{
		margin-top:20upx;
	}
	/deep/ [data-v-245a4366] [data-v-245a4366] .u-cell__value[data-v-65423b64]{
		display: flex;
		justify-content: flex-end;
	}
	/deep/ .u-cell[data-v-65423b64]{
		padding:20upx 0!important;
		font-size:28upx!important;
	}
	/deep/ .u-cell_title[data-v-65423b64]{
		font-weight:500;
		color:#333333;
	}
	/deep/ [data-v-fb14ae7e] .u-cell__value[data-v-65423b64]{
		text-align: right!important;
	}
	
	
	.wrap {
			padding: 40rpx;
		}
	
		.u-avatar-wrap {
			margin-top: 80rpx;
			overflow: hidden;
			margin-bottom: 80rpx;
			text-align: center;
		}
	
		.u-avatar-demo {
			width: 150rpx;
			height: 150rpx;
			border-radius: 100rpx;
		}
</style>
