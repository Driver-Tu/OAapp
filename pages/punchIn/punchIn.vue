<style lang="scss">
	.abutton{
		background-color: #dedede;
		margin: 30rpx;
		font-size: 30rpx;
	}
	.attendance-button{
		padding: 60rpx 36rpx;
		margin: 30rpx;
		display: inline-block;
		border-radius: 50%;
		background-color: #00d165;
		color: #fff;
	}
	.userLayout {
	  display: flex;
	  align-items: center;
	  .avatar {
	    flex-shrink: 0; // 防止头像在小屏幕上被压缩
	    margin-right: 20px;
	
	    .image {
	      width: 130rpx; // 调整头像大小
	      height: 130rpx; // 调整头像大小
	      border-radius: 20rpx; // 圆形头像
	      border: 1px solid #aaa;
	      transition: transform 0.3s ease; // 平滑过渡效果
	      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 添加阴影
	
	      &:hover {
	        transform: scale(1.05); // 鼠标悬停时放大
	      }
	    }
	  }
	
	  .userInfo {
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	  }
	
	  .userName {
	    margin: 0;
	    padding: 0;
	    font-size: 20px;
	    color: #333;
	    font-weight: bold;
	    margin-bottom: 5px;
	  }
	}
</style>
<template>
		<view class="attendance-title">
			<uni-notice-bar show-icon scrollable text="提示: 1.上班打卡时间为早上九点之前,下班打卡时间为下午五点半之后。2.打卡定位之前,必须连接公司打卡蓝牙机才能够进行定位。3.如果还是无法打卡,请保留相关信息,作为后期补签证据。"/>
			</view>
		<uni-card>
			<view class="userLayout">
			  <view class="avatar">
			    <image class="image" v-if="userMessage.avatar!==null" :src="userMessage.avatar" @click="imagePreview(userMessage.avatar)"></image>
			    <image class="image" v-else src="../../static/selfImage/self.png" @click="imagePreview(userMessage.avatar)"></image>
			  </view>
			  <view class="userInfo">
			    <view class="userName">
						{{ userMessage.userName }}
						</view>
			  </view>
			</view>
		</uni-card>
		<uni-card>
			<view>
				<uni-section title="请选择地址" type="square">
					<button @click="getAddress" class="abutton" :disabled="outCheckIn">{{addance.address}}</button>
				</uni-section>
				</view>
				<view class="attendance-container">
				  <view>
					  <view class="current-time" id="currentTimeDisplay" style="color: #48c5bd;text-align: center;">
						  <text style="display: block;">{{currentTimeDisplay}}</text>
						  <text style="display: block;">{{blueMessage.remark}}</text>
					  </view>
				  </view>
				  <view class="attendance-clock-in-out">
				    <button class="attendance-button"  :disabled="clockInButton" @click="show()" >打卡上班</button>
				    <button class="attendance-button"  :disabled="clockOutButton" @click="show()">打卡下班</button>
				  </view>
				</view>
				<view class="bluetooth"></view>
		</uni-card>
</template>
<script>
	function checkTime() {
	  // 获取当前时间
	  const now = new Date();
	  const hour = now.getHours(); // 获取小时数
	
	  // 判断当前时间是否小于早上9点或者大于下午5点半
	  if (hour < 9 || hour > 17.5) {
	    // 如果是，则不做任何操作（或者可以在这里添加一些代码）
		return true;
	  } else {
	    // 如果不是，弹出提示框
	    return false;
	  }
	}
	function getFormattedDate() {
	  const today = new Date(); // 获取当前日期
	  const year = today.getFullYear(); // 获取年份
	  const month = today.getMonth() + 1; // 获取月份，+1是因为getMonth()返回的月份是从0开始的
	  const day = today.getDate(); // 获取日期
	
	  // 将月份和日期格式化为两位数
	  const formattedMonth = month < 10 ? '0' + month : month;
	  const formattedDay = day < 10 ? '0' + day : day;
	
	  // 组合成YYYY-MM-DD格式
	  return `${year}-${formattedMonth}-${formattedDay}`;
	}
