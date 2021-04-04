<template>
	<view class="content">
		<view class="banner w100">
			<u-swiper :list="Bannerlist" height="360"></u-swiper>
		</view>
		<view class="kj bs-bb p30_all w100">
			<div class="tit bold f32 pb-30 line15">服务推荐</div>
			<view class="btns w100 flex justSb ">
				<view class="btn  flex justSb bs-bb p20_all ali-c">
					<view class="left">
						<view class="h4 f30 bold">在线咨询</view>
						<view class="p  line15 f24">24小时回复</view>
					</view>
					<image src="../../static/tabbar/choukuanl.png"></image>
				</view>
				<view class="btn  flex justSb bs-bb p20_all ali-c">
					<view class="left">
						<view class="h4 f30 bold">电话咨询</view>
						<view class="p line15 f24">一键电话沟通</view>
					</view>
					<image src="../../static/tabbar/choukuanl.png"></image>
				</view>
			</view>
		</view>
		<div class="ckal bs-bb p30 w100" style="padding-bottom: 0;">
			<div class="tit bold f32 pb-30 line15">筹款案例</div>
			<swiper class="swiper1" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="3000" :circular="true" :duration="500" :next-margin="rightWidth">
				<swiper-item v-for="(item,i) in 5" :key="i" @click="navto('/pages/order/orderDet?ids=' + item.orderId)">
					<view class="swiper-item bs-bb pr-20">
						<div class="inner">
							<view class="msg br-20 bgfff ">
								<image src="../../static/index/banner.png" mode="aspectFill" class="w100 block"></image>
							</view>
							<div class="bottom bs-bb p20">
								<view class="per p-20 flex ali-C">
									<image src="../../static/index/icon1.png" mode="aspectFit"></image>
									<view class="name flex1 bs-bb p20">张大仙</view>
									<view class="time">2019-02-08</view>
								</view>
								<div class="num flex justSa w100 bs-bb f28 ta-c">
									<view class="number w33">
										<view class="p1 line15 f32">500000</view>
										<view class="p2 f24 c999">目标金额(元)</view>
									</view>
									<view class="number w33">
										<view class="p1 line15 f32">48660</view>
										<view class="p2 f24 c999">已筹金额(元)</view>
									</view>
									<view class="number w33">
										<view class="p1 line15 f32">16116</view>
										<view class="p2 f24 c999">捐助次数(次)</view>
									</view>
								</div>
							</div>
						</div>
					</view>
				</swiper-item>
			</swiper>
		</div>
		<view class="gywm bs-bb p30 w100" style="padding-top: 10rpx;padding-bottom: 30rpx;">
			<view class="tit bold f32 pb-30 line15">关于爱心筹</view>
			<image src="../../static/index/icon2.png" mode="widthFix" class="br-15 block w100"></image>
		</view>
		<view class="gywm bs-bb p30 w100" style="padding-top: 10rpx;padding-bottom: 30rpx;">
			<view class="tit bold f32 pb-30 line15">最新资讯</view>
			<view class="news bg_fff br-20 bs-bb p30 ov">
				<view class="li p-30 bt1 flex ov" v-for="(item,i) in 3" :key='i'>
					<view class="right flex1">
						<view class="p f40 sl-2 c666">爱心筹筹款总金额达到500W元，并且已经全部给与患者手中</view>
						<view class="time f28 line25 c999">2021-09-27</view>
					</view>
					<image class="left f-shrink mr-l20 br-20" src="../../static/index/banner.png"></image>
				</view>
			</view>
		</view>
		<view class="callme">
			<view class="m_auto w50 bg c-fff f32 ta-c"><image src="../../static/index/dadianhua.png" mode=""></image>010-32988654</view>
			<view class="p c999 ta-c line2 f28 pt-10">服务时间:9:00-21:00</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Bannerlist: [{
						image: '/static/index/banner.png',
					},
					{
						image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1045617393,4235349254&fm=26&gp=0.jpg',
					}
				],
				showTitle:false,
				autoplay:true,
				rightWidth:'106rpx',
				background: {
					backgroundColor: '#4985ff',
				},
				indicatorDots:false,
			}	
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
	.banner{
		height: 360rpx;
	}
	.kj{
		.btns{
			.btn{
				width: 48%;
				box-shadow: 0 0 5px #EEEEEE;
				image{
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
	}
	.ckal{
		.swiper1{
			height: 460rpx;
		}
		.swiper-item{
			.inner{
				background: #fafafa;
				padding-bottom: 20rpx;
				border-radius: 20rpx;
				overflow: hidden;
			}
			.msg{
				height: 240rpx;
				image{
					height: 240rpx;
				}
				box-shadow: 0 0 10px #ddd;
			}
			.per{
				height: 100rpx;
				image{
					width: 60rpx;
					height: 60rpx;
					border-radius: 100%;
				}
			}
			.num{
				.p1{
					color: #faab02;
				}
			}
		}
	}
	.gywm{
		.block{
			box-shadow: 0 0 5px #ededed;
		}
	}
	.news{
		box-shadow: 0 0 10rpx #ededed;
		.li{
			width: 100%;
			image{
				width: 168rpx;
				height: 168rpx;
			}
		}
	}
	.callme{
		padding: 50rpx 0 80rpx;
		.m_auto{
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			image{
				display: inline-block;
				width: 36rpx;
				height: 36rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}
	}
</style>
