<template>
	<view class="content">
		<u-navbar :is-back="false" title="">
			<view class="slot-wrap">
				<u-tabs :list="list" :is-scroll="false" active-color="#D81E06" :current="current" @change="change"></u-tabs>
			</view>
		</u-navbar>
		<!-- 正在筹款 -->
		<view class="conter" v-for="(item,index) in result" :key="index" v-show="current == 0">
			<view class="flex">
				<image src="/static/index/icon1.png" mode=""></image>
				<view class="c_tit">
					<view class="ellipsis">
						百善孝为先，百善孝为先百善孝为先百善孝为先百善孝为先百善孝为先百善孝为先
					</view>
					<u-line-progress active-color="#df5628" :percent="70" :show-percent="false" height="10"></u-line-progress>
					<view class="flex">
						<view>已筹<text>2000元</text></view>
						<view>募捐次数<text>20次</text></view>
					</view>
				</view>
			</view>
			<view class="perMsg flex justSb">
				<view class="left c999"><text>张大仙</text><text>懒癌晚期</text></view>
				<view class="right liji ta-c bg c-fff f24">立即募捐</view>
			</view>
		</view>
		
		<!-- 已完成筹款 -->
		<view class="conter" v-for="(item,index) in result" :key="item.id"  v-show="current == 1">
			<view class="flex">
				<image src="/static/index/icon1.png" mode=""></image>
				<view class="c_tit">
					<view class="ellipsis">
						百善孝为先，百善孝为先百善孝为
					</view>
					<u-line-progress active-color="#df5628" :percent="100" :show-percent="false" height="10"></u-line-progress>
					<view class="flex">
						<view>已筹<text>2000元</text></view>
						<view>共募捐次数<text>20次</text></view>
					</view>
				</view>
			</view>
			<view class="perMsg flex justSb">
				<view class="left c999"><text>张大仙</text><text>懒癌晚期</text></view>
				<view class="right liji ta-c bg_eee c999 f24">已完成</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '正在筹款'
				}, {
					name: '已完成筹款'
				}],
				current: 0,
				result:[
					{},{},{},{},{},{},{},{},{},{},{},{},{}
				],
			}
		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.perMsg{
		height: 60rpx;
		line-height: 60rpx;
		padding-top: 10rpx;
		.left{
			text{
				margin-right: 30rpx;
			}
		}
		.liji{
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 30rpx;
			border-radius: 30rpx;
		}
		// .wanc{
		// 	height: 40rpx;
		// 	line-height: 40rpx;
		// 	padding: 0 20rpx;
		// 	border-radius: 20rpx;
		// }
	}
	.slot-wrap {
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		flex: 1;
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}
	.flex{
		display:flex;
		// align-items:center;
	}
	.line{
		margin-top: -10rpx;
	}
	.ellipsis{
		// white-space:nowrap;
		// overflow:hidden;
		// text-overflow:ellipsis;
		line-height: 40rpx;
		height: 80rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;/*显示的行数*/
		overflow: hidden;
	}
	.content{
		margin:0 24upx;
		.conter{
			background-color:#FFFFFF;
			padding:24upx 20upx;
			border-radius: 20upx;
			margin-top:20upx;
			font-size:24upx;
			font-weight:500;
			color:#000000;
			image{
				width:140upx;
				height:140upx;
				margin-right: 20upx;
				border-radius: 10rpx;
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
						color:#ff450a;
					}
				}
			}
		}
	}
</style>
