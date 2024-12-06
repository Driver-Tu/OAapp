<style lang="scss">
	.layout {
		width: 100vw;
		height: 50vh;

		.layText {
			font-size: 36rpx;
			font-weight: bold;
			margin: 10rpx;
			padding: 10rpx;
			color: #000000;
			display: block;
		}

		button {
			width: 178rpx;
			margin: 30rpx auto;
			padding: 43rpx;
			color: #ffffff;
			background-color: #ff0000;
			border-radius: 100rpx;
		}

		navigator {
			color: #00aa00;
			font-size: 26rpx;
			position: fixed;
			bottom: 0;
			right: 0;
		}
	}

	.address {
		margin-left: 60rpx;
	}

	.day {
		font-size: 40rpx;
		font-weight: bold;
	}
</style>

<template>
	<uni-section title="打卡情况" sub-title="个人的打卡信息" title-font-size="50rpx" type="line" sub-title-color="#757575" style="background-color:#98d6ff;"></uni-section>
	<view>
		<!-- 插入模式 -->
		<uni-calendar class="date" :selected="info.selected" :showMonth="true" :lunar="true"
			@change="change"></uni-calendar>
	</view>
	<uni-section title="详细信息" type="line" style="background-color:#d0d0d0;"></uni-section>
	<view class="layout">
		<text class="day" style="font-weight: 700;">{{timeSelectNow}}</text>
		<text class="layText" v-if="info.message.length!==0&&info.message[0]!==undefined">上班
			{{info.message[0].timeIn}}</text>
		<view class="address" v-if="info.message.length!==0&&info.message[0]!==undefined">
			<uni-icons type="location" size="16px" style="margin-right: 16rpx;"></uni-icons>
			<text class="Text" style="font-size: 16px;color: #909090;">{{info.message[0].address}}</text>
		</view>
		<text class="layText" v-if="info.message.length!==0&&info.message[0]!==undefined">下班
			{{info.message[0].timeOut}}</text>
		<view class="address" v-if="info.message.length!==0&&info.message[0]!==undefined">
			<uni-icons type="location" size="16px" style="margin-right: 16rpx;"></uni-icons>
			<text class="Text" style="font-size: 16px;color: #909090;">{{info.message[0].address}}</text>
		</view>
		<text class="layText"
			v-if="info.message.length===0&&isToday(data.data.date)===false&&isTomorrow(data.data.date)===false"
			style="color: #ff0000;">该日未打卡，请点击下方补签按钮，提交补签审批!</text>
		<text class="timeNow" v-if="isToday(data.data.date)" style="display: block; font-weight: bold;">当前时间:{{timeNow}}</text>
		<text class="layText" v-if="isTomorrow(data.data.date)">还未到打卡时间，请改日再来</text>
		<button v-if="info.message.length===0&&isToday(data.data.date)===false&&isTomorrow(data.data.date)===false"
			@click="changePage">补签</button>
		<button v-if="isToday(data.data.date)" @click="changePage2" style="background-color: #00aaff;">打卡</button>
		<view class="finalValue" v-if="finalResult!==null&&finalResult==='正常'"
			style="margin: 30rpx;font-size: 42rpx; font-weight: 600; ">您当天的打卡结果为：<text style="color: #00aa00;border: #00aa00 1px dashed;">{{finalResult}}</text>
			</view>
		<view class="finalValue" v-if="finalResult!==null&&(finalResult!=='正常')"
			style="margin: 30rpx;font-size: 42rpx; font-weight: 600;">您当天的打卡结果为：<text style=" color: #ff0000;border: #ff0000 1px dashed;">{{finalResult}}</text>
			</view>
		<navigator url="">
			异常汇报<uni-icons type="link" size="26rpx" style="color: #00aa00;"></uni-icons>
		</navigator>
	</view>
</template>

