<template>
	<view class="content">
		<view class="content-image">
			<image class="image" src="../../static/selfImage/self.png"></image>
		</view>
		<view class="text-image">
			<text>合作伙伴</text>
			<text>{{userName}}</text>
		</view>
		<view class="content-text">
			<button @click="getSelfMessage">点击我</button>
			<navigator url="/pages/index/index"><button @click="logout">退出登录</button></navigator>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const userName=ref("")
const getSelfMessage=()=>{
	if(uni.getStorageSync("satoken")){
		uni.request({
			url:"http://192.168.0.196:8088/user/info",
			method:'GET',
			header:{
				"satoken":uni.getStorageSync("satoken")
			}
		}).then(function(res){
			console.log(res)
			if(res.data.code==="200"){
			userName.value=res.data.data.userName
			
			}else{
				
			}
		}).catch(function(error){
			
		})
	}else{
		uni.navigateTo({
			url:"/pages/index/index"
		})
	}
}
const LoginFalse=()=>{
	uni.setStorageSync("satoken","")
}
const logout=()=>{
	uni.request({
		url:"http://192.168.0.196:8088/user/logout",
		header:{
			"satoken":uni.getStorageSync("satoken")
		},
		method:'GET'
	}).then(function (res){
		if(res.data.code==="200"){
			uni.setStorageSync("satoken","")
			Success(res.data.msg)
		}else{
			Warning(res.data.msg)
		}
	}).catch(function(error){
		Error(res.data.msg)
	})
}

getSelfMessage()
</script>

<style>
.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
.content-image{
	width: 100vw;
	height: 30vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #c4ffa4; /* 背景颜色 */
	
}
.image{
	position: fixed;
	top: 10vh;
	width: 100px;
	height: 100px;
	border-radius: 50px;
}

.text-image{
	position: fixed;
	margin-top: 10vh;
	}

/* 使用媒体查询来为不同屏幕大小设置不同的间距 */
@media (max-width: 750px) {
  .text-image {
    font-size: 20px; /* 小屏幕上的字体大小 */
  }
}
</style>
