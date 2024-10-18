<style>
</style>
<template>
	<uni-section title="出差审批" type="line" title-font-size="50rpx">
		<uni-card title="出差" sub-title="填写出差信息" extra="注意填写真实性">
						<view class="example">
							<!-- 基础用法，不包含校验规则 -->
							<uni-forms ref="baseForm" :modelValue="baseFormData" labelWidth="200rpx">
								<uni-forms-item label="出差说明" required>
									<uni-easyinput v-model="baseFormData.name" placeholder="请输入出差标题"/>
								</uni-forms-item>
								<uni-forms-item label="类型" required>
									<uni-easyinput v-model="baseFormData.type" disabled/>
								</uni-forms-item>
								<uni-forms-item label="出差详细说明" required>
									<uni-easyinput type="textarea" v-model="baseFormData.description" placeholder="请输入详细的说明" />
								</uni-forms-item>
								<uni-forms-item label="开始时间" required>
									<uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.map.business.startTime"/>
								</uni-forms-item>
								<uni-forms-item label="结束时间" required>
									<uni-datetime-picker type="datetime" return-type="timestamp" v-model="baseFormData.map.business.endTime"/>
								</uni-forms-item>
								<uni-forms-item  label="图片/视频" required>
									<uni-file-picker limit="2" file-mediatype="all" title="最多选择2个图片/视频" mode="grid" @select="select" @progress="progress" @success="fileSuccess" @fail="fileFail"></uni-file-picker>
								</uni-forms-item>
							</uni-forms>
							<view> 
							<button type="primary" style="width: 50vw;">提交</button>
							</view>
						</view>
		</uni-card>
		
	</uni-section>
</template>

<script>
	export default {
		data() {
			return {
				url:"",
				baseFormData: {
					name: null,
					type: "出差",
					description: null,
					map: {
						business: {
							startTime: null,
							endTime:null,
							address:null
						}
					}
				},
			}
		},
		methods:{
			select(e){
				console.log(e)
			},
			progress(e){
				console.log(e)
			},
			fileSuccess(e){
				console.log(e.tempFilePaths[0])
				this.url=e.tempFilePaths[0]
			},
			fileFail(e){
				console.log(e)
			}
		}
	}
</script>
