<template >
	<view style="height:25vh;background-color: #00aaff;">
		<view style="font-size: 30px;">
			<view><text style="color:#ffffff;position: absolute;">智能化一键打卡</text></view>
			<view><text style="color:#ffffff;position: absolute;top: 18vh;">享受智能化办公</text></view>
			<view><text style="color:#ffffff;position: absolute;top: 9vh;right:0;">智能化流程审批</text></view>
		</view>
	</view>
	
	<view class="content" >
		<view class="text-area" style="position: absolute;top: 30vh;">
			<view style="text-align: center; margin-bottom: 20px; color: #000000;font-size: 40px;">
				<text>登录</text>
			</view>
			<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
							<view class="title"><uni-icons type="contact" size="33"></uni-icons>工号/手机号</view>
							<input class="uni-input" v-model="loginAll.empNum" placeholder="请输入您的工号" />
						</view>
			<view class="uni-form-item uni-column">
							<view class="title"><uni-icons type="eye-filled" size="33"></uni-icons>密码</view>
							<input class="uni-input" v-model="loginAll.password" password type="text" placeholder="请输入您的密码"></input>
						</view>
						<button class="button-login" click="button-login" @click="login">登录</button>
						</view>
		</view>
	</view>
	<view style="text-align: center;position: fixed;bottom: 10vh;">
		<text>湖北富辰方舟企业管理咨询有限公司</text>
		<text>https://www.fcfz.com</text>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';

const loginAll=reactive({
		empNum:uni.getStorageSync("empNum"),
		password:uni.getStorageSync("password")
	});
const data=ref("");
const login=()=>{
	uni.request({
		url:"http://192.168.0.196:8088/user/login?empNum="+loginAll.empNum+"&password="+loginAll.password+"&device=app",
		method:'POST',
		success: (res) => {
			if(res.data.code==="200"){
				// 登录成功后设置登录状态
				uni.setStorageSync("empNum",loginAll.empNum)
				uni.setStorageSync("satoken",res.data.data.tokenValue)
				uni.showToast({
					title:"登陆成功",
					icon:'success',
					duration:1000,
					mask:true,
				})
				uni.switchTab({
					url:"/pages/main/main",
				})
			}else{
				uni.showModal({
					title:"警告",
					content:res.data.msg
				})
			}
		},
		fail: (error) => {
			uni.showToast({
				title:"页面错误!!!",
				icon:'error',
				duration:5000,
				mask:true,
			})
		}
	})
}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border:  2px solid #dfdfd2;
	}
	.text-area {
		width: 70%;
		height: 40vh;
	}

	.title {
		font-size: 36rpx;
		color: #000000;
	}
	.uni-input{
		border-bottom: 1px solid #000000;
		width: 100%;
		height: 40%;
		margin: 20px auto 20px auto;
	}
	.button-login{
		background-color: #00aaff;
		color: aliceblue;
		 border-radius: 25px; 
	}
	html, body{
	  height: 100%;
	  margin: 0;
	  padding: 0;
	  background-color: #fdfff3;
	}
</style>
