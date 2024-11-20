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
			color: #ffe30f;
			padding: 10rpx;
		}
	}
	
</style>

<template>
	<view v-for="item in allData">
		<uni-card :title="item.reportName" :sub-title="item.reportDate" :extra="item.userName+'的'+item.type" 
			:thumbnail="userImage">
			<view class="content">{{item.content}}</view>
			<view class="imageDom">
				<view style="" class="title">图片<uni-icons type="image" size="40rpx" color="#00aaff"></uni-icons></view>
				<view class="image" v-for="i in imageUrls" style="display: inline-block;">
					<image :src="i" style="width: 120rpx;height: 120rpx; margin: 20rpx;" @click="imagePreview(i)" @error="changeSrc">
					</image>
				</view>
			</view>
			<view class="videoDom">
				<view style="" class="title">视频<uni-icons type="paperclip" size="40rpx" color="#00aaff"></uni-icons>
				</view>
				<view class="video" v-for="i in videoUrls" style="display: inline-block;">
					<video :src="i" muted @click="vedioPreview(i)"></video>
				</view>
			</view>
			<view class="fileDom">
				<view style="" class="title">文件<uni-icons type="paperplane" size="40rpx" color="#00aaff"></uni-icons>
				</view>
				<view class="video" v-for="i in FileUrls" style="display: inline-block;">
					<view class="fileName"
						style="padding: 30rpx 70rpx;margin: 10rpx; font-size: 50rpx; background-color: #00aaff;color: #ffffff;border-radius: 20rpx;"
						@click="filePreview(i)">文件</view>
				</view>
			</view>
			<view class="gongNenMain">
				<view class="gongNen"><uni-icons type="undo" size="30" color=""  ></uni-icons>
				</view>
				<view class="gongNen"><uni-icons type="trash" size="30" color="" @click="deleteReport"></uni-icons>
				</view>
			</view>
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
				allData: [],
				schedule: 0,
				userImage:"../../static/tx/default.png",
			}
		},
		onLoad(options) {
			if (options.reportId) {
				this.data.data.reportId = JSON.parse(decodeURIComponent(options.reportId))
			}
			this.getData()
		},
		methods: {
			imagePreview(i) {
				uni.previewImage({
					urls: [i]
				})
			},
			vedioPreview(i) {
				uni.previewMedia({
					urls: [i]
				})
			},
			deleteReport(){
				uni.request({
					url:"http://192.168.0.196:8088/report/deleteReports",
					data:[this.data.data.reportId],
					method:'DELETE',
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					success: (res) => {
						uni.redirectTo({
							url:"/pages/logDay/SelectReport",
							success:(data) => {
								if(res.data.code==="200"){
									uni.showModal({
											title:"恭喜",
											content:"删除成功",
											confirmColor:"#ffe30f"
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
						console.log(res)
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
						console.log('下载的res', res);
						var filePath = res.tempFilePath; // 临时文件存储路径
						//  文件打开文件预览
						uni.openDocument({
							filePath: encodeURI(filePath),
							// fileType: 'pdf',
							success: function(res) {
								uni.hideLoading();
								console.log('打开文档成功');
							},
							fail: function(err) {
								uni.hideLoading();
								uni.showToast({
									title: '打开失败',
									duration: 1500,
									icon: 'none'
								});
								console.log('打开失败');
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
						if(res.data.code==="200"){
							uni.hideLoading();
							const records = res.data.data.records
							this.total = res.data.total
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