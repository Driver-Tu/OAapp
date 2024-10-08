<style lang="scss">
	.layout{
		width: 100vw;
		height: 100vh;
		.layText{
			font-size: 36rpx;
			font-weight: bold;
			margin: 10rpx;
			padding: 10rpx;
			color: #000000;
		    display: block;
		}
		button{
			width: 178rpx;
			margin: 30rpx auto;
			padding: 43rpx;
			color: #ffffff;
			background-color: #ff0000;
			border-radius: 100rpx;
		}
		navigator{
			color: #00aa00;
			font-size: 26rpx;
			position: fixed;
			bottom: 0;
			right: 0;
		}
	}
	.address{
		margin-left: 60rpx;
	}
	.day{
		font-size: 30rpx;
		font-weight: 600;
	}
</style>

<template>
	<uni-section title="打卡情况" type="line" style="background-color:#d0d0d0;"></uni-section>
			<view>
				<!-- 插入模式 -->
				<uni-calendar class="date" :selected="info.selected" :showMonth="true" :lunar="true" @change="change"></uni-calendar>
			</view>
			<uni-section title="详细信息" type="line" style="background-color:#d0d0d0;"></uni-section>
			<view class="layout">
				<text class="day">{{timeSelectNow}}</text>
				<text class="layText" v-if="info.message.length!==0">上班 {{info.message[0].timeIn}}</text>
				<view class="address" v-if="info.message.length!==0">
					<uni-icons type="location" size="16px" style="margin-right: 16rpx;"></uni-icons>
					<text class="Text" style="font-size: 16px;color: #909090;">{{info.message[0].address}}</text>
				</view>
				<text class="layText" v-if="info.message.length!==0">下班 {{info.message[0].timeOut}}</text>
				<view class="address" v-if="info.message.length!==0">
					<uni-icons type="location" size="16px" style="margin-right: 16rpx;"></uni-icons>
					<text class="Text" style="font-size: 16px;color: #909090;">{{info.message[0].address}}</text>
				</view>
				<text class="layText" v-if="info.message.length===0&&isToday(data.data.date)===false&&isTomorrow(data.data.date)===false" style="color: #ff0000;">该日未打卡，请点击下方补签按钮，提交补签审批!</text>
				<text class="timeNow" v-if="isToday(data.data.date)" style="display: block;">当前时间:{{timeNow}}</text>
				<text class="layText" v-if="isTomorrow(data.data.date)">还未到打卡时间，请改日再来</text>
				<button v-if="info.message.length===0&&isToday(data.data.date)===false&&isTomorrow(data.data.date)===false" @click="changePage">补签</button>
				<button v-if="isToday(data.data.date)" @click="changePage2" style="background-color: #00aaff;">打卡</button>
				<navigator url="">
					异常汇报<uni-icons type="link" size="26rpx" style="color: #00aa00;"></uni-icons>
				</navigator>
			</view>
</template>

<script>
		export default {
			components: {},
			data() {
				return {
					data:{
					    pageNum:1,
					    pageSize:200,
					    data:{
					      status:"",
					      type:"",
					      date:""
					    }
					},
					showCalendar: false,
					info: {
						selected: [],
						message:[],
						fullDate:"",
					},
					timeNow:"",
					timeSelectNow:""
				}
			},
			created() {
				setInterval(this.getTime,1000)
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
				changePage(){
					uni.switchTab({
						url:"/pages/review/review",
						success() {
							uni.showToast({
								mask:true,
								title:'成功跳转',
								icon:'success',
								duration:1000
							})
						}
					})
				},
				getTime(){
					const date=new Date();
					this.timeNow=date;
					},
				changePage2(){
					uni.switchTab({
						url:"/pages/punchIn/punchIn",
						success() {
							uni.showToast({
								mask:true,
								title:'请打卡',
								icon:'success',
								duration:1000
							})
						}
					})
				}
				,
				change(e){
					this.data.data.date=e.fulldate
					this.timeSelectNow=e.fulldate
					uni.request({
						url:"http://localhost:8088/attendance/getSelfAttendance",
						data:this.data,
						method:'POST',
						header:{
							"satoken":uni.getStorageSync("satoken")
						},
						success: (res) => {
							this.info.message = res.data.data.records.map(record => {
							    if (record) { // 确保record存在
								console.log(record)
								const timeIn=new Date(record.timeIn)
								const timeOut=new Date(record.timeOut)
								const address=record.address
							        return {
										"address":address,
							            "timeIn":timeIn.getHours()+":"+timeIn.getMinutes()+":"+timeIn.getSeconds(),
							            "timeOut":timeOut.getHours()+":"+timeOut.getMinutes()+":"+timeIn.getSeconds()
							        }
							    }
								});
						},
						fail: (error) => {
							console.log(error)
						}
					}
				)
				},
				getData(){
						uni.request({
							url:"http://localhost:8088/attendance/getSelfAttendance",
							data:this.data,
							method:'POST',
							header:{
								"satoken":uni.getStorageSync("satoken")
							},
							success: (res) => {
								if(res.data.data.records!==undefined){
								this.info.selected = res.data.data.records
								this.info.selected=this.info.selected.map(record=>{
									return{
										"date":record.date,
										"info":record.status
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

