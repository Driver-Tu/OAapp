<template>
	<view class="content">
		<view class="content-image">
			<image class="image" src="../../static/头像/self.png"></image>
			<view class="text-image">
				<text>合作伙伴</text>
				<text>{{userName}}</text>
				</view>
		</view>
		<view class="content-text">
			<button @click="getSelfMessage">点击我</button>
		</view>
	</view>
</template>

<script setup>
import { ElNotification } from 'element-plus'
import { ref } from 'vue';
const userName=ref("")
const getSelfMessage=()=>{
	uni.request({
		url:"http://localhost:8088/user/info",
		method:'GET',
		header:{
			"satoken":uni.getStorageSync("satoken")
		}
	}).then(function(res){
		console.log(res)
		if(res.data.code==="200"){
		userName.value=res.data.data.userName
		Success(res.data.message)
		}else{
		Warning("用户未登录")
		}
	}).catch(function(error){
		Error(error)
	})
}
function Success(str){
	ElNotification({
	    title: '成功',
	    message: str,
	    type: 'success'
	  })
}
function Warning(str){
	ElNotification({
	    title: '警告',
	    message: str,
	    type: 'warning'
	  })
}
function Error(str){
	ElNotification({
	    title: '错误',
	    message: str,
	    type: 'error'
	  })
}
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
	background-color: #f0f0f0; /* 背景颜色 */
	
}
.image{
	position: fixed;
	top: 10vh;
	width: 100px;
	height: 100px;
	border-radius: 50px;
}

/* 使用媒体查询来为不同屏幕大小设置不同的间距 */
@media (max-width: 750px) {
  .text-image {
    font-size: 20px; /* 小屏幕上的字体大小 */
  }
  .image + .text-image {
    margin-top: 30vw; /* 视口宽度的5%作为间距 */
  }
}
</style>
