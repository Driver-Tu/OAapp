<style lang="scss">
	body{
		background-color: #f8f8f8;
	}
	.on{
		margin-top: 50rpx;
		width: 100vw;
		display: flex;
		left: 0;
		.left{
			width: 10%;
		}
		.right{
			width: 14%;
			text-align: center;
			padding: 12rpx;
			font-size: 30rpx;
			color: #55aaff;
		}
		.center{
			width: 76%;
			text-align: center;
			font-weight: bold;
			padding: 10rpx;
			font-size: 30rpx;
		}
	}
	.back{
		width: 100vw;
		height: 25vh;
		background-image: url("../../static/selfImage/selfBack.png");
		background-size: cover;
	}
.row2 {
  display: flex;
  flex-direction: column; // 子元素垂直排列
  background-color: #fff; // 背景颜色
  border-radius: 10px; // 圆角边框
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 阴影效果
  padding: 10px 0; // 根据需要添加内边距
  margin: 20rpx;
  .item {
    display: flex;
    align-items: center; // 子元素垂直居中
    padding: 10px 20px; // 项目内边距
    border-bottom: 1px solid #f0f0f0; // 项目间隔线
	
    &:last-child {
      border-bottom: none; // 最后一个项目不需要底部边框
    }

    .left {
      display: flex;
      align-items: center; // 图片和文字垂直居中
      margin-right: 20px; // 图片和右侧内容之间的间距
	  font-weight: bold;

      text {
        font-size: 16px; // 文本大小
        color: #333; // 文本颜色
      }
    }

    .right {
		image{
			width: 40px;
			height: 40px;
		}
      flex-grow: 1;
      text-align: right; // 右侧内容右对齐
      color: #666; // 右侧文本颜色
      font-size: 14px; // 右侧文本大小
    }
  }
}
</style>

<template>
	<view class="on">
		<view class="left" @click="changePage1">
			<uni-icons type="arrow-left" size="36"></uni-icons>
		</view>
		<view class="center">
			个人资料
		</view>
		<view class="right">
			<text @click="showDrawer" type="primary">编辑</text>
		</view>
	</view>
	<scroll-view scroll-y="true" direction="vertical" style="height: 100vh;">
		<view class="back">
		</view>
		<view class="row2">
			<view class="item">
							  <view class="left">
								  <text>头像</text>
								  </view>
							  <view class="right">
								  <image v-if="userMessage.userImage!==null" :src="userMessage.userImage" @click="imagePreview(userMessage.userImage)"></image>
								  <image v-if="userMessage.userImage===null" src="../../static/selfImage/self.png"></image>
							  </view>
			</view>
			<view class="item">
							  <view class="left">
								  <text>昵称</text>
								  </view>
							  <view class="right">
								  {{userMessage.userName}}
								  <uni-icons type="right"></uni-icons>
							  </view>
			</view>
			<view class="item">
							  <view class="left">
								  <text>工号</text>
								  </view>
							  <view class="right">
								  {{userMessage.empNum}}
							  </view>
			</view>
			<view class="item">
							  <view class="left">
								  <text>性别</text>
								  </view>
							  <view class="right">
								  {{userMessage.sex}}
							  </view>
			</view>
			<view class="item">
							  <view class="left">
								  <text>电子邮箱</text>
								  </view>
							  <view class="right">
								  {{userMessage.email}}
								  <uni-icons type="right"></uni-icons>
							  </view>
			</view>
			<view class="item">
							  <view class="left">
								  <text>联系方式</text>
								  </view>
							  <view class="right">
								  {{userMessage.telephone}}
								  <uni-icons type="right"></uni-icons>
							  </view>
			</view>
			</view>
		<view class="row2">
			<view class="item">
							  <view class="left">
								  <text>岗位名称</text>
								  </view>
							  <view class="right">
								  {{position}}
							  </view>
			</view>
			  <view class="item">
			  				  <view class="left">
			  					  <text>部门名称</text>
			  					  </view>
			  				  <view class="right">
			  					  {{userMessage.departmentName}}
			  				  </view>
			  </view>
			  
			  <view class="item">
			  				  <view class="left">
			  					  <text>入职时间</text>
			  					  </view>
			  				  <view class="right">
			  					 {{userMessage.ctTime}}
			  				  </view>
			  </view>
			  <view class="item">
			  				  <view class="left">
			  					  <text>出生日期</text>
			  					  </view>
			  				  <view class="right">
			  					  {{userMessage.birth}}
			  				  </view>
			  </view>
		</view>
		<view class="row2">
			  <view class="item">
			  				  <view class="left">
			  					  <text>状态</text>
			  					  </view>
			  				  <view class="right" >
								  <text style="border: 1px #00ff7f solid;color: #00ff7f;">{{userMessage.status}}</text>
			  				  </view>
			  </view>
			  </view>
	</scroll-view>
</template>

<script>
	function validateInput(inputValue) {
	    // 手机号正则表达式
	    const phoneRegex = /^1[3-9]\d{9}$/;
	    // QQ邮箱正则表达式
	    const qqEmailRegex = /^[1-9]\d{4,11}@qq\.com$/;
	
	    // 判断是否为手机号
	    if (phoneRegex.test(inputValue.telephone)&&qqEmailRegex.test(inputValue.email)) {
	        return true;
	    }
		    // 如果都不是，则返回错误信息
	    return "输入的格式不正确，请输入正确的手机号或QQ邮箱";
	}
	export default{
		data(){
			return{
				position:null,
				userMessage:{
					departmentName:null,
					userName:null,
					userImage:null,
					departmentName:null,
					empNum:null,
					roleName:null,
					telephone:null,
					email:null,
					status:null,
					ctTime:null,
					sex:null,
					birth:null
				}
			}
		},
		methods:{
			//获取岗位信息
			getSelfPosition(){
				uni.request({
					url:"http://192.168.0.196:8088/position/getSelfPosition",
					method:"GET",
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					success: (res) => {
						this.position=res.data.data.name
			},
			})
			},
			updateImage(){
				
			},
			imagePreview(i) {
				uni.previewImage({
					urls: [i]
				})
			},
			showDrawer() {
							uni.navigateTo({
								url:"/pages/selfMessage/updateSelf/updateSelf"
							});
						},
			changePage1(){
				uni.navigateBack({
					delta:1
				})
			}
			,
			getSelfMessage(){
				if(uni.getStorageSync("satoken")){
					uni.request({ 
						url:"http://192.168.0.196:8088/user/info",
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
						this.userMessage.status=res.data.data.status===1?"在线":"请假"
						this.userMessage.empNum=res.data.data.empNum
						this.userMessage.roleName=res.data.data.roleName
						var currentDate=new Date();
						var date =new Date(res.data.data.ctTime)
						const timeDifference=Math.abs(date-currentDate)
						this.userMessage.ctTime=Math.ceil(timeDifference/(1000*60*60*24))+"天"
						this.userMessage.sex=res.data.data.sex==="1"?"男":"女"
						this.userMessage.birth=res.data.data.birth
						this.userMessage.userImage=res.data.data.userImage
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
		onShow() {
			this.getSelfMessage();
			this.getSelfPosition();
		}
	}
</script>

