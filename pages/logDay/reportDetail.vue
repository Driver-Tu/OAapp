<style lang="scss">
	.imageDom {
		.title {
			padding: 10rpx;
			margin: 5rpx;
			background-color: #e3e3e3;
			font-size: 40rpx;
		}
	}

	.videoDom {
		.title {
			padding: 10rpx;
			margin: 5rpx;
			background-color: #e3e3e3;
			font-size: 40rpx;
		}
	}

	.content {
		padding: 20rpx;
	}

	.fileDom {
		.title {
			padding: 10rpx;
			margin: 5rpx;
			background-color: #e3e3e3;
			font-size: 40rpx;
		}
	}
	.gongNenMain{
		width: 80vw;
		text-align: right;
		.gongNen{
			display: inline-block;
			color: #00aaff;
		}
	}
</style>

<template>
	<view v-for="item in allData">
		<uni-card :title="item.reportName" :sub-title="item.reportDate" :extra="item.userName+'的'+item.type" 
			thumbnail="../../static/tx/default.png">
			<view class="content">
				<text style="font-size: 40rpx;font-weight: bold;">主要内容:</text>
				<rich-text :nodes="item.content"></rich-text>
			</view>
			<view class="userOnVos" v-if="index==='1'&&userOnVos!==null&&userOnVos.length!==0">
				<uni-collapse>
								<uni-collapse-item title="接收人" :show-animation="true">
									<view class="content" style="min-height: 160rpx; max-height: 360rpx;">
										<view class="userItem" v-for="item in userOnVos" style="display: inline-block; margin:10rpx 26rpx;" @click="selectItemUser(item)">
												<view class="userImage" >
													<image class="item-image" v-if="isImageByExtension(item.userImage)" :src="item.userImage" style="width: 80rpx; height: 80rpx;"></image>
													<image class="item-image" v-else-if="item.userImage===null" src="../../static/tx/default.png" style="width: 80rpx; height: 80rpx;"></image>
													<image class="item-image" v-else src="../../static/tx/default.png" style="width: 80rpx; height: 80rpx;"></image>
												</view>
										</view>
									</view>
								</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="imageDom">
				<uni-collapse >
								<uni-collapse-item title="图片" :show-animation="true">
									<view class="content">
										<view class="image" v-for="i in imageUrls" style="display: inline-block;">
											<image :src="i" style="width: 120rpx;height: 120rpx; margin: 20rpx;" @click="imagePreview(i)">
											</image>
										</view>
									</view>
								</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="fileDom">
				<uni-collapse >
								<uni-collapse-item title="文件" :show-animation="true">
									<view class="content">
										<view class="video" v-for="i in FileUrls" style="display: inline-block;">
											<view class="fileName"
												style="padding: 30rpx 70rpx;margin: 10rpx; font-size: 50rpx; background-color: #00aaff;color: #ffffff;border-radius: 20rpx;"
												@click="filePreview(i)">文件</view>
										</view>
									</view>
								</uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="videoDom" style="margin: 26rpx;" v-if="videoUrls.length!==0" @click="videoShow">
				<view class="left" style="display: inline-block;">
					<uni-icons type="camera" size="30rpx"></uni-icons>
					<text>点击查看视频({{videoUrls.length}})</text>
				</view>
			</view>
			<view class="gongNenMain" v-if="index==='1'" style="margin: 20rpx;">
				<!-- <view class="gongNen"><uni-icons type="undo" size="30" color=""  ></uni-icons>
				</view> -->
				<view class="gongNen"><uni-icons type="trash" size="30" color="" @click="deleteReport"></uni-icons>
				</view>
			</view>
		</uni-card>
	</view>
	<view v-if="disabled">
		<uni-card v-if="isImageByExtension(userInfo.userImage)"  :thumbnail="userInfo.userImage" :title="userInfo.name" :extra="userInfo.departmentName" :sub-title="userInfo.roleName">
		</uni-card>
		<uni-card v-else  thumbnail="../../static/tx/default.png" :title="userInfo.name" :extra="userInfo.departmentName" :sub-title="userInfo.roleName">	
		</uni-card>
	</view>
</template>

