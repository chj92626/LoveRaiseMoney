<template>
	<view class="content">
		<view class="c_top">
			<view class="nav_b"></view>公司信息
		</view>
		<view class="conter">
			<view class="">公司名称:<text>腾讯控股有限公司</text></view>
			<view class="">成立时间:<text>2020.09</text></view>
			<view class="">公司官网:<text>http://baidi.com</text></view>
			<view class="">公司简介:
				<u-input v-model="value" :type="type" :border="border" :disabled="true"/>
			</view>
		</view>
		<view class="c_top">
			<view class="nav_b"></view>爱心职位
		</view>
		<view class="conter">
			<view><text class="phones">客服人员—上海:</text><u-button type="error" size="mini">立即联系</u-button></view>
			<view><text class="phones">销售—杭州:</text><u-button type="error" size="mini">立即联系</u-button></view>
		</view>
		<view class="c_top">
			<view class="nav_b"></view>历来捐款
		</view>
		<view class="conter">
			<view class="">公司名称:<text>腾讯控股有限公司</text></view>
			<view class="">成立时间:<text>2020.09</text></view>
			<view class="">公司官网:<text>http://baidi.com</text></view>
			<view class="">公司简介:
				<u-input v-model="value" :type="type" :border="border" :disabled="true"/>
			</view>
				
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value: '该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司该公司',
				type: 'textarea',
				border: true,
				height: 100,
				autoHeight: true,
			}
		}
	}
</script>

<style lang="less" scoped>
	.content{
		margin:0 24upx;
		.c_top{
			display: flex;
			align-items:center;
			font-size:30upx;
			font-weight:600;
			margin: 24upx 0;
			.nav_b{
				width:40upx;
				height:40upx;
				background-color:#D81E06;
				border-bottom-right-radius:20upx;
				border-top-right-radius:20upx;
				margin-right:10upx;
			}
		}
		.conter{
			background-color:#FFFFFF;
			// margin:24upx 40upx;
			padding:20upx 30upx;
			border-radius:20upx;
			view{
				padding:10upx 0;
				font-size:28upx;
				font-weight:600;
				text{
					font-weight:500;
					margin-left:20upx;
					color:#666666;
				}
			}
			.phones{
				display: inline-block;
				width:300upx;
				font-weight:600;
				color:#000000;
			}
		}
	}
</style>
