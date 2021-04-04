<template>
	<view class="content">
		<view class="conter flex" v-for="(item,index) in loveList" :key="index" @tap="details">
			<image :src="item.imgG" mode=""></image>
			<view class="c_con flex">
				<image src="/static/index/icon1.png" mode=""></image>
				<view class="c_tit">
					<view class="ellipsis">
						鸡王不吃鸡
					</view>
					共帮助2人，共捐款20万
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:[
					{},{},{},{},{},{},{},{},{},{},{},{},{}
				],
				loveList:[]
			}
		},
		onLoad() {
			var arr = []
			this.result.forEach((item,index )=>{
				if( index == 0 ){
					item['imgG'] = '/static/loveImg/guanjun.png'
				}
				if( index == 1 ){
					item['imgG'] = '/static/loveImg/yajun.png'
				}
				if( index == 2 ){
					item['imgG'] = '/static/loveImg/jijun.png'
				}
				arr.push(item)
			})
			this.loveList = arr 
		},
		methods: {
			details(){
				uni.navigateTo({
					url:"/pages/paihanglist/detail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color:#f5f5f5;
	}
	.flex{
		display:flex;
		align-items:center;
	}
	.ellipsis{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.content{
		margin:0 24upx;
		.conter{
			background-color:#FFFFFF;
			padding:24upx 10upx;
			border-radius: 20upx;
			margin-top:20upx;
			image{
				width:50upx;
				height:50upx;
				margin-right: 20upx;
			}
			.c_con{
				flex:1;
				font-size:24upx;
				font-weight:500;
				image{
					width:70upx;
					height:70upx;
					margin-right: 20upx;
				}
				.c_tit{
					flex: 1;
					.ellipsis{
						width:500upx;
						font-size:28upx;
					}
				}
			}
		}
	}
	
</style>
