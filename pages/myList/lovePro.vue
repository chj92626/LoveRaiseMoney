<template>
	<view class="">
		爱心职位
		
		<view class="sub" :class="{'active':pickerUserIndex==1}" @tap="addsub">
			<u-icon name="plus" color="#fff" size="48"></u-icon>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pickerUserIndex: -1
			}
		},
		methods:{
			addsub(){
				uni.navigateTo({
					url:"/pages/myList/EnterpriseCertification"
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub{
		width:100upx;
		height:100upx;
		border-radius:50%;
		background-color:#D81E06;
		display:flex;
		justify-content:center;
		align-items:center;
		position:fixed;
		bottom:100upx;
		right:50upx;
		z-index:999;
		&:active,
		&.active {
			background:rgba(255,0,0,0.5);
		}
	}
</style>
