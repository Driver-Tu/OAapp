<style lang="scss">
	.on{
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
				margin-left: 300rpx;
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
					   font-size: 30rpx;
				   }
				   .right{
					   color: #959595;
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
			<view class="item">
				<view class="left">
					<text style="font-weight: bold;">{{userMessage.userName}}</text>
					<text style="font-size: 28rpx; color: #00b959;">{{userMessage.roleName}}</text>
					<text style="font-size: 20rpx; color: #b5b5b5;">工号:{{userMessage.empNum}}</text>
				</view>
				<view class="right">
					<image src="/static/selfImage/self.png"></image>
				</view>
			</view>
			<view class="item">
				<view class="message">
						<view style="font-weight: bold;">基本信息</view>
						<view style="font-size: 20rpx; color: #b5b5b5;">记录该员工基本信息</view>
					</view>
					<view class="message">
						<view class="left">部门名称</view>
						<view class="right">{{userMessage.departmentName}}</view>
					</view>
					<view class="message">
						<view class="left">电子邮箱</view>
						<view class="right">{{userMessage.email}}</view>
					</view>
					<view class="message">
						<view class="left">联系方式</view>
						<view class="right">{{userMessage.telephone}}</view>
					</view>
					<view class="message">
						<view class="left">入职时间</view>
						<view class="right">{{userMessage.ctTime}}</view>
					</view>
			</view>
			<view class="item">
					<view class="message">
							<view style="font-weight: bold;">状态</view>
							<view style="font-size: 20rpx; color: #b5b5b5;">记录该员工状态信息</view>
					</view>
					<view class="message">
						<view class="left" style="background-color: #00ff00;border: #001100 1px solid;padding: 8rpx;color: aliceblue;">{{userMessage.status}}</view>
					</view>
			</view>
		</view>
	</view>
	<view>
		<uni-drawer ref="showRight" mode="right" :mask-click="false">
					<scroll-view style="height: 100%;" scroll-y="true">
						<button @click="closeDrawer" type="primary" style="background-color: #ff0000; width: 30vw; margin:10rpx;">关闭修改</button>
						<text style="margin: 5rpx;padding: 5rpx;">修改姓名</text>
						<input placeholder="请输入" style="border-bottom: 1px solid #001100;margin: 5rpx;padding: 5rpx;"></input>
						<text style="margin: 5rpx;padding: 5rpx;">修改部门</text>
						<input placeholder="请输入" style="border-bottom: 1px solid #001100;margin: 5rpx;padding: 5rpx;"></input>
						<text style="margin: 5rpx;padding: 5rpx;">修改邮箱</text>
						<input placeholder="请输入" style="border-bottom: 1px solid #001100;margin: 5rpx;padding: 5rpx;"></input>
					<button @click="closeDrawer" type="primary" style="background-color: #00aaff; width: 30vw; margin:10rpx;">提交修改</button>
					</scroll-view>
				</uni-drawer>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userMessage:{
					departmentName:"",
					userName:null,
					departmentName:null,
					empNum:null,
					roleName:null,
					telephone:null,
					email:null,
					status:null,
					ctTime:null
				}
			}
		},
		methods:{
			showDrawer() {
							this.$refs.showRight.open();
						},
			closeDrawer() {
							this.$refs.showRight.close();
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
						console.log(res)
						if(res.data.code==="200"){
						this.userMessage.userName=res.data.data.userName
						this.userMessage.departmentName=res.data.data.departmentName
						this.userMessage.email=res.data.data.email
						this.userMessage.telephone=res.data.data.telephone
						this.userMessage.status=res.data.data.status===1?"在线":"请假"
						this.userMessage.empNum=res.data.data.empNum
						this.userMessage.roleName=res.data.data.roleName
						var date =new Date(res.data.data.ctTime)
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
		onShow() {
			this.getSelfMessage()
		}
	}
</script>

