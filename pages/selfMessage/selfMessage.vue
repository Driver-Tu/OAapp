<style lang="scss">
body {
  background-image: url("../../static/selfImage/bj.jpg");
  margin: 0; // 确保页面没有默认边距
  padding: 0; // 确保页面没有默认内边距
}

.card {
  background-color: #fff; // 卡片背景颜色
  border-radius: 10px; // 卡片圆角
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 卡片阴影
  margin: 10px;
  padding: 20px; // 卡片内边距
  display: flex; // 使用flex布局
  flex-direction: column; // 垂直排列子元素
margin-top: 80rpx;
}

.userLayout {
  display: flex;
  align-items: center;
  .avatar {
    flex-shrink: 0; // 防止头像在小屏幕上被压缩
    margin-right: 20px;

    .image {
      width: 130rpx; // 调整头像大小
      height: 130rpx; // 调整头像大小
      border-radius: 20rpx; // 圆形头像
      border: 1px solid #aaa;
      transition: transform 0.3s ease; // 平滑过渡效果
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 添加阴影

      &:hover {
        transform: scale(1.05); // 鼠标悬停时放大
      }
    }
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .userName {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .updateButton {
    text-align: right;
    cursor: pointer; // 鼠标悬停时显示指针样式
    color: #bfbfbf;
    margin-left: auto; // 将编辑按钮推向末尾

    .uni-icons {
      padding: 5rpx;
      border: #e6e6e6 solid 1rpx;
      border-radius: 4rpx; // 可以添加一些圆角来使按钮看起来更现代
      transition: background-color 0.3s, transform 0.3s; // 过渡效果，用于背景色和变换

      &:hover {
        background-color: #eaeaea; // 鼠标悬停时的背景色
      }

      &:active {
        background-color: #dcdcdc; // 鼠标点击时的背景色
        transform: scale(0.95); // 点击时的缩放效果，使按钮有按下的感觉
      }
    }
  }
}

.position {
	 // 与userLayout的间距
	 margin-top: 10rpx 0rpx; // 如果需要的话，可以居中显示position
	 color: #959595;
}
.selfCard{
	.uni-icons{
		&:active{
			background-color: #dcdcdc;
		}
	}
}
.row {
  display: flex;
  flex-direction: column; // 子元素垂直排列
  background-color: #fff; // 背景颜色
  border-radius: 5rpx; // 圆角边框
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 阴影效果
  padding: 5px 0; // 根据需要添加内边距
  margin: 20rpx;
  .item {
    display: flex;
    align-items: center; // 子元素垂直居中
    padding: 10px 20px; // 项目内边距
    border-bottom: 1px solid #f0f0f0; // 项目间隔线
	&:hover {
	  background-color: #d6d6d6; // 鼠标悬停时的背景色
	}
	
	&:active {
	  background-color: #dcdcdc; // 鼠标点击时的背景色
	  transform: scale(0.95); // 点击时的缩放效果，使按钮有按下的感觉
	}
    &:last-child {
      border-bottom: none; // 最后一个项目不需要底部边框
    }
	
    .left {
      display: flex;
      align-items: center; // 图片和文字垂直居中
      margin-right: 20px; // 图片和右侧内容之间的间距

      image {
		border-radius: 10rpx;
        width: 30px; // 图标大小
        height: 30px; // 图标大小
        margin-right: 10px; // 图片和文字之间的间距
      }

      text {
        font-size: 16px; // 文本大小
        color: #333; // 文本颜色
      }
    }

    .right {
      flex-grow: 1;
      text-align: right; // 右侧内容右对齐
      color: #666; // 右侧文本颜色
      font-size: 14px; // 右侧文本大小
    }
  }
}
.review {
	margin: 20rpx;
  display: flex;
  flex-wrap: wrap; // 允许子元素在需要时换行
  justify-content: space-between; // 子元素在主轴上均匀分布
  background-color: #fff; // 背景颜色
  border-radius: 10px; // 圆角边框
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 阴影效果
  padding: 20px; // 内边距
  color: #333; // 文本颜色

  uni-section {
    width: 100%; // 标题占满整行
    margin-bottom: 15px; // 标题与其他内容的间距
  }

  .item {
    display: flex;
    flex-direction: column; // 子元素垂直排列
    align-items: center; // 子元素垂直居中
    padding: 10px; // 项目内边距
    border-radius: 5px; // 圆角边框
    background-color: #e0f7fa; // 默认背景颜色
    width: calc(25% - 10px); // 每个项目占据的宽度，减去间距

    &:nth-child(1) {
      background-color: #e0f7fa; // 第一个项目浅蓝色
    }
    &:nth-child(2) {
      background-color: #fff3e0; // 第二个项目浅橙色
    }
    &:nth-child(3) {
      background-color: #e8f5e9; // 第三个项目浅绿色
    }

    text {
      font-size: 16px; // 子元素字体大小
      &:first-child {
        margin-bottom: 5px; // 第一个text和第二个text之间的间距
        font-weight: bold; // 加粗第一个text
      }
      &:last-child {
        font-size: 14px; // 第二个text的字体大小
        color: #666; // 第二个text的颜色
      }
    }
  }
}
.head{
	width: 100%; 
	height: var(--status-bar-height);
}
</style>

<template>
<view class="layout">
	<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" :border="false"
	 status-bar color="#000" title="个人中心"/>
	 
	<view class="card">
	  <view class="userLayout">
	    <view class="avatar">
	      <image class="image" v-if="userMessage.avatar!==null" :src="userMessage.avatar" @click="imagePreview(userMessage.avatar)"></image>
	      <image class="image" v-else src="../../static/selfImage/self.png" @click="imagePreview(userMessage.avatar)"></image>
	    </view>
	    <view class="userInfo">
	      <view class="userName">
			{{ userMessage.userName }}
			</view>
			<view class="position">
						<text style="font-size: 30rpx;color: #000000;font-weight: bold;"></text><uni-icons type="auth-filled" size="30rpx" color="#00aaff">{{ position }}</uni-icons>
					</view>
	    </view>
	    <view class="updateButton">
	      <uni-icons type="compose" size="15px" @click="changeSelfPage" style="color:#959595;border-radius: 10rpx;">编辑资料</uni-icons>
	    </view>
	  </view>
	  <!-- position元素在userLayout下方，单独占据一行 -->
	  
	</view>
</view>
	  <!-- <view class="review">
	  	  <view class="item">
	  		  <text>待我处理</text>
	  		  <text>0</text>
	  	  </view>
	  	  <view class="item">
	  	  		  <text>我创建的</text>
	  	  		  <text>0</text>
	  	  </view>
	  	  <view class="item">
	  	  		  <text>我已处理</text>
	  	  		  <text>0</text>
	  	  </view>
	  </view> -->
  <view class="row">
	  <view class="item" @click="selectDataPage">
		  <view class="left">
			  <image src="../../static/selfImage/grsj.png"></image>
			  <text>工作记录</text>
			  </view>
		  <view class="right">
			  <uni-icons type="right" size="30rpx"></uni-icons>
		  </view>
	  </view>
  </view>
  <!-- <view class="row" v-if="admin===true">
  	  <view class="item" @click="changeAdmin">
  	  		  <view class="left">
  				  <image src="../../static/selfImage/gly.png"></image>
  				  <text>管理员系统</text>
  				  </view>
  	  		  <view class="right">
  				  <uni-icons type="right" size="30rpx"></uni-icons>
  			  </view>
  	  </view>
  </view> -->
  <view class="row">
  	  <view class="item" @click="changeSetUp">
  	  		  <view class="left">
  				  <image src="../../static/selfImage/sz.png"></image>
  				  <text>设置</text>
  				  </view>
  	  		  <view class="right">
				  <uni-icons type="right" size="30rpx"></uni-icons>
			  </view>
  	  </view>
  </view>
</template>

<script>
export default{
	data(){
		return{
			list2:[
				{
					type:"auth-filled",
					text:"",
					url:"/pages/selfMessage/adminPageController/adminPageController",
					right:"right"
				}
			],
			position:null,
			admin:null,
			userMessage:{
				userName:null,
				departmentName:null,
				userName:null,
				departmentName:null,
				empNum:null,
				telephone:null,
				email:null,
				status:null,
				ctTime:null,
				avatar:null
			},
		}
	},
	onShow() {
		this.isLogin()
		this.getIsAdmin()
		this.getSelfPosition()
	},
	methods:{
		changeAdmin(){
			uni.navigateTo({
				url:"/pages/selfMessage/adminPageController/adminPageController"
			})
		},
		changeSetUp(){
			uni.navigateTo({
				url:"/pages/selfMessage/SetUpPage/SetUpPage"
			})
		},
		selectDataPage(){
			uni.navigateTo({
				url:"/pages/selfMessage/selfDataPage/selfDataPage"
			})
		},
		imagePreview(i) {
			uni.previewImage({
				urls: [i]
			})
		},
		changeSelfPage(){
			uni.navigateTo({
				url:"/pages/selfMessage/self"
			})
		},
		changeSelfUpdatePage(){
			uni.navigateTo({
				url:"updateSelf/updateSelf"
			})
		},
		//获取岗位信息
		getSelfPosition(){
			uni.request({
				url:"http://8.129.26.229:8088/position/getSelfPosition",
				method:"GET",
				header:{
					"satoken":uni.getStorageSync("satoken")
				},
				success: (res) => {
					this.position=res.data.data.name
		},
		})
		},
		isLogin(){
			uni.request({
				url:"http://8.129.26.229:8088/user/isLogin",
				header:{
					'satoken':uni.getStorageSync("satoken")
				},
				success:(res)=> {
					if(res.data.code==="200"){
						this.getSelfMessage()
					}else{
						uni.showModal({
							content:"登录已失效",
							title:"提示",
							success() {
								uni.redirectTo({
									url:'/pages/index/index'
								})
							}
						})
						
					}
				}
			})
		},
		getIsAdmin(){
			uni.request({
				url:"http://8.129.26.229:8088/user/isAdmin",
				method:"GET",
				header:{
					"satoken":uni.getStorageSync("satoken")
				},
				success: (res) => {
					this.admin=res.data.data
				},
				fail: (error) => {
					console.log(error)
				}
			})
		},
		getSelfMessage(){
			if(uni.getStorageSync("satoken")){
				uni.request({
					url:"http://8.129.26.229:8088/user/info",
					method:'GET',
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					success:(res)=>{
					if(res.data.code==="200"){
					this.userMessage.userName=res.data.data.userName
					this.userMessage.departmentName=res.data.data.departmentName
					this.userMessage.email=res.data.data.email
					this.userMessage.telephone=res.data.data.telephone
					this.userMessage.status=res.data.data.status
					this.userMessage.empNum=res.data.data.empNum
					var date =new Date(res.data.data.ctTime)
					if(res.data.data.userImage!==null){
						this.userMessage.avatar=res.data.data.userImage
					}else{
						this.userMessage.avatar="../../static/tx/default.png"
					}
					this.userMessage.ctTime=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'fail',
							duration:1000,
							mask:true
						})
					}
				},
				fail:(error)=>{
					uni.showToast({
						title:"页面错误!!!",
						icon:'error',
						duration:5000,
						mask:true,
					}),
					uni.navigateTo({
						url:"/pages/index/index"
					})
				}
				})
			}else{
				uni.navigateTo({
					url:"/pages/index/index"
				})
			}
		},
		},
}
</script>

