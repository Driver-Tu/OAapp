<template>
	<view class="warp" style="margin:0px 0px 20px 0px ;">
		<uni-section title="近期使用" type="line" padding>
			<uni-grid :column="2" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in list" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						<image src="../../static/logo.png" style="width: 100%;height: 75%;"></image>
						<button style="width: 100%;height: 25%;" @click="">{{item.text}}</button>
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
	</view>
<!-- 	<view>
		<uni-section title="基础样式" type="line" padding>
			<uni-grid :column="4" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in 4" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						
					</view>
				</uni-grid-item>
			</uni-grid>
			<uni-grid :column="4" :highlight="true" @change="change">
				<uni-grid-item v-for="(item, index) in 4" :index="index" :key="index">
					<view class="grid-item-box" style="background-color: #fff;">
						
					</view>
				</uni-grid-item>
			</uni-grid>
		</uni-section>
	</view> -->
</template>


<script>
	export default {
		components: {},
		data() {
			return {
				list: [{
						url: '/static/dk.png',
						text: '每日打卡',
						badge: '0'
					},
					{
						url: '/static/c2.png',
						text: '工作审批',
						badge: '1'
					}
				],
				//后续用作审批流程
				spList:[]
			}
		},
		methods: {
			change(e) {
				let {index} = e.detail;
				this.list[index].badge && this.list[index].badge++;
				uni.showToast({
					title: this.list[index].text,
					icon: 'none',
					success() {
						uni.switchTab({
							url:"/pages/punchIn/punchIn"
						});
					}
				});
			},
			chagePage(e){
				
			}
		}
	}
</script>


<style lang="scss">
	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}

	.grid-item-box-row {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}

	@media screen and (min-width: 768px) and (max-width: 1425px) {
		.swiper {
			height: 630px;
		}
	}

	@media screen and (min-width: 1425px) {
		.swiper {
			height: 830px;
		}
	}

</style>


