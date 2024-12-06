<style>
	.search-box{
		margin: 20rpx;
	}
</style>
<template>
	<view class="row">
		<uni-segmented-control :current="num" :values="items" style-type="text" active-color="#00b100"
			@clickItem="change" />
	</view>
	<uni-section title="请选择日报类型" type="line" class="search-box">
		<uni-data-select :localdata="range"  @change="chengeType" :clear="false"></uni-data-select>
	</uni-section>
	<view v-for="item in allData">
		<uni-card :title="item.reportName" :sub-title="item.reportDate" :extra="item.userName+'的'+item.type" 
			@click="selectDetail(item.reportId)" thumbnail="../../static/tx/default.png">
			<view>
				<view>
					<text style="font-weight: 700;">报告内容:</text>
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
	<view v-if="allData.length===0">
		<mine-empty></mine-empty>
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
				num:1,
				items: ["我收到的", "我发出的"],
				total: 0,
				data: {
					pageNum: 1,
					pageSize: 10,
					data: {
						reportId: null,
						type: "日报",
						share:null
					}

				},
				range: [{
						value: 0,
						text: "日报"
					},
					{
						value: 1,
						text: "周报"
					},
					{
						value: 2,
						text: "月报"
					}
				],
				allData: [],
				index:0
			}
		},
		onLoad(options) {
			if(options.item){
				const decodedItem = decodeURIComponent(options.item);
				 const parsedItem = JSON.parse(decodedItem);
				 this.data.data.type=parsedItem.title
				 this.num=parsedItem.num
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			init(){
				if(this.index===0){
					this.getMyShareData()
				}else{
					this.getData()
				}
			},
			change(res){
				console.log(res.currentIndex)
				this.index=res.currentIndex
				this.init()
			},
			//获取分享给自己的日志
			getMyShareData(){
				uni.request({
					url:"http://192.168.0.196:8088/report/shareReport",
					method:"POST",
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					data:this.data,
					success: (res) => {
						console.log(res)
						this.allData=res.data.data.records
						this.total = res.data.data.total
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			selectDetail(id) {
					uni.navigateTo({
						url: "/pages/logDay/reportDetail?reportId=" + encodeURIComponent(JSON.stringify(id+","+this.index))
					})
			},
			chengeType(e) {
				this.data.pageNum=1
				this.data.data.type = this.range[e].text
				this.init()
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
			getShareDataNext() {
				uni.request({
					url: "http://192.168.0.196:8088/report/shareReport",
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
				uni.showLoading({
					title:"数据加载中"
				})
				this.data.pageNum++;
				if(this.index===0){
					this.getShareDataNext()
					uni.hideLoading()
				}else{
					this.getDataNext()
					uni.hideLoading()
				} //调用加载数据方法
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