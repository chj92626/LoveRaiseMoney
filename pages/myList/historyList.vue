<template>
	<view class="content">
		<view class="conter flex" v-for="(item,index) in result" :key="index">
			<image src="/static/index/icon1.png" mode=""></image>
			<view class="c_tit">
				<view class="ellipsis">
					百善孝为先，百善孝为先百善孝为先百善孝为先百善孝为先百善孝为先百善孝为先
				</view>
				<u-line-progress active-color="#F29100" :percent="70" :show-percent="false" height="10"></u-line-progress>
				<view class="flex">
					<view>目标筹款<text>2000元</text></view>
					<view>在首页筹到<text>20元</text></view>
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
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.flex{
		display:flex;
		// align-items:center;
	}
	.ellipsis{
		// white-space:nowrap;
		// overflow:hidden;
		// text-overflow:ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;/*显示的行数*/
		overflow: hidden;
	}
	.content{
		margin:0 24upx;
		.conter{
			background-color:#FFFFFF;
			padding:24upx 10upx;
			border-radius: 20upx;
			margin-top:20upx;
			font-size:24upx;
			font-weight:500;
			color:#000000;
			image{
				width:140upx;
				height:140upx;
				margin-right: 20upx;
			}
			.c_tit{
				flex: 1;
				position:relative;
				.ellipsis{
					width:500upx;
					font-size:28upx;
				}
				.flex{
					width:100%;
					color:#999;
					position: absolute;
					bottom:0;
					justify-content: space-between;
					text{
						color:#F29100;
					}
				}
			}
		}
	}
</style>
