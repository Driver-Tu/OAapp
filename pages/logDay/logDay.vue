<style lang="scss">
.all{
	.select{
		width: 100%; 
		text-align: left;
		margin: 10rpx;
		display: inline-block;
	}
	.insert{
		display: inline-block;
		width: 100%; 
		text-align: right;
	}
}
</style>
<template>
	<view class="all">
		<view v-for="item in items">
			<uni-card :title="item.title" :sub-title="item.subtitle" :extra="item.extra" padding="10px 0"
				:thumbnail="item.thumbnail" >
				<view class="select" @click="changeSelectPage(item)">
					<view>
						<uni-icons color="#0055ff" type="bars" size="40rpx"></uni-icons>
						<text style="color: #0055ff;font-size: 40rpx;">查看最近{{item.title}}</text>
					</view>
				</view>
				<view class="insert" @click="changePage(item)">
					<view>
						<uni-icons color="#ff0000" type="plusempty" size="40rpx"></uni-icons>
					</view>
				</view>
			</uni-card>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				items: [{
					title: "日报",
					subtitle: "按照需求编写日志",
					extra: "日志记录",
					thumbnail: "/static/logDay/rb.png",
					URL:"/pages/logDay/InsertReport",
					url:"/pages/logDay/SelectReport"
				}, {
					title: "周报",
					subtitle: "按照需求编写周志",
					extra: "周志记录",
					thumbnail: "/static/logDay/zb.png",
					URL:"/pages/logDay/InsertReport",
					url:"/pages/logDay/SelectReport"
				}, {
					title: "月报",
					subtitle: "按照需求编写月报",
					extra: "月报记录",
					thumbnail: "/static/logDay/yb.png",
					URL:"/pages/logDay/InsertReport",
					url:"/pages/logDay/SelectReport"
				}]
			}
		},
		methods: {
			changePage(item) {
				uni.navigateTo({
					url:item.URL,
					success: (res) => {
						//写入类型携带
						uni.setStorageSync("type",item.title)
						uni.showToast({
							duration:1000,
							title:"新增"+item.title,
							icon:'success'
						})
					},
					fail: (res) => {
						uni.showToast({
							duration:1000,
							title:"跳转失败",
							icon:'error'
						})
					}
				})
			},
			changeSelectPage(item){
				uni.navigateTo({
					url:item.url,
					success: (res) => {
						//写入类型携带
						uni.setStorageSync("types",item.title)
						uni.showToast({
							duration:1000,
							title:"查看"+item.title,
							icon:'success'
						})
					},
					fail: (res) => {
						uni.showToast({
							duration:1000,
							title:"跳转失败",
							icon:'error'
						})
					}
				})
				
			},
		}
	}
</script>