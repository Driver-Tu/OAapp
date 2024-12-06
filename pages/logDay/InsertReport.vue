<style lang="scss">
.container {
  padding: 20rpx;
}

.form {
  background-color: #fff;
  padding: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}

.scroll-view {
  border: 1px solid #e2e2e2;
  border-radius: 10rpx;
}

.char-count {
  font-size: 28rpx;
  color: #888;
}

.fileChoose {
  background-color: #f2f2f2;
  border-radius: 10rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20rpx;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
}

.image-preview, .video-preview {
  margin: 20rpx;
}

.submit {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}

.save-btn, .submit-btn {
  margin: 20rpx;
  border-radius: 10rpx;
  padding: 20rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #00b100;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
}
.userItem{
	display: inline-block;
	.item-image{
		width: 80rpx;
		height: 80rpx;
		margin:40rpx 20rpx;
	}
}
.insertApproval{
	margin: 20rpx;
	padding: 10rpx;
	border: 1rpx #b6b6b6 solid;
	&:active {
	  background-color: #dcdcdc; // 鼠标点击时的背景色
	  transform: scale(0.95); // 点击时的缩放效果，使按钮有按下的感觉
	}
}
</style>

<template>
	<view class="container">
		<uni-segmented-control :current="0" :values="items" style-type="text" active-color="#00b100"
			@clickItem="chengeStatus"/>
	</view>
	
	<!-- 基础用法，不包含校验规则 -->
	<uni-forms ref="baseForm" :modelValue="baseFormData" label-width="100%" label-position="top" class="form">
		<uni-forms-item label="日志标题" name="reportName" required>
			<uni-easyinput v-model="baseFormData.reportName" placeholder="请输入标题" />
		</uni-forms-item>
		<uni-forms-item label="今日工作内容及感悟" name="content" required>
			<scroll-view :scroll-y="true" class="scroll-view">
				<uni-easyinput type="textarea" style="min-height: 30vh;" v-model="baseFormData.content" :maxlength="-1"
					:inputBorder="false" placeholder="请输入今日感悟" :clearable="true" :autoHeight="true" />
			</scroll-view>
			<view v-if="baseFormData.content" class="char-count">
				<text>{{baseFormData.content.length}}/8000</text>
			</view>
		</uni-forms-item>
	</uni-forms>
	<uni-section title="选择查看人" type="circle">
		<view class="userItem" v-for="item in userList">
			<uni-tooltip class="item" :content="item.userName" placement="on" >
								<image class="item-image" v-if="isImageByExtension(item.userImage)" :src="item.userImage"></image>
								<image class="item-image" v-else-if="item.userImage===null" src="../../static/tx/default.png"></image>
								<image class="item-image" v-else src="../../static/tx/default.png"></image>
							</uni-tooltip>
		</view>
			<view class="approval" style="min-height: 100rpx;" >
				<uni-icons class="insertApproval" type="plusempty" size="60rpx" color="#b6b6b6" @click="changeSelectUserPage" style=""></uni-icons>
			</view>
	</uni-section>
	<uni-section title="选择附件" type="square">
		<uni-card>
			<view class="Layout">
				<view class="fileChoose" @click="selectImage()">
					<text>选择图片</text>
					<uni-icons type="image" size="46rpx" color="#00aaff"></uni-icons>
				</view>
				<view v-if="tempFilePaths" v-for="item in tempFilePaths" class="image-preview">
					<image :src="item.url" style="width: 200rpx; height: 200rpx; padding: 20rpx;"
						v-if="isImageByExtension(item.name)"></image>
				</view>
				<view class="fileChoose" @click="selectVideo()">
					<text>选择视频</text>
					<uni-icons type="image" size="46rpx" color="#00aaff"></uni-icons>
				</view>
				<view v-if="tempFilePaths" v-for="item in tempFilePaths" class="video-preview">
					<video :src="item.url" v-if="isVideoByExtension(item.url)" muted style="margin: 20rpx;"></video>
				</view>
			</view>
		</uni-card>
	</uni-section>
	<view class="submit">
		<button type="primary" class="save-btn">保存{{baseFormData.type}}</button>
		<button type="primary" class="submit-btn" @click="allData()">提交{{baseFormData.type}}</button>
	</view>
</template>

<script>
	export default {
		props: ['users'],
		data() {
			return {
				defaultImage: "https://mp-b8e53f5e-c503-4780-9859-ec2675b3d8cd.cdn.bspapp.com/unicloud/wenjian.png",
				tempFilePaths: [],
				filePaths:[],
				textNum: null,
				items: ['日报', '周报', '月报'],
				baseFormData: {
					reportName: null,
					type: "日报",
					content: null,
					filePath: [],
					userIDS:[1,3]
				},
				userList:[]
			}
		},
		onLoad(options) {
			if(options.users){
				const users=JSON.parse(options.users)
				console.log(users)
				this.userList=users
				console.log(this.userList)
				this.baseFormData.userIDS=users.map(item=>item.userId)
				console.log(this.baseFormData.userIDS)
			}
		},
		onShow() {
			
		},
		methods: {
			changeSelectUserPage(){
				uni.navigateTo({
					url:"SelectUser/SelectUser"
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
				this.filePaths=[]
				if(res.tempFiles){
					res.tempFilePaths.forEach(item=>{
						this.tempFilePaths.push({"url":item,"name":item})
						this.filePaths.push({"url":item,"name":item})
					})
				}else if(res.tempFilePath){
					this.tempFilePaths.push({"url":res.tempFilePath,"name":res.tempFilePath})
					this.filePaths.push({"url":res.tempFilePath,"name":res.tempFilePath})
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
							if(final.code==="200"){
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
			chengeStatus(e) {
				this.baseFormData.type = this.items[e.currentIndex]
			},
			async selectImage(e) {
				await uni.chooseImage({
					success: (res) => {
						this.uploadFile(res)
					}
				})
			},
			async selectVideo(e){
				console.log(e)
				await uni.chooseVideo({
					success: (res) => {
						this.uploadFile(res)
					}
				})
			},
			allData() {
				if((this.baseFormData.reportName!==null&&this.baseFormData.reportName!=="")&&(this.baseFormData.content!==null&&this.baseFormData.content!=="")){
					uni.request({
						url:"http://192.168.0.196:8088/report/addReport",
						method:'POST',
						header:{
							"satoken":uni.getStorageSync("satoken")
						},
						data:this.baseFormData,
						success: (res) => {
						
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