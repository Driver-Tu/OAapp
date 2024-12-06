<style lang="scss">
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
	<view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1:[
					{
						type:"auth-filled",
						text:"部门管理",
						url:"",
						right:"right"
					},{
						type:"cloud-upload-filled",
						text:"员工管理",
						url:"",
						right:"right"
					},{
						type:"calendar",
						text:"岗位管理",
						url:"",
						right:"right"
					},
					{
						type:"upload-filled",
						text:"日志管理",
						url:"",
						right:"right"
					},{
						type:"paperclip",
						text:"打卡管理",
						url:"",
						right:"right"
					}
				]
			}
		},
		methods: {
			changePage(str1,str2){
				uni.navigateTo({
					url:str1,
					success() {
							uni.showToast({
								icon:'success',
								title:str2,
								duration:1000
							})
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
		}
	}
</script>


