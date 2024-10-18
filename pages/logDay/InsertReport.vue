<style lang="scss">
	.Layout {
		width: 100vw;

		.fileChoose {
			padding: 20rpx;
			border-bottom: 1px solid #191919;
			background-color: #e8e8e8;
			text {
				width: 40%;
				padding: 10rpx;
				font-size: 46rpx;
			}
			.uni-icons {
				text-align: left;
				width: 40%;
				padding: 20rpx;
			}
		}
	}

	.submit {
		button {
			display: inline-block;
			width: 40vw;
			margin: 20rpx;
		}
	}

	scroll-view {
		height: 78vh;
	}
</style>

<template>
	<view class="row">
		<uni-segmented-control :current="0" :values="items" style-type="text" active-color="#00b100"
			@clickItem="chengeStatus" />
	</view>
	<scroll-view :scroll-y="true">
		<!-- 基础用法，不包含校验规则 -->
		<uni-forms ref="baseForm" :modelValue="baseFormData" label-width="100%" label-position="top">
			<uni-forms-item label="日志标题" required>
				<uni-easyinput v-model="baseFormData.reportName" placeholder="请输入标题" />
			</uni-forms-item>
			<uni-forms-item label="今日工作内容及感悟" required>
				<uni-easyinput type="textarea" style="min-height: 30vh;" v-model="baseFormData.content" :maxlength="-1"
					:inputBorder="false" placeholder="请输入今日感悟" :clearable="true" :autoHeight="true" />
				<view style="" v-if="baseFormData.content!=null"><text>{{baseFormData.content.length}}/8000</text>
				</view>
			</uni-forms-item>
		</uni-forms>
		<view class="Layout">
			<view class="fileChoose" @click="selectImage()">
				<text>选择图片</text>
				<uni-icons type="image" size="46rpx" color="#00aaff"></uni-icons>
			</view>
			<view v-if="tempFilePaths!=null" v-for="item in tempFilePaths" style="display: inline-block;">
				<image :src="item.url" style="width: 200rpx; height: 200rpx; padding: 20rpx;"
					v-if="isImageByExtension(item.name)"></image>
			</view>
			<view class="fileChoose" @click="selectFile()">
				<text>选择附件</text>
				<uni-icons type="paperclip" size="46rpx" color="#00aaff"></uni-icons>
			</view>
			<view v-if="tempFilePaths!=null" v-for="item in tempFilePaths" style="display: inline-block;">
				<image :src="defaultImage" style="width: 100rpx; height: 100rpx; padding: 20rpx;"
					v-if="isImageByExtension(item.name)==false">
				</image>
				<text  style="display: block;" v-if="isImageByExtension(item.name)==false">
					{{item.name}}
				</text>
				
			</view>
		</view>

	</scroll-view>
	<view class="submit"
		style="position: fixed;bottom: 0; right: 0;width: 100vw;background-color: aliceblue;border-top: 1px solid #b8b8b8;">
		<button type="primary" @click="allData()">查看{{baseFormData.type}}</button>
		<button type="primary" @click="allData()">提交{{baseFormData.type}}</button>
	</view>
</template>

<script>
	import ImageGetVue from './ImageGet.vue';
	export default {
		data() {
			return {
				defaultImage: "https://mp-b8e53f5e-c503-4780-9859-ec2675b3d8cd.cdn.bspapp.com/unicloud/wenjian.png",
				tempFilePaths: [],
				textNum: null,
				items: ['日报', '周报', '月报'],
				baseFormData: {
					reportName: null,
					type: "日报",
					content: null,
					filePath: []
				},
			}
		},
		components: {
			ImageGetVue
		},
		onShow() {

		},
		methods: {
			isImageByExtension(fileName) {
				return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
			},
			uploadFile(res) {
				console.log(res)
				//若果只选择一个文件,这个文件就是数组的第一个元素
				//添加到数组里面
				this.tempFilePaths = res.tempFiles.map(item => {
					return {
						url: item.path,
						name: item.name
					}
				});
				console.log(this.tempFilePaths)
				//第二步:把选择的文件上传到服务器
				this.tempFilePaths.forEach(item => {
					uni.uploadFile({
						url: 'http://localhost:8088/report/file/upload',
						filePath: item.url,
						name: 'files',
						header: {
							"satoken": uni.getStorageSync("satoken")
						},
						success: (end) => {
							//直接存数据库文件表，然后返回uuid，记录下来，给审批表关联uuid，方便查询
							const final = JSON.parse(end.data)
							const uuid = final.data
							this.baseFormData.filePath.push(uuid)
						},
						fail: (err) => {
							console.log(err)
						}
					})
				})
			},
			chengeStatus(e) {
				this.baseFormData.type = this.items[e.currentIndex]
			},
			selectImage(e) {
				uni.chooseImage({
					success: (res) => {
						this.uploadFile(res)
					}
				})
			},
			selectFile(e) {
				uni.chooseFile({
					count: 5,
					success: (res) => {
						this.uploadFile(res)
					}
				})
			},
			allData() {
				if((this.baseFormData.reportName!==null&&this.baseFormData.reportName!=="")&&(this.baseFormData.content!==null&&this.baseFormData.content!=="")){
					console.log(this.baseFormData)
					uni.request({
						url:"http://localhost:8088/report/addReport",
						method:'POST',
						header:{
							"satoken":uni.getStorageSync("satoken")
						},
						data:this.baseFormData,
						success: (res) => {
							if(res.data.code==="200"){
								uni.redirectTo({
									url:"/pages/logDay/logDay",
									success() {
										uni.showToast({
											duration:1000,
											title:"提交成功",
											icon:'success'
										})
									},
									fail() {
										uni.showToast({
											duration:1000,
											title:"提交错误!",
											icon:'error'
										})
									}
								})
							}
						},
						fail: (fail) => {
							console.log(fail)
						}
					})
				}else{
					uni.showToast({
						duration:1000,
						title:"标题/内容不规范",
						icon:'error'
					})
				}
				
			}
		}
	}
</script>