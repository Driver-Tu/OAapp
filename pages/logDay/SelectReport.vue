<template>
	<view class="row">
		<uni-segmented-control :current="num" :values="items" style-type="text" active-color="#00b100"
			@clickItem="chengeType" />
	</view>
	<view v-for="item in allData">
		<uni-card :title="item.reportName" :sub-title="item.reportDate" :extra="item.userName+'的'+item.type" 
			@click="selectDetail(item.reportId)">
			<view>
				<view>
					<text style="">报告内容:</text>
				</view>
				<scroll-view :scroll-y="true" style="max-height: 20vh;">
					<view>
						<rich-text :nodes="item.content"></rich-text>
					</view>
				</scroll-view>
				<view>
					<text style="color: #00aaff;">全文</text>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
import mineEmpty from "../../component/mineList/mine-empty/mine-empty.vue"
	export default {
		props: ['item'],
		components:{
			mineEmpty
		},
		data() {
			return {
				num:0,
				items: ["日报", "周报", "月报"],
				total: 0,
				data: {
					pageNum: 1,
					pageSize: 10,
					data: {
						reportId: null,
						type: "日报"
					}

				},
				allData: [],
				userImage:null
			}
		},
		onLoad(options) {
			if(options.item){
				const decodedItem = decodeURIComponent(options.item);
				 const parsedItem = JSON.parse(decodedItem);
				 this.data.data.type=parsedItem.title
				 this.num=parsedItem.num
			}
			this.getData()
			this.getUserImage()
		},
		onShow() {
			
		},
		methods: {
			async getUserImage(){
				await uni.request({
					url:"http://192.168.0.196:8088/user/userImage",
					method:'GET',
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					success: (res) => {
					     console.log(res)
						 this.userImage=res.data.data
					}
				})
			},
			selectDetail(id) {
				uni.navigateTo({
					url: "/pages/logDay/reportDetail?reportId=" + encodeURIComponent(JSON.stringify(id))
				})
			},
			chengeType(e) {
				this.data.pageNum=1
				this.data.data.type = this.items[e.currentIndex]
				this.getData()
			},
			getDataNext() {
				uni.request({
					url: "http://192.168.0.196:8088/report/list-self",
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					data: this.data,
					method: 'POST',
					success: (res) => {
						res.data.data.records.map(item => {
							this.allData.push(item)
						})
						this.total = res.data.data.total
					},
					fail: (fail) => {
						console.log(fail)
					}
				})
			},
			getData() {
				uni.showLoading({
					title:"数据加载中..."
				})
				uni.request({
					url: "http://192.168.0.196:8088/report/list-self",
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					data: this.data,
					method: 'POST',
					success: (res) => {
						this.allData = res.data.data.records
						this.total = res.data.data.total
						uni.hideLoading()
					},
					fail: (fail) => {
						uni.hideLoading()
						console.log(fail)
					}
				})
			},
		},
		//上拉加载
		onReachBottom() {
			let allTotal = this.data.pageNum * this.data.pageSize
			if (allTotal <= this.total) {
				//当前条数小于总条数 则增加请求页数
				this.data.pageNum++;
				this.getDataNext() //调用加载数据方法
			} else {
				uni.showToast({
					duration:1000,
					title:"已加载全部数据",
					icon:'success'
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.allData = []
			this.data.pageNum = 1
			this.data.data.reportId = null
			//调用获取数据方法
			this.getData()
			setTimeout(() => {
				//结束下拉刷新
				uni.stopPullDownRefresh();
			}, 1000);
		},
	}
</script>

<style>

</style>