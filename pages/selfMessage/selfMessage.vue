<style lang="scss">
.userLayout{
	background-color: #d0d0d0;
	.userInfo{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.empNum{
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.telephone{
			font-size: 28rpx;
			color: #aaa;
		}
	}
}
.section{
	width: 690rpx;
	margin: 50rpx auto;
	border: 1px solid #aaa;
	border-radius: 10rpx;
	box-shadow: 0 0 30rpx rgb(0, 0,0,0.05);
	.list{
		.row{
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom:1px solid #d0d0d0;
			&:last-child{border-bottom: 0;}
			.left{
				display: flex;
				align-items: center;
				.text{
					padding-left:20rpx;
					color: #666;
				}
			}
			.right{
				display: flex;
				align-items: center;
				.text{
					font-size: 28rpx;
					color: #aaa;
				}
			}
		}
	}
}
</style>

<template>
	<view class="userLayout">
		<view class="userInfo">
			<view class="avatar">
				<image class="image" src="../../static/selfImage/self.png"></image>
			</view>
			<view class="empNum">{{userMessage.empNum}}</view>
			<view class="telephone">{{userMessage.userName}}</view>
		</view>
	</view>
	<view class="section">
		<view class="list">
			<view class="row" v-for="item in list1" @click="changePage(item.url,item.text)">
				<view class="left">
					<uni-icons :type="item.type" size="20" ></uni-icons>
					<view class="text">{{item.text}}</view>
				</view>
				<view class="right">
					<view class="text"></view>
					<uni-icons :type="item.right" size="20"></uni-icons>
				</view>
			</view>
		</view>
	</view>
	<view class="section">
		<view class="list">
			<view class="row" v-for="item in list3" @click="changePage(item.url,item.text)">
				<view class="left">
					<uni-icons :type="item.type" size="20"></uni-icons>
					<view class="text">{{item.text}}</view>
				</view>
				<view class="right">
					<view class="text"></view>
					<uni-icons :type="item.right" size="20"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			list1:[
				{
					type:"auth-filled",
					text:"个人信息",
					url:"/pages/selfMessage/self",
					right:"right"
				},{
					type:"cloud-upload-filled",
					text:"个人日志",
					url:"",
					right:"right"
				},{
					type:"calendar",
					text:"打卡信息",
					url:"/pages/selfMessage/punchMessage",
					right:"right"
				},
				{
					type:"upload-filled",
					text:"流程审批",
					url:"",
					right:"right"
				},{
					type:"paperclip",
					text:"工作记录",
					url:"",
					right:"right"
				}
			],
			list3:[
				{
					type:"close",
					text:"应用bug汇报",
					url:"",
					right:"paperplane"
				},{
					type:"home",
					text:"退出登录",
					url:"/pages/index/index",
					right:"paperplane-filled"
				}
			],
			userMessage:{
				userName:"",
				departmentName:"",
				userName:null,
				departmentName:null,
				empNum:null,
				telephone:null,
				email:null,
				status:null,
				ctTime:null
			},
		}
	},
	onShow() {
		this.getSelfMessage()
	},
	methods:{
		changePage(str1,str2){
			uni.navigateTo({
				url:str1,
				success() {
					if(str2==="退出登录"){
						uni.request({
							url:"http://192.168.0.196:8088/user/logout",
							header:{
								"satoken":uni.getStorageSync("satoken")
							},
							method:'GET',
							success:(res)=>{
								if(res.data.code==="200"){
									uni.setStorageSync("satoken","")
									uni.showToast({
										title:"退出成功",
										icon:'success',
										duration:1000,
										mask:true,
									})
								}else{
									uni.showToast({
										title:res.data.msg,
										icon:'error',
										duration:1000,
										mask:true,
									})
									console.log(uni.getStorageSync("satoken"))
								}
							},
							fail:(error)=>{
								console.log(error)
								uni.showToast({
									title:"页面错误!!!",
									icon:'error',
									duration:5000,
									mask:true,
								})
							}
						});
						uni.showToast({
							icon:'success',
							title:"退出成功",
							duration:1000
						})
					}else{
						uni.showToast({
							icon:'success',
							title:str2,
							duration:1000
						})
					}
				},
				fail() {
					uni.showToast({
						icon:'fail',
						title:"页面待开发!",
						duration:1000
					})
				}
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
					console.log(res)
					if(res.data.code==="200"){
					this.userMessage.userName=res.data.data.userName
					this.userMessage.departmentName=res.data.data.departmentName
					this.userMessage.email=res.data.data.email
					this.userMessage.telephone=res.data.data.telephone
					this.userMessage.status=res.data.data.status
					this.userMessage.empNum=res.data.data.empNum
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
}
</script>

