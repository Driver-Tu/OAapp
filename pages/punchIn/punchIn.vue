<style>
	.attendance-container{
		text-align: center;
		
	}
	.attendance-title{
		position: absolute;
		bottom: 0;
		color: #ff0000;
	}
	.attendance-button{
		text-align: center;
		display: inline-flex;
		border-radius: 100px;
		line-height: 15vh;
		margin: 10px;
		width: 15vh;
		height: 15vh;
		background-color: #00aaff;
		color: #ffffff;
	}
	.abutton{
		background-color: #dedede;
	}
</style>
<template>
	<view>
		<button @click="getAddress" class="abutton" :disabled="outCheckIn">获取地址</button>
		<button class="abutton" :disabled="outCheckIn">地址:{{address}}</button>
		</view>
		<view class="attendance-container">
		  <view>
			  <view class="attendance-title">提示:上班打卡时间为早上九点之前,下班打卡时间为下午五点半之后</view>
			  <view class="current-time" id="currentTimeDisplay" style="color: #48c5bd;">{{currentTimeDisplay}}</view>
		  </view>
		  <view class="attendance-clock-in-out">
		    <button class="attendance-button"  :disabled="clockInButton" @click="show()" >打卡上班</button>
		    <button class="attendance-button"  :disabled="clockOutButton" @click="show()">打卡下班</button>
		  </view>
		</view>
</template>
<script>
export default{
	data(){
		return{
			longitude:null,
			latitude:null,
			address:null,
			currentTimeDisplay:"",
			clockInButton:true,
			clockOutButton:false,
			outCheckIn:true,
			deviceIds: [
				{
					deviceId:"30:AE:A4:2C:5A:B5"
					},
					]
		}
	},
	methods:{
		getAddress(){
			uni.getLocation({
			type:'gcj02',
			geocode:true,
			isHighAccuracy:true,
			success: (res1) => {
				console.log(res1)
				//获取经纬度
				this.longitude=res1.longitude;
				this.latitude=res1.latitude;
				//选择地点
				uni.chooseLocation({
					success: (res2) => {
						console.log(res2)
								if(Math.abs(res1.longitude-res2.longitude)<0.0002&&Math.abs(res1.latitude-res2.latitude)<0.0002){
									this.address=res2.name
									uni.showToast({
										title:"定位成功",
										icon:'success'
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
			if((hours===9&&minutes===0)||hours<9){
				this.clockInButton=false;	
			}else{
			this.clockInButton=true;
			}
			if((hours>=17&&minutes>=30)||hours>=18){
				this.clockOutButton=false
			}else{
				this.clockOutButton=true
			}
		},
		show(){
			uni.showToast({
				icon:'success',
				title:"打卡成功"
			})
		},
		scanBluetooth() {
		      // 确保蓝牙适配器已开启
		      uni.openBluetoothAdapter({
		        success: () => {
					// 开始扫描蓝牙设备
					uni.startBluetoothDevicesDiscovery({
					  success: (res) => {
						console.log('开始扫描蓝牙设备'+res);
					  // 监听找到蓝牙设备事件
					  uni.onBluetoothDeviceFound(devices => {
					    this.deviceIds.map(deviceId=>{
							if(deviceId.deviceId===devices.devices[0].deviceId){
							// 找到设备后停止扫描
								uni.stopBluetoothDevicesDiscovery({
								  success: () => {
									  console.log('蓝牙扫描已停止,已经扫到蓝牙:'+devices.devices[0].deviceId)
									  uni.showToast({
									  	title:"成功连接蓝牙",
										icon:'success',
										duration:1000,
										success:()=>{
											this.outCheckIn=false
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
		this.scanBluetooth();
	},
	updated() {
		this.updateTime()
	},
}
</script>

