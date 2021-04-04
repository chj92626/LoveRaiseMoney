<template>
	<view class="">
		<u-form :model="form" ref="uForm">
			<u-form-item class="bgc" label-width="200rpx" label="logo" prop="name">
				<u-upload ref="uUpload"
					:action="action"
					:auto-upload="false"
					:max-count="1"
					:multiple="true"
					:show-progress="false"
					@on-uploaded = "successImg"
				></u-upload>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业类型" prop="enterpriseType">
				<u-input type="select" :select-open="enterpriseTypeShow" v-model="form.enterpriseType" placeholder="请选择企业类型" @click="enterpriseTypeShow = true"></u-input>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业名称" prop="enterpriseName">
				<u-input v-model="form.enterpriseName" placeholder="请输入企业名称"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业官网" prop="enterpriseHttp">
				<u-input v-model="form.enterpriseHttp" placeholder="请输入企业官网"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="成立时间" prop="enterpriseTime">
				<u-input type="select" :select-open="enterpriseTimeShow" v-model="form.enterpriseTime" placeholder="请选择成立时间" @click="enterpriseTimeShow = true"></u-input>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="联系方式" prop="enterprisePhone">
				<u-input v-model="form.enterprisePhone" placeholder="请输入联系方式"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业规模" prop="enterpriseSize">
				<u-input type="select" :select-open="enterpriseSizeShow" v-model="form.enterpriseSize" placeholder="请选择企业规模" @click="enterpriseSizeShow = true"></u-input>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业地址" prop="enterpriseAdd">
				<u-input v-model="form.enterpriseAdd" placeholder="请输入企业地址"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="企业介绍" prop="enterpriseIntroduce">
				<u-input v-model="form.enterpriseIntroduce" placeholder="请输入企业介绍"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" required label="公司简介" prop="enterpriseBriefIntroduce">
				<u-input v-model="form.enterpriseBriefIntroduce" placeholder="请输入公司简介"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="营业执照" prop="name">
				<u-upload ref="uUpload"
					:action="action"
					:auto-upload="false"
					:max-count="1"
					:multiple="true"
					:show-progress="false"
					@on-uploaded = "successImg"
				></u-upload>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="企业照片" prop="name">
				<u-upload ref="uUpload"
					:action="action"
					:auto-upload="false"
					:max-count="1"
					:multiple="true"
					:show-progress="false"
					@on-uploaded = "successImg"
				></u-upload>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="企业形象照" prop="name">
				<u-upload ref="uUpload"
					:action="action"
					:auto-upload="false"
					:max-count="1"
					:multiple="true"
					:show-progress="false"
					@on-uploaded = "successImg"
				></u-upload>
			</u-form-item>
		</u-form>
		
		<u-action-sheet :list="enterpriseTypeShowList"  v-model="enterpriseTypeShow" @click="systemCodeCallback"></u-action-sheet>
		<u-action-sheet :list="deviceModelList"  v-model="deviceModelShow" @click="deviceModelShowCallback"></u-action-sheet>
		<u-picker mode="time" v-model="enterpriseTimeShow" @confirm="confirmTime"></u-picker>
		
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
import { Columns } from './data'

export default {
	data() {
		return {
			enterpriseTypeShow: false,
			enterpriseTypeShowList: [
				{
					value: '1',
					text: '江'
				},
				{
					value: '2',
					text: '湖'
				}
			],
			deviceModelShow: false,
			deviceModelList: [],
			enterpriseTimeShow:false,
			enterpriseSizeShow:false,
			enterpriseSizeShowList: [],
			
			params: {
				year: true,
				month: true,
				day: true,
				hour: false,
				minute: false,
				second: false
			},
			// 演示地址，请勿直接使用
			action: 'http://www.example.com/upload',
			fileList: [
				
			],
			form: {
				enterpriseType:'',
				enterpriseName: '',
				enterpriseHttp:'',
				enterprisePhone:'',
				enterpriseSize:'',
				enterpriseAdd:'',
				enterpriseIntroduce:'',
				enterpriseBriefIntroduce:''
			},
			rules: { ...Columns }
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				console.log(valid,"咔咔咔咔咔咔扩扩扩")
				this.$refs.uUpload.upload();
				if (valid) {
					console.log(this.form,'验证通过');
				} else {
					console.log('验证失败');
				}
			});
		},
		successImg(data){
			console.log(data);
			var arr = []
			var _that = this
			data.forEach( item => {
				arr.push(item.response.message)
			})
			var str = String(arr)
		},
		confirmTime(e){
			console.log(e,"时间")
			this.form.enterpriseTime = e.year + "-" + e.month + "-" + e.day
		},
		systemCodeCallback(index) {
			console.log(index,'kkkkkkkkkkkkkkk');
		},
		
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>
<style>
	.bgc{
		background-color:#FFFFFF;
		padding:30upx;
	}
</style>