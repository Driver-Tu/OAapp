<style lang="scss">
	swiper{
		width: 90vw;
		height: 80rpx;
		border: 1px solid #000000;
		border-radius: 25rpx;
		margin: 10rpx 22rpx;
		padding: 6rpx;
		swiper-item{
			width: 100%;
			height: 100%;
			text{
				font-size: 56rpx;
				color: #b5b5b5;
				width: 100%;
				height: 100%;
			}
		}
	}
	.Layout{
		width: 100vw;
		border: 1px solid #b5b5b5;
		border-radius: 15rpx;
		box-shadow: 0 0 30rpx rgb(0, 0,0,0.35);
		.row{
			width: 100%;
			height: 100%;
				.text{
					margin: 18rpx;
					padding: 18rpx;
					display: inline-block;
					.item{
						display:flex;
						flex-direction: column;
						 align-items: center;
						image{
							width: 80rpx;
							border-radius: 50rpx;
							box-shadow: 0 0 30rpx rgb(0, 0,0,0.05);
						}
						text{
						}
					}
			}
		}
	}
</style>
<template>
	<uni-notice-bar show-icon scrollable text="1、确定审批类型! 2、提交审批表单! 3、静候审批结果! 祝大家工作顺利!" />
	<uni-section title="个人" title-font-size="40rpx" subTitle="个人审批" type="line" style="background-color: #eaeaea;">
		<view class="Layout">
			<view class="row">
					<view class="text" v-for="item in approlist1"  @click="changePage(item.url,item.text)">
						<view class="item">
							<image :src="item.src" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
			</view>
		</view>
	</uni-section>

	<uni-section title="职位" title-font-size="40rpx" subTitle="入职和离职" type="line" style="background-color: #ffffff;">
		<view class="Layout">
			<view class="row">
					<view class="text" v-for="item in approlist2"  @click="changePage(item.url,item.text)">
						<view class="item">
							<image :src="item.src" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
			</view>
		</view>
	</uni-section>
	<uni-section title="公共" title-font-size="40rpx" subTitle="公司工作中的需求" type="line" style="background-color: #eaeaea;">
		<view class="Layout">
			<view class="row">
					<view class="text" v-for="item in approlist3"  @click="changePage(item.url,item.text)">
						<view class="item">
							<image :src="item.src" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
			</view>
		</view>
	</uni-section>
	<uni-section title="合同" title-font-size="40rpx" subTitle="公司项目的立案和员工合同的签署" type="line" style="background-color: #ffffff;">
		<view class="Layout">
			<view class="row">
					<view class="text" v-for="item in approlist4"  @click="changePage(item.url,item.text)">
						<view class="item">
							<image :src="item.src" mode="widthFix"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
			</view>
		</view>
	</uni-section>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				
				approlist1:[
					{
						text:"请假",
						url:"/pages/review/askForLeave",
						src:"../../static/iconReview/qj.jpg"
					},
					{
						text:"报销",
						url:"",
						src:"../../static/iconReview/bx.jpg"
					},
					{
						text:"出差",
						url:"/pages/review/businessReview",
						src:"../../static/iconReview/cc.jpg"
					},
					{
						text:"加班",
						url:"",
						src:"../../static/iconReview/jb.jpg"
					},{
						text:"补签",
						url:"",
						src:"../../static/iconReview/bq.jpg"
					}
				],
				approlist2:[
					{
						text:"入职",
						url:"",
						src:"../../static/iconReview/rz.jpg"
					},
					{
						text:"培训",
						url:"",
						src:"../../static/iconReview/px.jpg"
					},
					{
						text:"薪资调整",
						url:"",
						src:"../../static/iconReview/xztz.jpg"
					},
					{
						text:"离职",
						url:"",
						src:"../../static/iconReview/lz.jpg"
					}
				],
				approlist3:[
					{
						text:"采购",
						url:"",
						src:"../../static/iconReview/cg.jpg"
					},
					{
						text:"用车",
						url:"",
						src:"../../static/iconReview/yc.jpg"
					},
					{
						text:"预算",
						url:"",
						src:"../../static/iconReview/ys.jpg"
					},
					{
						text:"招聘",
						url:"",
						src:"../../static/iconReview/zp.jpg"
					},{
						text:"设备维修",
						url:"",
						src:"../../static/iconReview/sbwx.jpg"
					},
				],
				approlist4:[
					{
						text:"合同签署",
						url:"",
						src:"../../static/iconReview/htqs.jpg"
					},
					{
						text:"项目立项",
						url:"",
						src:"../../static/iconReview/xmlx.jpg"
					}
				],
				
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
					success:(res)=> {
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
			changePage(str1,str2){
				uni.navigateTo({
					url:str1,
					success() {
						uni.showToast({
							icon:'success',
							title:str2+"申请!",
							duration:1000
						})
						},
					fail() {
						uni.showToast({
							icon:'error',
							title:str2+"待开发!",
							duration:1000
						})
					}
				})
			}
		}
	}
</script>
