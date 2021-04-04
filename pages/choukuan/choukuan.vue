<template>
	<view class="content p30 bs-bb">
		<view class="fixed_t bg_fff">
			<view class="out flex">
				<div class="redLine bg" :style="{width:(width*ipnutNUm + '%')}">
				</div>
				<view class="txtLine f28 flex ta-c">
					<text class="c_fff" :class="{c_fff : ipnutNUm == 1}">基本信息</text>
					<text class="c_fff" :class="{c_fff : ipnutNUm == 2}">求助说明</text>
					<text class="c_fff" :class="{c_fff : ipnutNUm == 3}">医疗证明</text>
					<text class="c_fff" :class="{c_fff : ipnutNUm == 4}">经济状况</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ipnutNUm:1,
				width:25,
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.c_fff{
		color: #FFFFFF;
	}
	.fixed_t{
		padding: 0rpx 30rpx 16rpx;
		/* #ifdef H5 */
			top: 44px;
		/* #endif */
		/* #ifndef H5 */
			top: 0;
		/* #endif */
		.out{
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			background-image: url(../../static/choukuan/icon1.png);	
			background-size: 690rpx 60rpx ;
			position: relative;
			.redLine{
				position: absolute;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				width: 50%;
			}
			.txtLine{
				position: absolute;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				width: 100%;
				text{
					width: 25%;
				}
				.txtLine{
					text-indent: -1em;
				}
			}
		}
	}
</style>
