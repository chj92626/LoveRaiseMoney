<template>
	<view class="">
		<u-form :model="form" ref="uForm">
			<u-form-item class="bgc" label-width="200rpx" label="企业类型" prop="name">
				<u-input v-model="form.name" placeholder="请输入企业类型"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="企业名称" prop="name">
				<u-input v-model="form.name" placeholder="请输入企业名称"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="公司简介" prop="name">
				<u-input v-model="form.name" placeholder="请输入公司简介"/>
			</u-form-item>
			<u-form-item class="bgc" label-width="200rpx" label="公司官网" prop="name">
				<u-input v-model="form.name" placeholder="请输入公司官网"/>
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
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 演示地址，请勿直接使用
			action: 'http://www.example.com/upload',
			fileList: [
				
			],
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				this.$refs.uUpload.upload();
				if (valid) {
					console.log('验证通过');
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