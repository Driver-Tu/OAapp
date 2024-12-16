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
	.other{
		.other-item{
			display: inline-block;
			width: 40%;
			margin:20rpx 11rpx;
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
	
.head{
	.text{
		.item{
			padding: 10rpx;
			font-size: 40rpx;
			color: #7e7e7e;
			margin: 10rpx;
		}
	}
}
.popup{
	.menuItem{
		margin: 10rpx;
		 padding: 20rpx;
		 border-bottom: #e7e7e7 1rpx solid;
	}
	.menuItem:last-child {
	  border-bottom: none; /* 最后一个菜单项不显示分割线 */
	}
}
.char-count{
	.Text{
		display: inline-block;
		margin: 20rpx;
		width: 43.5%;
		background-color: #0055ff;
		color: #fff;
		border-radius: 10rpx;
		padding: 20rpx 0rpx;
		.left{
			margin-bottom: 20rpx;
			width: 100%;
			text-align: center;
		}
		.right{
			width: 100%;
			text-align: center;
		}
		
		
	}
	.Text:first-child{
		background-color: #55ff00;
		&:active{
			background-color: #ff0000;
		}
	}
}
.char-count2{
	.Text{
		display: inline-block;
		margin: 20rpx;
		width: 27.7%;
		color: #fff;
		border-radius: 10rpx;
		padding: 20rpx 0rpx;
		.left{
			margin-bottom: 20rpx;
			width: 100%;
			text-align: center;
		}
		.right{
			width: 100%;
			text-align: center;
		}
		&:active{
			background-color: #ff0000;
		}
		
	}
	.Text:first-child{
		background-color: #0055ff;
		&:active{
			background-color: #ff0000;
		}
	}
	.Text:nth-child(2){
		background-color: #62c500;
		&:active{
			background-color: #cbcb00;
		}
	}
	.Text:nth-child(3){
		background-color: #ffaa00;
		&:active{
			background-color: #aa00ff;
		}
	}
}
</style>


<template>
	<uni-nav-bar dark :fixed="true" shadow background-color="#ffffff" :border="false" left-text="富辰方舟企业管理有限公司" left-icon="medal" left-width="45vw"  status-bar color="#00aaff" right-icon="plusempty" @click-right="toggle('top')"/>
	<view class="head" style="margin:5rpx 20rpx;">
		<view class="text">
			<image src="../../static/main/cpjs.png" style="height: 300rpx;width: 100%;"></image>
		</view>
	</view>
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
		  <uni-section title="基本功能" type="circle">
        <view class="row" v-for="item in list" :key="item.text" @click="changePage(item.URL)">
          <view class="item">
            <image :src="item.url" class="item-image"></image>
            <text class="item-text">{{item.text}}</text>
          </view>
        </view>
		 </uni-section>
      </view>
  </view>
  <uni-section title="本月数据" sub-title="本月打卡总数,日报,周报和月报的篇数统计" type="circle" style="background-color: #dfdfdf; padding: 20rpx 0rpx; ">
	  <uni-section class="char-count" title="本月打卡次数" type="square" style="margin: 20rpx;border-radius: 10rpx;">
		  <view class="Text">
			  <view class="left">上班打卡统计</view>
			  <view class="right">2天</view>
		  </view>
	  </uni-section>
	  <uni-section class="char-count2" title="本月报告次数" type="square" style="margin: 20rpx;border-radius: 10rpx;">
		  <view class="Text">
		  			  <view class="left">日报次数</view>
		  			  <view class="right">6篇</view>
		  </view>
		  <view class="Text">
		  			  <view class="left">周报次数</view>
		  			  <view class="right">1篇</view>
		  </view>
		  <view class="Text">
		  			  <view class="left">月报次数</view>
		  			  <view class="right">0篇</view>
		  </view>
	  </uni-section>
  </uni-section>
  	<view>
  			<!-- 普通弹窗 -->
  			<uni-popup class="popup" ref="popup" background-color="#fff" style="margin-top: 150rpx;">
  				<view class="menuItem" v-for="item in sList" style="" @click="changeMenuPage(item.url)">
					<uni-icons :type="item.icon" size="30rpx" color="#000000" style="margin:0rpx 20rpx;"></uni-icons>
					<text style="font-size: 30rpx;">{{item.text}}</text>
				</view>
  			</uni-popup>
  		</view>
</template>


<script>
	import punchIn from "../selfMessage/punchMessage.vue"
	export default {
		components: {
			punchIn
		},
		data() {
			return {
				userName:null,
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
						URL: "/pages/logDay/SelectReport"
					}
				],
				//后续用作审批流程
				spList: []
			}
		},
		onShow() {
			this.isLogin()
			this.getSelfMessage()
		},
		methods: {
			changeMenuPage(urls){
				uni.navigateTo({
					url:urls
				})
			},
			toggle(type) {
							this.type = type
							// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
							this.$refs.popup.open(type)
						},
			logDayPage(){
				uni.navigateTo({
					url:"/pages/logDay/SelectReport"
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
						this.userName=res.data.data.userName
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
		}
	}
</script>