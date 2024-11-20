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
				<uni-forms ref="baseForm" :modelValue="baseFormData" label-width="200rpx" label-position="top">
					<uni-forms-item label="请假说明" required>
						<uni-easyinput v-model="baseFormData.approvalForms.fromName" placeholder="请输入请假标题" />
					</uni-forms-item>
					<uni-forms-item label="类型" required>
						<uni-easyinput v-model="baseFormData.approvalForms.type" disabled />
					</uni-forms-item>
					<uni-forms-item label="请假详细说明" required="">
						<uni-easyinput type="textarea" v-model="baseFormData.approvalForms.description" placeholder="请输入详细的说明" />
					</uni-forms-item>
					<uni-forms-item label="开始时间" required>
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.object.startDate" />
					</uni-forms-item>
					<uni-forms-item label="结束时间" required>
						<uni-datetime-picker type="datetime" return-type="timestamp"
							v-model="baseFormData.object.endDate" />
					</uni-forms-item>
					<uni-forms-item label="图片" required>
						<button style="width: 25vw; display: inline-block; font-size: 30rpx;"
							@click="selectImage">选择图片</button>
						<view v-for="item in tempFilePaths">
							<image :src="item.url"></image>
						</view>
					</uni-forms-item>
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
				tempFilePaths: [],
				baseFormData: {
					approvalForms: {
						fromName: null,
						type: "请假",
						description: null
					},
					approvers: [1],
					object: {
						startDate: null,
						endDate: null
					}
				},
			}
		},
		methods: {
			async selectImage(e) {
				await uni.chooseImage({
					count: 8,
					success: (res) => {
						this.uploadFile(res)
					}
				})
			},
			isImageByExtension(fileName) {
				return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
			},
			isVideoByExtension(fileName) {
				// 正则表达式匹配常见的视频文件扩展名，忽略大小写
				return /.(mp4|mov|avi|wmv|flv|mkv|webm|m4v)$/i.test(fileName);
			},
			uploadFile(res) {
				//若果只选择一个文件,这个文件就是数组的第一个元素
				//添加到数组里面
				console.log(res)
				this.filePaths = []
				if (res.tempFiles) {
					res.tempFilePaths.forEach(item => {
						this.tempFilePaths.push({
							"url": item,
							"name": item
						})
						this.filePaths.push({
							"url": item,
							"name": item
						})
						console.log(this.tempFilePaths)
					})
				} else if (res.tempFilePath) {
					this.tempFilePaths.push({
						"url": res.tempFilePath,
						"name": res.tempFilePath
					})
					this.filePaths.push({
						"url": res.tempFilePath,
						"name": res.tempFilePath
					})
					console.log(this.tempFilePaths)
				}
				//第二步:把选择的文件上传到服务器
				this.filePaths.forEach(item => {
					uni.uploadFile({
						url: 'http://192.168.0.196:8088/report/file/upload',
						filePath: item.url,
						name: 'files',
						header: {
							"satoken": uni.getStorageSync("satoken")
						},
						success: (end) => {
							//直接存数据库文件表，然后返回uuid，记录下来，给审批表关联uuid，方便查询
							const final = JSON.parse(end.data)
							if (final.code === "200") {
								const uuid = final.data
								console.log(uuid)
								this.baseFormData.filePath.push(uuid)
							}
						},
						fail: (err) => {
							console.log(err)
						}
					})
				})
			},
			allData() {
				console.log(this.baseFormData)
				uni.request({
					url:"http://192.168.0.196:8088/approvalForms/addApprovalForms",
					method:"POST",
					data:this.baseFormData,
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					success: (res) => {
						if(res.data.code==="200"){
							uni.showModal({
								title:"提示",
								content:"已成功提交",
								success: (res) => {
									uni.navigateBack()
								}
							})
						}else{
							uni.showModal({
								title:"提示",
								content:"提交失败，请确认表单信息"
							})
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
		}
	}
</script>