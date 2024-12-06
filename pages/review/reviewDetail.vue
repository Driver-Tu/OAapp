<style lang="scss">
	.layout {
		width: 100vw;
		height: 4vh;

		.row {
			width: 100%;
			height: 100%;

			.item {
				height: 100%;
				width: 30%;
				display: inline-block;
				text-align: center;
				background-color: #c1c1c1;
				border-right: 1rpx solid #7c7c7c;
				padding: 10rpx;
			}
		}
	}

	.message {
		width: 100vw;
		height: 96vh;

		.row {
			width: 100%;
			height: 100%;
			background-color: #e5e5e5;

			.item {
				margin: 10rpx;
				background-color: #ffffff;
				border-radius: 15rpx;

				.left {
					font-size: 30rpx;
					padding: 10rpx;
					margin: 5rpx;
					view{
						padding: 5rpx;
					}
				}
			}
		}
	}
</style>
<template>
	<view class="layout">
		<view class="row">
			<uni-segmented-control :current="0" :values="items" :style-type="styleType" :active-color="activeColor"
				@clickItem="chengeStatus" />
		</view>
	</view>
	<uni-section title="选择审批类型" type="line">
		<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
	</uni-section>
	<view class="message">
		<scroll-view class="row" :scroll-y="true">
			<view  class="item" v-if="reviewData.length!==0" v-for="item in reviewData">
				<view class="left">
					<view>
						<text style="font-weight: 700; font-size:50rpx">{{item.type}}</text>
						<text
							style="width: 300rpx;margin-left:50rpx ;text-align: right;font-size: 26rpx; color: #9e9e9e;">{{item.applicationDate}}
							</text>
					</view>
					<view><text>简介：{{item.fromName}}</text></view>
					<view>
						<text style="font-weight: 700;">详细说明：</text>
						<scroll-view :scroll-y="true" style="max-height: 20vh;min-height: 2vh;">
							<view>
								<rich-text :nodes="item.description"></rich-text>
							</view>
						</scroll-view>
					</view>
					<view style="display: inline-block;"><text v-if="item.status==='已完成'||item.status==='申请完成'" ref="status"
							style="font-size: 40rpx; color: #00b500;">{{item.status}}</text></view>
					<view style="display: inline-block;"><text v-if="item.status==='未完成'||item.status==='申请失败'" ref="status"
							style="font-size: 40rpx; color: #ff0000;">{{item.status}}</text></view>
							<view style="display: inline-block;width: 70%; text-align: right;">
								<uni-icons type="more-filled" style="color: #00aaff;font-size: 20rpx;" @click="update(item)">更多</uni-icons>
							</view>
				</view>
			</view>
			<view class="null" v-if="reviewData.length===0">
				<mineEmpty></mineEmpty>
			</view>
		</scroll-view>
	</view>

</template>
<script>
	import mineEmpty from "../../component/mineList/mine-empty/mine-empty.vue"
	export default {
		components:{
			mineEmpty
		},
		data() {
			return {
				items: ['已完成', '未完成', '申请成功', "申请失败"],
				styleType: "text",
				activeColor: "#00b100",
				reviewData: [],
				data: {
					pageNum: 1,
					pageSize: 30,
					data: {
						type: null,
						status: "已完成"
					}
				},
				value: null,
				range: [{
						value: 0,
						text: "请假",
						urlEnd:"askForLeave"
					},
					{
						value: 1,
						text: "报销",
						urlEnd:""
					},
					{
						value: 2,
						text: "出差",
						urlEnd:"businessReview"
					},
					{
						value: 3,
						text: "加班",
						urlEnd:""
					},
					{
						value: 4,
						text: "补签",
						urlEnd:""
					},
					{
						value: 5,
						text: "入职",
						urlEnd:""
					},
					{
						value: 6,
						text: "培训",
						urlEnd:""
					},
					{
						value: 7,
						text: "薪资调整",
						urlEnd:""
					},
					{
						value: 8,
						text: "离职",
						urlEnd:""
					},
					{
						value: 9,
						text: "采购",
						urlEnd:""
					},
					{
						value: 10,
						text: "用车",
						urlEnd:""
					},
					{
						value: 11,
						text: "预算",
						urlEnd:""
					},
					{
						value: 12,
						text: "招聘",
						urlEnd:""
					},
					{
						value: 13,
						text: "设备维修",
						urlEnd:""
					},
					{
						value: 14,
						text: "合同签署",
						urlEnd:""
					},
					{
						value: 15,
						text: "项目立项",
						urlEnd:""
					},
				],
			};
		},
			onPullDownRefresh() {
				this.data.data.type=null
				this.data.data.status=null
				this.value=null
				this.getReviewDatas();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			},
		methods: {
			changeWeb(subUrl,type){
				uni.navigateTo({
					url:"/pages/review/"+subUrl,
					success() {
						uni.showToast({
							icon:'success',
							title:"请修改"+type,
							duration:1000
						})
					},
					fail() {
						uni.showToast({
							icon:'error',
							title:"页面错误",
							duration:1000
						})
					}
				});
			},
			update(item){
				console.log(item)
				uni.setStorageSync("formId",item.formId)
				this.range.forEach(items=>{
					if(items.text===item.type){
						this.changeWeb(items.urlEnd,items.text)
					}else{
						uni.showToast({
							icon:'error',
							title:"页面还未设计",
							duration:1000
						})
					}
				})
			},
			changeDate(e){
				const time=new Date(e)
				const newDate=time.getFullYear() + "年" + (time.getMonth() +1) + "月" + time.getDate() + "日" + time.getHours() + "时";
				return newDate;
			},
			change(e) {
				if(this.range[e]){
					this.data.data.type = this.range[e].text
					console.log(this.data)
					this.getReviewDatas()
				}else{
					this.data.data.type=null
					console.log(this.data)
					this.getReviewDatas()
				}
			},
			chengeStatus(e) {
				this.data.data.status = this.items[e.currentIndex]
				console.log(this.data)
				this.getReviewDatas()
			},
			async getReviewDatas() {
				await uni.request({
					url: "http://192.168.0.196:8088/approvalForms/getSelfApprovalForms",
					method: 'POST',
					data: this.data,
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					success: (res) => {
						this.reviewData = res.data.data.records.map(record => {
							const time = new Date(record.applicationDate)
							if (record) { // 确保record存在
								return {
									"formId": record.formId,
									"applicantId": record.applicantId,
									"attendanceId": record.attendanceId,
									"fromName": record.fromName,
									"applicationDate": time.getFullYear() + "年" + (time.getMonth() +
										1) + "月" + time.getDate() + "日" + time.getHours() + "时" + time
										.getMinutes() + "m" + time.getSeconds() + "s",
									"status": record.status,
									"type": record.type,
									"description": record.description,
									"departmentName": record.departmentName,
									"userName": record.userName,
									"map":record.map
								};
							}
						});
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
		},
		onShow() {
			this.getReviewDatas()
		}
	};
</script>