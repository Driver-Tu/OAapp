<style lang="scss">
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
			font-size: 38rpx;
		}
	}
	.layout{
		width: 100vw;
		height: 100vh;
		background-color: #ececec;
		.row{
			width: 100%;
			height: 100%;
		   .item{
			   font-size:44rpx;
			   padding: 10rpx;
			   margin: 10rpx;
			   border-radius: 20rpx;
			   background-color: #f8f8f8;
			   .left{
				display: inline-block;
				   text{
					   display: block;
					   padding: 15rpx;
				   }
			   }
			   .right{
				width: 110rpx;
				height: 110rpx;
				display: inline-block;
				margin-left: 320rpx;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 100rpx;
				}
			   }
			   .message{
				   
				   padding: 10rpx;
				   view{
					   padding: 3rpx;
				   }
				   .left{
					   margin:0px 20rpx;
					   font-size: 30rpx;
					   font-weight: 600;
				   }
				   .right2{
					   margin:10rpx 40rpx;
					   color: #636363;
					   font-size: 21rpx;
				   }
			   }
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
			个人信息
		</view>
		<view class="right">
			<text @click="showDrawer" type="primary">编辑</text>
		</view>
	</view>
	<view class="layout">
		<view class="row" >
			<view class="item" style="background-color: #fffabc;">
				<view class="left">
					<text style="font-weight: bold;">{{userMessage.userName}} {{userMessage.sex}}</text>
					<text style="font-size: 28rpx; color: #00b959;">{{userMessage.roleName}}</text>
					<text style="font-size: 20rpx; color: #b5b5b5;">工号:{{userMessage.empNum}}</text>
				</view>
				<view class="right">
					<image :src="userMessage.userImage" @click="imagePreview(userMessage.userImage)"></image>
				</view>
			</view>
			<view class="item" style="background-color: #aaffff;">
				<view class="message">
						<view style="font-weight: bold;">基本信息</view>
						<view style="font-size: 20rpx; color: #636363;">提示：记录该员工基本信息</view>
					</view>
					<view class="message">
						<view class="left">部门名称</view>
						<view class="right2">{{userMessage.departmentName}}</view>
					</view>
					<view class="message">
						<view class="left">电子邮箱</view>
						<view class="right2">{{userMessage.email}}</view>
					</view>
					<view class="message">
						<view class="left">联系方式</view>
						<view class="right2">{{userMessage.telephone}}</view>
					</view>
					<view class="message">
						<view class="left">入职时间</view>
						<view class="right2">{{userMessage.ctTime}}</view>
					</view>
					<view class="message">
						<view class="left">出生日期</view>
						<view class="right2">{{userMessage.birth}}</view>
					</view>
			</view>
			<view class="item" style="background-color: #a6ffca;">
					<view class="message">
							<view style="font-weight: bold;">状态</view>
							<view style="font-size: 20rpx; color: #636363;">记录该员工状态信息</view>
					</view>
					<view class="message">
						<view class="left" style="background-color: #00ff00;border: #001100 1px solid;padding: 8rpx;color: aliceblue;">{{userMessage.status}}</view>
					</view>
			</view>
		</view>
	</view>
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
				uni.switchTab({
					url:'/pages/selfMessage/selfMessage'
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
			this.getSelfMessage()
		}
	}
</script>

