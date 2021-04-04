const Columns = {
	enterpriseType: [
		{
			required: true,
			message: '请选择企业类型',
			trigger: ['blur', 'change']
		}
	],
	enterpriseName: [
		{
			required: true,
			message: '请输入企业名称',
			trigger: ['blur', 'change']
		}
	],
	enterpriseHttp:[
		{
			required: true,
			message: '请输入企业官网',
			trigger: ['blur', 'change']
		}
	],
	enterpriseTime:[
		{
			required: true,
			message: '请选择成立时间',
			trigger: ['blur', 'change']
		}
	],
	enterprisePhone:[
		{
			required: true,
			message: '请输入联系方式',
			trigger: ['blur', 'change']
		}
	],
	enterpriseSize:[
		{
			required: true,
			message: '请选择企业规模',
			trigger: ['blur', 'change']
		}
	],
	enterpriseAdd:[
		{
			required: true,
			message: '请输入企业地址',
			trigger: ['blur', 'change']
		}
	],
	enterpriseIntroduce:[
		{
			required: true,
			message: '请输入企业介绍',
			trigger: ['blur', 'change']
		}
	],
	enterpriseBriefIntroduce:[
		{
			required: true,
			message: '请输入公司简介',
			trigger: ['blur', 'change']
		}
	],
}
    
export { Columns }