export default{
	data(){
		return{
			userMessage:{
				userName:null,
				departmentName:null,
				userName:null,
				departmentName:null,
				empNum:null,
				telephone:null,
				email:null,
				status:null,
				ctTime:null,
				avatar:null
			},
			addance:{
				longitude:null,
				latitude:null,
				address:"点击选择打卡位置",
				date:null,
				type:"上班打卡"
			},
			blueMessage:{
				bluetoothName:null,
				remark:null
			},
			currentTimeDisplay:"",
			clockInButton:true,
			clockOutButton:true,
			outCheckIn:true,
			deviceIds: []
		}
	},
	methods:{
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
					this.userMessage.userName=res.data.data.userName
					this.userMessage.departmentName=res.data.data.departmentName
					this.userMessage.email=res.data.data.email
					this.userMessage.telephone=res.data.data.telephone
					this.userMessage.status=res.data.data.status
					this.userMessage.empNum=res.data.data.empNum
					var date =new Date(res.data.data.ctTime)
					if(res.data.data.userImage!==null){
						this.userMessage.avatar=res.data.data.userImage
					}else{
						this.userMessage.avatar="../../static/tx/default.png"
					}
					this.userMessage.ctTime=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
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
		getBlueTooth(){
			uni.request({
				url:"http://192.168.0.196:8088/bluetooth/getBluetooth",
				method:"GET",
				header:{
					"satoken":uni.getStorageSync("satoken")
				},
				success: (res) => {
					this.deviceIds=res.data.data
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		getAddress(){
			uni.getLocation({
			type:'gcj02',
			geocode:true,
			isHighAccuracy:true,
			success: (res1) => {
				//获取经纬度
				this.addance.longitude=res1.longitude;
				this.addance.latitude=res1.latitude;
				//选择地点
				uni.chooseLocation({
					success: (res2) => {
								if(Math.abs(res1.longitude-res2.longitude)<0.0002&&Math.abs(res1.latitude-res2.latitude)<0.0002){
									this.addance.address=res2.name
									uni.showToast({
										title:"定位成功",
										icon:'success',
										success: (res) => {
											this.clockInButton=false
											this.clockOutButton=false
										}
									})
								}else{
									uni.showToast({
										title:"定位失败",
										icon:'error',
									})
								}
							}
						})
					}
			}
		)
		},
		updateTime() {
		    var now = new Date();
		    var hours = now.getHours();
		    var minutes = now.getMinutes();
		    // 更新时间显示
		    this.currentTimeDisplay = `中国时间:${now.toLocaleTimeString()}`;
		},
		show(){
			this.addance.date=getFormattedDate()
			if(checkTime()){
				this.punchIn()
			}else{
				uni.showModal({
					title:"警告",
					content:"还未到打卡时间，您确认打卡吗",
					success: (res) => {
						if(res.confirm){
							//同意则继续打卡
							this.punchIn()
						}else if(res.cancel){
							//取消不做任何事情
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
			uni.showToast({
				icon:'success',
				title:"打卡成功"
			})
		},
		punchIn(){
			uni.request({
				url:"http://192.168.0.196:8088/attendance/addAttendance",
				method:'POST',
				data:this.addance,
				header:{
					"satoken":uni.getStorageSync("satoken")
				},
				success: (res) => {
					uni.showModal({
						title:"提示",
						content:res.data.data,
						showCancel:false
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
		,
		scanBluetooth() {
		      // 确保蓝牙适配器已开启
		      uni.openBluetoothAdapter({
		        success: () => {
					// 开始扫描蓝牙设备
					uni.startBluetoothDevicesDiscovery({
					  success: (res) => {
					  // 监听找到蓝牙设备事件
					  uni.onBluetoothDeviceFound(devices => {
					    this.deviceIds.map(deviceId=>{
							if(deviceId.deviceId===devices.devices[0].deviceId){
							// 找到设备后停止扫描
								uni.stopBluetoothDevicesDiscovery({
								  success: () => {
									  uni.showToast({
									  	title:"成功连接蓝牙",
										icon:'success',
										duration:1000,
										success:()=>{
											this.outCheckIn=false
											this.blueMessage.bluetoothName=deviceId.bluetoothName
											this.blueMessage.remark=deviceId.remark
										}
									  })
									  },
								  fail: () => {
									  console.error('停止扫描失败')
								    uni.showToast({
								  	title:"无法连接蓝牙",
								  	icon:'error'
								  })
								  }
								});
							}
						})
					  });
					  },
					  fail: (err) => {
					    console.error('开始扫描失败', err);
					    uni.closeBluetoothAdapter(); // 扫描失败时关闭蓝牙适配器
					  }
					});
		        },
		        fail: (err) => {
		          console.error('开启蓝牙适配器失败', err);
		        }
		      });
		    },
	},
	//初始化挂载
	created(){
		setInterval(this.updateTime,1000);
	},
	onShow() {
		this.getSelfMessage()
		this.getBlueTooth()
		this.scanBluetooth();
	},
	updated() {
		this.updateTime()
	},
}
</script>

