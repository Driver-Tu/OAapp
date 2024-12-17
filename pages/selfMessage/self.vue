<style lang="scss">
	body{
		background-image: url("../../static/selfImage/msbj.jpg");
		margin: 0;
		padding: 0;
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
	<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" :border="false"
	 status-bar color="#00000" right-text="编辑" @click-right="showDrawer" title="个人资料" left-icon="left" @clickLeft="back"/>
	<scroll-view scroll-y="true" direction="vertical" style="height: 100vh;">
		<view class="row2" style="margin-top: 120rpx;">
			<view class="item">
							  <view class="left">
								  <text>头像</text>
								  </view>
							  <view class="right">
								  <image v-if="userMessage.userImage!==null" :src="userMessage.userImage" @click="imagePreview(userMessage.userImage)"></image>
								  <image v-if="userMessage.userImage===null" src="../../static/selfImage/self.png"></image>
							  </view>
			</view>
			<view class="item" @click="upName()">
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
			<view class="item" @click="upEmail()">
							  <view class="left">
								  <text>电子邮箱</text>
								  </view>
							  <view class="right">
								  {{userMessage.email}}
								  <uni-icons type="right"></uni-icons>
							  </view>
			</view>
			<view class="item" @click="upTelephone()">
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
		if(inputValue.telephone===null&&inputValue.email===null&&inputValue.userName===null){
			return "请输入要修改的数据s"
		}
			// 判断是否为手机号
		if(!phoneRegex.test(inputValue.telephone)&&inputValue.telephone!==null){
			return "手机号格式错误"
		}
		if (!qqEmailRegex.test(inputValue.email)&&inputValue.email!==null) {
			return "QQ邮箱格式不正确"
		}
		// 如果都不是，则返回正确信息
	    return "数据正确";
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
				},
				userInfo:{
					telephone:null,
					email:null,
					userName:null
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
			upName(){
				uni.showModal({
					editable:true,
					title:"请输入新呢称",
					success: (res) => {
						if(res.confirm){
							this.userInfo.userName=res.content
							this.updateSelfMessage()
						}
					}
				})
			},
			upEmail(){
				uni.showModal({
					editable:true,
					title:"请输入新的邮箱号码",
					success: (res) => {
						if(res.confirm){
							this.userInfo.email=res.content
							this.updateSelfMessage()
						}
					}
				})
			},
			upTelephone(){
				uni.showModal({
					editable:true,
					title:"请输入新的电话号码",
					success: (res) => {
						if(res.confirm){
							this.userInfo.telephone=res.content
							this.updateSelfMessage()
						}
					}
				})
			},
			updateSelfMessage(){
				if(validateInput(this.userInfo)==="数据正确"){
					uni.request({
						url:"http://192.168.0.196:8088/user/updateSelfUserInfo",
						method:'POST',
						header:{
							"satoken":uni.getStorageSync("satoken")
						},
						data:this.userInfo,
						success:(res)=> {
							uni.showModal({
								title:"提示",
								content:res.data.msg,
								showCancel:false,
								success:(res)=>{
									if(res.confirm){
										this.getSelfMessage()
									}
								}
							})
						},
						fail: (error) => {
							console.log(error)
						}
					})
				}else{
					uni.showModal({
						title:"警告",
						content:validateInput(this.userInfo)
					})
				}
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
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
						console.log(this.userMessage)
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

