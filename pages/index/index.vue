<template >
	<view class="content" >
		<image class="logo" src="/static/logo.png" style="position: fixed;top: 10%;"></image>
		<view class="text-area" style="position: fixed;top: 45%;">
			<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
							<view class="title">工号/手机号</view>
							<input class="uni-input" v-model="loginAll.empNum" placeholder="请输入您的工号" />
						</view>
			<view class="uni-form-item uni-column">
							<view class="title">密码</view>
							<input class="uni-input" v-model="loginAll.password" password type="text" placeholder="请输入您的密码" />
						</view>
						<navigator url="/pages/main/main" open-type="switchTab"><button class="button-login" click="button-login" @click="login">登录</button></navigator>
						</view>
		</view>
	</view>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';

	const loginAll=reactive({
		empNum:uni.getStorageSync("empNum"),
		password:""
	})
	const data=ref("")
let login=()=>{
	let res=uni.request({
		url:"http://192.168.0.196:8088/user/login?empNum="+loginAll.empNum+"&password="+loginAll.password,
		method:'POST'
	}).then(function (res){
		console.log(res)
	if(res.data.code==="200"){
		uni.setStorageSync("empNum",loginAll.empNum)
		uni.setStorageSync("satoken",res.data.data.tokenValue)
	}else{
		alert(res.data.message)
	}})
	.catch(function (error){
		console.log(error)
	})
}
</script>

<style>
	
	.el-input{
		margin: 50px auto 20px auto;
	}
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
		border-radius: 50px;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: green;
	}
	.uni-form-item uni-column{
		width: 300px;
		height: 40%;
		margin: 20px auto 20px auto;
	}
	.uni-input{
		border-bottom: 1px solid green;
		width: 300px;
		height: 40%;
		margin: 20px auto 20px auto;
	}
	.button-login{
		background-color: seagreen;
		color: aliceblue;
		 border-radius: 25px; 
	}
	html, body{
	  height: 100%;
	  margin: 0;
	  padding: 0;
	  background-color: #f9eee8;
	}
</style>
