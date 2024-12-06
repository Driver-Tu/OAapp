<style lang="scss">
	body{
		background-color: #eeeeee;
	}
	.warp{
		margin: 10rpx;
		border: #eeeeee solid 1rpx;
		border-radius: 10rpx;
		box-shadow: 5rpx 5rpx 3rpx #e2e2e2;
		background-color: #ffffff;
		.Layout{
			width: 100%;
			.row{
				width: 20%;
				display:inline-block;
				 margin: 10rpx;
				 padding: 10rpx;
				.item{
					width: 100%;
					align-items: center;
					text-align: center;
					image{
						width: 80rpx;
						height: 80rpx;
						border-radius: 20rpx;
					}
					.item-text{
						display: block;
						font-size: 22rpx;
					}
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
	.other{
		.other-item{
			display: inline-block;
			width: 40%;
			margin: 11rpx;
			padding: 50rpx 26rpx;
			border-radius: 20rpx;
			font-size: 33rpx;
			color: #fff;
			background-color: #0055ff;
		}
	}
	.menuItem{
		&:active {
		  .uni-icons{
			  color: #000;
		  }
		  background-color: #ffffff; // 鼠标点击时的背景色
		  transform: scale(0.95); // 点击时的缩放效果，使按钮有按下的感觉
		}
	}
</style>


<template>
	<view class="head">
		<uni-icons type="bars" size="30px" @click="toggle('left')"></uni-icons>
	</view>
  <swiper indicator-dots="true" autoplay="true" interval="3000" duration="500" circular="true" class="swiper-container">
    <swiper-item v-for="(image, index) in images" :key="index">
      <image :src="image" class="swiper-image"></image>
    </swiper-item>
  </swiper>
  <view class="other">
	  <view class="other-item" @click="punchPage">
		  <text>考勤打卡</text>
		  <uni-icons type="right" size="36rpx" style="color: #fff;"></uni-icons>
		  </view>
	 <!-- <view class="other-item" style="background-color: #ff8902;" @click="reviewPage">
		  <text>OA审批</text>
		  <uni-icons type="right" size="36rpx" style="color: #fff;"></uni-icons>
	  </view> -->
	  <view class="other-item" style="background-color: #ff8902;" @click="logDayPage">
	  		  <text>个人日志</text>
	  		  <uni-icons type="right" size="36rpx" style="color: #fff;"></uni-icons>
	  </view>
  </view>
  <view class="warp">
      <view class="Layout">
        <view class="row" v-for="item in list" :key="item.text" @click="changePage(item.URL)">
          <view class="item">
            <image :src="item.url" class="item-image"></image>
            <text class="item-text">{{item.text}}</text>
          </view>
        </view>
      </view>
  </view>
  	<view>
  			<!-- 普通弹窗 -->
  			<uni-popup ref="popup" background-color="#000" @change="change">
  				<view class="menuItem" v-for="item in sList" style="padding: 20rpx;" @click="changeMenuPage(item.url)">
					<uni-icons :type="item.icon" size="40rpx" color="#fff">{{item.text}}</uni-icons>
				</view>
  			</uni-popup>
  		</view>
</template>


<script>
	export default {
		components: {},
		data() {
			return {
				sList:[
					{
						url:"/pages/logDay/InsertReport",
						text:"写日志",
						icon:"wallet"
					},
					{
						url:"/pages/selfMessage/self",
						text:"个人信息",
						icon:"person"
					}
				],
				images: [
				        '../../static/lb1.png',
				        '../../static/lb2.png',
				        '../../static/lb3.png'
				      ],
				list: [{
						url: '/static/main/mrdk.png',
						text: '考勤打卡',
						badge: '0',
						URL: "/pages/punchIn/punchIn"
					},
					// {
					// 	url: '/static/main/gzsp.jpg',
					// 	text: 'OA审批',
					// 	badge: '1',
					// 	URL: "/pages/review/review"
					// }, 
					{
						url: '/static/main/rz.png',
						text: '日志',
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
			changeMenuPage(urls){
				uni.navigateTo({
					url:urls
				})
			},
			change(e){
				console.log(e)
			},
			toggle(type) {
							this.type = type
							// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
							this.$refs.popup.open(type)
						},
			logDayPage(){
				uni.navigateTo({
					url:"/pages/logDay/logDay"
				})
			},
			punchPage(){
				uni.navigateTo({
					url:"/pages/punchIn/punchIn"
				})
			},
			reviewPage(){
				uni.navigateTo({
					url:"/pages/review/review"
				})
			},
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