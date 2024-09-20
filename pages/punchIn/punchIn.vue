<template>
	
	<view>
		<button @click="getAddress">打卡地址为：{{address}}</button>
	</view>
	<view>
			<view class="page-body">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 30vh;" :latitude="latitude" :longitude="longitude" :show-location="true">
					</map>
				</view>
			</view>
		</view>
		<view class="attendance-container">
		  <view class="attendance-title">上班打卡时间为早上九点之前</view>
		  <view class="attendance-title">下班打卡时间为下午五点半之后</view>
		  <view class="current-time" id="currentTimeDisplay">{{currentTimeDisplay}}</view>
		  <view class="attendance-clock-in-out">
		    <button class="attendance-button"  :disabled="clockInButton" @click="show()" >打卡上班</button>
		    <button class="attendance-button"  :disabled="clockOutButton" @click="show()">打卡下班</button>
		  </view>
		</view>
</template>

<script setup>
import { ref } from 'vue';
const longitude=ref()
const latitude=ref()
const address=ref()
let getAddress=()=>{uni.getLocation({
	type:'gcj02',
	geocode:true,
	isHighAccuracy:true,
	success: (res1) => {
		console.log(res1)
		//获取经纬度
		longitude.value=res1.longitude;
		latitude.value=res1.latitude;
		//选择地点
		uni.chooseLocation({
			success: (res2) => {
				console.log(res2)
						const latitudeNew=res2.latitude;
						const longitudeNew=res2.longitude;
						console.log(Math.abs(longitude.value-longitudeNew))
						console.log(Math.abs(latitude.value-latitudeNew))
						if(Math.abs(longitude.value-longitudeNew)<0.0002&&Math.abs(latitude.value-latitudeNew)<0.0002){
							address.value=res2.name
							uni.showToast({
								title:"定位成功",
								icon:'success',
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
)}
const currentTimeDisplay=ref("");
const clockInButton=ref(true)
const clockOutButton=ref(false)
const moTitle=ref("")
const afTitle=ref("")
	function updateTime() {
	    const now = new Date();
	    const hours = now.getHours();
	    const minutes = now.getMinutes();
	    // 更新时间显示
	    currentTimeDisplay.value = `当前时间: ${now.toLocaleTimeString()}`;
		if((hours>=9&&minutes<=0)||hours<9){
			clockInButton.value=false;	
		}else{
		clockInButton.value=true;
		}
		if((hours>=17&&minutes>=30)||hours>=18){
			clockOutButton.value=false
		}else{
			clockOutButton.value=true
		}
	}
		updateTime()
		setInterval(updateTime,1000)
		
		const show=()=>{
			uni.showToast({
				icon:'success',
				title:"打卡成功"
			})
		}
</script>
<style>
	.attendance-container{
		text-align: center;
		
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
</style>