<script>
	
	function isImageType(filename) {
		// 定义图片文件的扩展名
		const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp', 'tiff'];
		// 获取文件的扩展名
		const extension = filename.split('.').pop().toLowerCase();
		// 检查扩展名是否在图片扩展名列表中
		return imageExtensions.includes(extension);
	};

	function isVideoType(filename) {
		// 定义视频文件的扩展名
		const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', '3gp'];
		// 获取文件的扩展名
		const extension = filename.split('.').pop().toLowerCase();
		// 检查扩展名是否在视频扩展名列表中
		return videoExtensions.includes(extension);
	};
	export default {
		props: ['reportId'],
		data() {
			return {
				disabled:false,
				userInfo:{
					name:null,
					departmentName:null,
					userImage:null,
					roleName:null
				},
				userOnVos:[],
				videoUrls: [],
				imageUrls: [],
				FileUrls: [],
				data: {
					pageNum: 1,
					pageSize: 1,
					data: {
						reportId: null
					}
				},
				userIds:[],
				allData: [],
				schedule: 0,
				index:null
			}
		},
		onLoad(options) {
			if (options.reportId) {
				this.data.data.reportId = JSON.parse(decodeURIComponent(options.reportId)).split(",")[0]
				const index= JSON.parse(decodeURIComponent(options.reportId)).split(",")[1]
				this.index=index
				console.log(index)
				if(index==="0"){
					this.getMyShareData()
				}else{
					this.getData()
				}
			}
		},
		methods: {
			videoShow(){
				uni.navigateTo({
					url:"/pages/VideoShow/VideoShow?videoUrls="+JSON.stringify(this.videoUrls)
				})
			},
			isImageByExtension(fileName) {
				return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
			},
			//获取分享给自己的日志
			selectItemUser(item){
				this.disabled=true
				this.userInfo.name=item.userName
				this.userInfo.departmentName=item.departmentName
				this.userInfo.roleName=item.roleName
				this.userInfo.userImage=item.userImage
			},
			getMyShareData(){
				uni.showLoading({
					title: "正在获取当天数据..."
				})
				uni.request({
					url: "http://192.168.0.196:8088/report/shareReport",
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					data: this.data,
					method: 'POST',
					success: (res) => {
						if(res.data.code==="200"){
							uni.hideLoading();
							const records = res.data.data.records
							this.total = res.data.total
							if(records[0].fileUrls.length!==0){
								const fileUrls = records[0].fileUrls
								fileUrls.forEach(item => {
									if (isImageType(item)) {
										this.imageUrls.push(item)
									} else if (isVideoType(item)) {
										this.videoUrls.push(item)
									} else {
										this.FileUrls.push(item)
									}
								})
							}
							this.allData = records
						}else{
							uni.hideLoading();
							console.log(res)
						}
					},
					fail: (fail) => {
						uni.hideLoading();
						console.log(fail)
					}
				});
				uni.hideLoading();
			},
			imagePreview(i) {
				uni.previewImage({
					urls: [i]
				})
			},
			deleteReport(){
				uni.showModal({
					title:"提示",
					content:"您确认删除吗?",
					success: (res) => {
						if(res.confirm){
							uni.request({
								url:"http://192.168.0.196:8088/report/deleteReports",
								data:[this.data.data.reportId],
								method:'DELETE',
								header:{
									"satoken":uni.getStorageSync("satoken")
								},
								success: (res) => {
											if(res.data.code==="200"){
												uni.showModal({
														title:"恭喜",
														content:"删除成功",
														confirmColor:"#ffe30f",
														showCancel:false,
														success: (res) => {
															if(res.confirm){
																uni.navigateBack({
																	delta:1
																})
															}
														}
													})
												}else{
													uni.showModal({
															title:"失败",
															content:"删除失败",
															confirmColor:"#ffe30f"
														})
												}
											},
										fail: (err) => {
											console.log(err)
										}
							})
						}else if(res.cancel){
							console.log("用户已经取消了删除！")
						}
					}
				})
			},
			filePreview(item) {
				// 流程步骤: 利用下载文件功能 先生成临时文件 - 调用api打开临时文件里面的内容,从而生成预览的效果,但是这个未能真实的下载到本地
				// 1.pdfUrl  可以直接在浏览器打开  2.一定要在小程序后台配置该pdf的域名 让其可以下载
				uni.showLoading({
					title: '正在打开...'
				});
				this.schedule = 0; //载入进度为0

				const downloadTask = uni.downloadFile({
					url: item, // 图片或者文件地址
					success: function(res) {
						var filePath = res.tempFilePath; // 临时文件存储路径
						//  文件打开文件预览
						uni.openDocument({
							filePath: encodeURI(filePath),
							// fileType: 'pdf',
							success: function(res) {
								uni.hideLoading();
							},
							fail: function(err) {
								uni.hideLoading();
								uni.showToast({
									title: '打开失败',
									duration: 1500,
									icon: 'none'
								});
							}
						});
					},
					fail: function(err) {
						console.log('下载失败原因', err);
						uni.hideLoading();
						uni.showModal({
							title: '您需要授权相册权限',
							success(res) {
								if (res.confirm) {
									uni.openSetting({
										success(res) {},
										fail(res) {
											console.log(res);
										}
									});
								}
							}
						});
					}
				});
				downloadTask.onProgressUpdate(res => {
					console.log('下载进度' + res.progress);
					this.schedule = res.progress
					// console.log('已经下载的数据长度' + res.totalBytesWritten);
					// console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				});
			},
			getData() {
				uni.showLoading({
					title: "正在获取当天数据..."
				})
				uni.request({
					url: "http://192.168.0.196:8088/report/list-self",
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					data: this.data,
					method: 'POST',
					success: (res) => {
						console.log(res)
						if(res.data.code==="200"){
							uni.hideLoading();
							const records = res.data.data.records
							this.total = res.data.total
							if(records[0].fileUrls.length!==0){
								const fileUrls = records[0].fileUrls
								fileUrls.forEach(item => {
									if (isImageType(item)) {
										this.imageUrls.push(item)
									} else if (isVideoType(item)) {
										this.videoUrls.push(item)
									} else {
										this.FileUrls.push(item)
									}
								})
							}
							let userId = records[0].shareUserId;
							if (userId && typeof userId === 'string') {
							  userId = userId.replace(/\[/g, ""); // 替换所有的左方括号
							  userId = userId.replace(/\]/g, ""); // 替换所有的右方括号
							  this.userIds = userId.split(","); // 假设此时userId是一个以逗号分隔的字符串
							} else {
							  
							}
							uni.request({
								url:"http://192.168.0.196:8088/report/shareReportToUser",
								data:this.userIds,
								header:{
									"satoken":uni.getStorageSync("satoken")
								},
								method:"POST",
								success: (res) => {
									if(res.data.code==="200"){
										this.userOnVos=res.data.data
										console.log(this.userOnVos)
									}else{
										console.log(res)
									}
								},
								fail: (err) => {
									console.log(err)
								}
							})
							this.allData = records
						}else{
							uni.hideLoading();
							console.log(res)
						}
					},
					fail: (fail) => {
						uni.hideLoading();
						console.log(fail)
					}
				});
				uni.hideLoading();
			},
		},
	}
</script>