<script>
	function compareTimeWithSpecificTime(startTime, endTime) {
		// 将当前时间和特定时间字符串转换为日期对象
		const currentDateTime = new Date(startTime);
		const specificDateTime = new Date(endTime);
		const morningTime = new Date(new Date(startTime).setHours(9, 0, 0, 0));
		const eveningTime = new Date(new Date(startTime).setHours(17, 30, 0, 0));
		// 比较两个日期对象
		if (currentDateTime <= morningTime && specificDateTime >= eveningTime) {
			return '正常';
		} else if (currentDateTime <= morningTime && specificDateTime < eveningTime) {
			return '早退';
		} else if (currentDateTime > morningTime && specificDateTime >= eveningTime) {
			return '迟到';
		} else if (currentDateTime > morningTime && specificDateTime < eveningTime) {
			return '迟到又早退';
		}
	}
	export default {
		components: {},
		data() {
			return {
				data: {
					pageNum: 1,
					pageSize: 200,
					data: {
						status: null,
						type: null,
						date: null
					}
				},
				showCalendar: false,
				info: {
					selected: [],
					message: [],
					fullDate: "",
				},
				timeNow: "",
				timeSelectNow: "",
				finalResult: null
			}
		},
		created() {
			setInterval(this.getTime, 1000)
		},
		onReady() {

		},
		onShow() {
			this.getData()
		},
		methods: {
			isToday(dateString) {
				const date = new Date(dateString);
				const today = new Date();
				return date.toDateString() === today.toDateString();
			},
			isTomorrow(date) {
				// 创建一个新的日期对象，表示当前时间
				const today = new Date();
				// 将当前时间设置为今天的午夜（过了今天就是明天）
				today.setHours(0, 0, 0, 0);
				// 为今天加1天，确保比较的是未来的时间
				today.setDate(today.getDate() + 1);

				// 创建一个新的日期对象，表示给定的日期和时间
				const inputDate = new Date(date);

				// 比较给定的日期是否在今天之后
				return inputDate > today;
			},
			changePage() {
				uni.switchTab({
					url: "/pages/review/review",
					success() {
						uni.showToast({
							mask: true,
							title: '成功跳转',
							icon: 'success',
							duration: 1000
						})
					}
				})
			},
			getTime() {
				const date = new Date();
				this.timeNow = date;
			},
			changePage2() {
				uni.switchTab({
					url: "/pages/punchIn/punchIn",
					success() {
						uni.showToast({
							mask: true,
							title: '请打卡',
							icon: 'success',
							duration: 1000
						})
					}
				})
			},
			change(e) {
				this.info.message=[]
				this.data.data.date = e.fulldate
				this.timeSelectNow = e.fulldate
				this.finalResult = null
				uni.request({
					url: "http://192.168.0.196:8088/attendance/getSelfAttendance",
					data: this.data,
					method: 'POST',
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					success: (res) => {
						if(res.data.data){
							this.info.message = res.data.data.records.map(record => {
								if (record && record.timeIn && record.timeOut) { // 确保record存在
									const timeI = new Date(record.timeIn)
									const timeO = new Date(record.timeOut)
									const timeIn = timeI.getHours() + ":" + timeI.getMinutes() + ":" +
										timeI.getSeconds()
									const timeOut = timeO.getHours() + ":" + timeO.getMinutes() + ":" +
										timeO.getSeconds()
									const address = record.address
									this.finalResult = compareTimeWithSpecificTime(record.timeIn, record
										.timeOut)
									return {
										"address": address,
										"timeIn": timeIn,
										"timeOut": timeOut
									}
								} else if (record && (!record.timeIn) && record.timeOut) {
									const timeO = new Date(record.timeOut)
									const timeIn = "上班未打卡"
									const timeOut = timeO.getHours() + ":" + timeO.getMinutes() + ":" +
										timeO.getSeconds()
									const address = record.address
									this.finalResult = "上班未打卡"
									return {
										"address": address,
										"timeIn": timeIn,
										"timeOut": timeOut
									}
								} else if (record && (record.timeIn) && (!record.timeOut)) {
									const timeI = new Date(record.timeIn)
									const timeIn = timeI.getHours() + ":" + timeI.getMinutes() + ":" +
										timeI.getSeconds()
									const timeOut = "下班未打卡"
									const address = record.address
									this.finalResult="下班未打卡"
									return {
										"address": address,
										"timeIn": timeIn,
										"timeOut": timeOut
									}
								}
							});
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			},
			getData() {
				uni.request({
					url: "http://192.168.0.196:8088/attendance/getSelfAttendance",
					data: this.data,
					method: 'POST',
					header: {
						"satoken": uni.getStorageSync("satoken")
					},
					success: (res) => {
						if (res.data.data.records !== undefined) {
							this.info.selected = res.data.data.records
							this.info.selected = this.info.selected.map(record => {
								return {
									"address": record.address,
									"date": record.date,
									"info": record.status
								};
							});
						}
					},
					fail: (error) => {
						console.log(error)
					}
				})
			}
		}
	}
</script>