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
			<view class="item" v-for="item in reviewData">
				<view class="left">
					<view>
						<text style="font-weight: 700; font-size:50rpx">{{item.type}}</text>
						<text
							style="width: 300rpx;margin-left:50rpx ;text-align: right;font-size: 26rpx; color: #9e9e9e;">{{item.applicationDate}}</text>
						<uni-icons type="right" size="40rpx"></uni-icons>
					</view>
					<view><text>简介：{{item.fromName}}</text></view>
					<view>详细说明：
						<scroll-view :scroll-y="true" style="height: 20vh;">
							<view>
								<text>{{item.description}}</text>
							</view>
						</scroll-view>
					</view>

					<view><text v-if="item.status==='已完成'||item.status==='申请完成'" ref="status"
							style="font-size: 40rpx; color: #00b500;">{{item.status}}</text></view>
					<view><text v-if="item.status==='未完成'||item.status==='申请失败'" ref="status"
							style="font-size: 40rpx; color: #ff0000;">{{item.status}}</text></view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>
<script>
	export default {
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
						type: "",
						status: ""
					},
					params: {
						userName: "",
						departmentName: ""
					}
				},
				value: null,
				range: [{
						value: 0,
						text: "请假"
					},
					{
						value: 1,
						text: "报销"
					},
					{
						value: 2,
						text: "出差"
					},
					{
						value: 3,
						text: "加班"
					},
					{
						value: 4,
						text: "补签"
					},
					{
						value: 5,
						text: "入职"
					},
					{
						value: 6,
						text: "培训"
					},
					{
						value: 7,
						text: "薪资调整"
					},
					{
						value: 8,
						text: "离职"
					},
					{
						value: 9,
						text: "采购"
					},
					{
						value: 10,
						text: "用车"
					},
					{
						value: 11,
						text: "预算"
					},
					{
						value: 12,
						text: "招聘"
					},
					{
						value: 13,
						text: "设备维修"
					},
					{
						value: 14,
						text: "合同签署"
					},
					{
						value: 15,
						text: "项目立项"
					},
				],
			};
		},
			onPullDownRefresh() {
				this.data.data.type=""
				this.data.data.status=""
				this.value=null
				this.getReviewDatas();
				setTimeout(function () {
					uni.stopPullDownRefresh();
				}, 1000);
			},
		methods: {
			change(e) {
				this.data.data.type = this.range[e].text
				this.getReviewDatas()
			},
			chengeStatus(e) {
				this.data.data.status = this.items[e.currentIndex]
				this.getReviewDatas()
			},
			getReviewDatas() {
				uni.request({
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
									"userName": record.userName
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