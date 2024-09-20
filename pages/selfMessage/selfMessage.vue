<template>
	<view class="text-image" style="">
		<button style="font-size: 10px;border: none;margin: 0;
		padding: 0;outline: none;background-color: transparent;
		line-height: normal;"><uni-icons type="compose" size="15"></uni-icons></button>
	</view>
	<view class="content">
		<view class="content-image">
			<image class="image" src="../../static/selfImage/self.png"></image>
		</view>
	</view>
	<view class="content-text">
		<button>员工姓名：{{userMessage.userName}}</button>
		<button>部门名称：{{userMessage.departmentName}}</button>
		<button>QQ邮箱：{{userMessage.email}}</button>
		<button>电话号码：{{userMessage.telephone}}</button>
		<button>状态：{{userMessage.status}}</button>
		<button>工号：{{userMessage.empNum}}</button>
		<button>入职时间：{{userMessage.ctTime}}</button>
		<button @click="getSelfMessage">获取个人信息</button>
		<navigator url="/pages/index/index"><button @click="logout">退出登录</button></navigator>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';
const userMessage=reactive({
	userName:"",
	departmentName:"",
	userName:null,
	departmentName:null,
	empNum:null,
	telephone:null,
	email:null,
	status:null,
	ctTime:null
})
const getSelfMessage=()=>{
	if(uni.getStorageSync("satoken")){
		uni.request({
			url:"http://192.168.0.196:8088/user/info",
			method:'GET',
			header:{
				"satoken":uni.getStorageSync("satoken")
			},
			success:(res)=>{
			console.log(res)
			if(res.data.code==="200"){
			userMessage.userName=res.data.data.userName
			userMessage.departmentName=res.data.data.departmentName
			userMessage.email=res.data.data.email
			userMessage.telephone=res.data.data.telephone
			userMessage.status=res.data.data.status
			userMessage.empNum=res.data.data.empNum
			const date =new Date(res.data.data.ctTime)
			userMessage.ctTime=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay()
			uni.showToast({
				title:res.data.msg,
				icon:'fail',
				duration:1000,
				mask:true
			})
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
}
const logout=()=>{
	uni.request({
		url:"http://192.168.0.196:8088/user/logout",
		header:{
			"satoken":uni.getStorageSync("satoken")
		},
		method:'GET',
		success:(res)=>{
			if(res.data.code==="200"){
				uni.setStorageSync("satoken","")
				uni.showToast({
					title:"退出成功",
					icon:'success',
					duration:1000,
					mask:true,
				})
			}else{
				uni.showToast({
					title:res.data.msg,
					icon:'error',
					duration:1000,
					mask:true,
				})
				console.log(uni.getStorageSync("satoken"))
			}
		},
		fail:(error)=>{
			console.log(error)
			uni.showToast({
				title:"页面错误!!!",
				icon:'error',
				duration:5000,
				mask:true,
			})
		}
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
	background-color: #aaffff; /* 背景颜色 */
	
}
.image{
	position: fixed;
	width: 100px;
	height: 100px;
	border-radius: 50px;
}
.text-image{
	position: absolute;
	right:0;
	}
.content-text{
	width: 100%;
	text-align: left;
}
/* 使用媒体查询来为不同屏幕大小设置不同的间距 */
@media (max-width: 750px) {
  .text-image {
    font-size: 30px; /* 小屏幕上的字体大小 */
  }
}
</style>
