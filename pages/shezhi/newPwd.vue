<template>
	<view class="content">
		<view class="c_box">
			<view class="conter">
				<u-input v-model="oldpassword" type="password" :auto-height="true" :border="true" placeholder="请输入原始密码"/>
			</view>
			<view class="conter conter1">
				<!-- <view class="">新密码</view> -->
				<u-input v-model="newpwd" type="password" :auto-height="true" :border="true" placeholder="请输入新密码"/>
			</view>
			<view class="conter conter1">
				<!-- <view class="">确认新密码</view> -->
				<u-input v-model="newpwds" type="password" :auto-height="true" :border="true" placeholder="确认新密码"/>
			</view>
		</view>
		<u-button class="custom-style" type="square" :ripple="true" ripple-bg-color="#067BF6" @tap="turnTo">确认修改</u-button>
	</view>
</template>

<script>
	import { changePassword,updatePassword } from '@/api/index.js'
	export default {
		data() {
			return {
				oldpassword:'',
				newpwd:'',
				newpwds:'',
			};
		},
		methods:{
			turnTo(){
				var that = this
				// var ma = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
				// if(!ma.test(that.newpwd)){
				// 	uni.showModal({
				// 		content:'密码至少包含 数字和英文，长度6-16',
				// 		success: function (res) {
				// 		    if (res.confirm) {
				// 		        // console.log('用户点击确定');
				// 		    } else if (res.cancel) {
				// 		        // console.log('用户点击取消');
				// 		    }
				// 		}
				// 	})
				// }
				if(that.newpwd == ''|| that.newpwds == '' || that.oldpassword == ''){
					uni.showToast({
						title:'密码不能为空',
						icon:"none",
					})
				}else if(that.newpwd!=that.newpwds){
					uni.showToast({
						title:'密码不一致',
						icon:"none",
					})
				}else{
					that.updatePasswords()
				}
			},
			updatePasswords(){
				var str = { 
					"oldpassword":this.oldpassword,
					"password":this.newpwd,
					"confirmpassword":this.newpwds,
					username: uni.getStorageSync('userInfo').updateBy
				}
				updatePassword(str).then(res=>{
					uni.showToast({
						title:'修改成功',
						icon:"success",
					})
					setTimeout(function() {
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}, 1000);
				},error=>{
				})
			},
			changePasswords(){
				var str = { "password":this.newpwd,"password":uni.getStorageSync('userInfo').id }
				changePassword(str).then(res=>{
					uni.showToast({
						title:'修改成功',
						icon:"success",
					})
					setTimeout(function() {
						uni.navigateTo({
							url:"/pages/login/login"
						})
					}, 1000);
				},error=>{
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.conter{
			padding: 35upx 24upx;
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			color: #333333;
		}
		.conter1{
			padding-top:0;
		}
	}
	.custom-style {
		background-color:#2564FC;
		color: #FFFFFF;
		margin:24upx;
		margin-top:60upx;
	}
</style>
