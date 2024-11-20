<style lang="scss">
	.Layout {
		width: 100vw;
		border: 1px solid #b5b5b5;
		border-radius: 15rpx;
		box-shadow: 0 0 30rpx rgb(0, 0, 0, 0.35);

		.row {
			width: 100%;
			height: 100%;

			.text {
				margin: 18rpx;
				padding: 18rpx;
				display: inline-block;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 166rpx;
						box-shadow: 0 0 30rpx rgb(0, 0, 0, 0.05);
					}

					text {}
				}
			}
		}
	}

	swiper {
		height: 200px;
		width: 100vw;
		border: 1px solid #e2e2e2;

		swiper-item {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		swiper-item:nth-child(2n) {
			background-color: #ff0000;
		}
	}
</style>


<template>
	<swiper indicator-dots="true" autoplay="true" interval="2000" duration="1000" circular="true">
		<swiper-item>
			<image src="../../static/lb1.png"></image>
		</swiper-item>
		<swiper-item>
			<image src="../../static/lb2.png"></image>
		</swiper-item>
		<swiper-item>
			<image src="../../static/lb3.png"></image>
		</swiper-item>
	</swiper>
	<view class="warp" style="margin:0px 0px 20px 0px;">
		<uni-section title="最近常用" type="line">
			<view class="Layout">
				<view class="row">
					<view class="text" v-for="item in list" @click="changePage(item.URL,item.text)">
						<view class="item">
							<image :src="item.url" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-section>
	</view>
</template>


<script>
	export default {
		components: {},
		data() {
			return {
				list: [{
						url: '/static/main/mrdk.png',
						text: '每日打卡',
						badge: '0',
						URL: "/pages/punchIn/punchIn"
					},
					{
						url: '/static/main/gzsp.jpg',
						text: '工作审批',
						badge: '1',
						URL: "/pages/review/review"
					}, {
						url: '/static/main/rz.png',
						text: '日志记录',
						badge: '2',
						URL: "/pages/logDay/logDay"
					}
				],
				//后续用作审批流程
				spList: []
			}
		},
		onShow() {
			this.isLogin()
		},
		methods: {
			isLogin(){
				uni.request({
					url:"http://192.168.0.196:8088/user/isLogin",
					header:{
						'satoken':uni.getStorageSync("satoken")
					},
					success(res) {
						if(res.data.code==="200"){
							
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
			changePage(str1, str2) {
				uni.navigateTo({
					url: str1,
					success() {
						uni.showToast({
							icon: 'success',
							title: str2,
							duration: 1000
						})
					},
					fail() {
						uni.switchTab({
							url:str1,
							success() {
								uni.showToast({
									icon: 'success',
									title: str2,
									duration: 1000
								})
							},
							fail() {
								uni.showToast({
									icon: 'error',
									title: str2 + "待开发",
									duration: 1000
								})
							}
						})
						
					}
				})
			}
		}
	}
</script>