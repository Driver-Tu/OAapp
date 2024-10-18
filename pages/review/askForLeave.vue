<style lang="scss">
	uni-forms-item {
		width: 200rpx;
	}
</style>
<template>
	<uni-section title="请假审批" type="line" title-font-size="50rpx">
		<uni-card title="请假" sub-title="填写请假信息" extra="注意填写真实性">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :modelValue="baseFormData" label-width="200rpx">
					<uni-forms-item label="请假说明" required>
						<uni-easyinput v-model="baseFormData.name" placeholder="请输入请假标题" />
					</uni-forms-item>
					<uni-forms-item label="类型" required>
						<uni-easyinput v-model="baseFormData.type" disabled />
					</uni-forms-item>
					<uni-forms-item label="请假详细说明" required="">
						<uni-easyinput type="textarea" v-model="baseFormData.description" placeholder="请输入详细的说明" />
					</uni-forms-item>
					<uni-forms-item label="开始时间" required>
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.map.leave.startTime" />
					</uni-forms-item>
					<uni-forms-item label="结束时间" required>
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.map.leave.endTime" />
					</uni-forms-item>
					<button style="width: 25vw; display: inline-block;" @click="selectImage">选择图片</button>
					<button style="width: 25vw; display: inline-block;" @click="selectFile">选择文件</button>
					<button style="width: 25vw; display: inline-block;" @click="selectVideo">选择视频</button>
				</uni-forms>
				<view>
					<button type="primary" style="width: 50vw;" @click="allData">提交</button>
				</view>
			</view>
		</uni-card>
	</uni-section>
</template>

<script>

	export default {
		data() {
			return {
				baseFormData: {
					name: null,
					type: "请假",
					description: null,
					map: {
						leave: {
							startTime: null,
							endTime: null,
						}
					},
					annexs: []
				},
			}
		},
		methods: {
			selectImage(e) {
				uni.chooseImage({
					success: (res) => {
						console.log(res)
					}
				})
			},
			selectFile(e) {
				uni.chooseFile({
						count: 3,
						extension: ['.pdf', '.doc', '.xlsx', '.docx', '.xls', 'png', 'jpg', 'mp4'],
						success: (res) => {
							const tempFilePaths = res.tempFilePaths; //若果只选择一个文件,这个文件就是数组的第一个元素
							//第二步:把选择的文件上传到服务器
							console.log(tempFilePaths)

							tempFilePaths.forEach(item=>{
								uni.uploadFile({
									url: 'http://localhost:8088/report/file/upload',
									filePath: item,
									name:'files',
									header: {
										"satoken": uni.getStorageSync("satoken")
									},
									success: (res1) => {
										//直接存数据库文件表，然后返回uuid，记录下来，给审批表关联uuid，方便查询
										
									},
									fail: (err) => {
										console.log(err)
									}
								})
							})
					}
				})
		},
		selectVideo(e) {
			uni.chooseVideo({
				success: (res) => {
					console.log(res)
				}
			})
		},
		allData() {
			console.log(this.baseFormData)
		},
	}
	}
</script>