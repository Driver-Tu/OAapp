<style lang="scss">
	.row {
	  display: flex;
	  flex-direction: column; // 子元素垂直排列，每个item占一行
	  width: 100%; // 占满整个容器宽度
	
	  .item {
	    display: flex;
	    justify-content: center; // 子元素水平居中
	    align-items: center; // 子元素垂直居中
	    width: 100%; // 每个项目占满整行宽度
	    padding: 15px; // 内边距
	    margin-bottom: 10px; // 项目之间的间距
	    border-radius: 8px; // 圆角边框
	    background-color: #ffffff; // 背景颜色
	    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 阴影效果
	    transition: background-color 0.3s; // 过渡效果
	
	    &:hover {
	      background-color: #e0e0e0; // 鼠标悬停时的背景颜色
	    }
	
	    .center {
	      font-size: 16px; // 文本字体大小
	      color: #333; // 文本颜色
	    }
	  }
	}
</style>
<template>
	    <view class="row">
	      <view class="item" v-for="item in list3" :key="item.text" @click="changePage(item.url, item.text)">
	        <view class="center">
	          {{ item.text }}
	        </view>
	      </view>
	    </view>
</template>

<script>
	export default {
		data() {
			return {
				list3:[
					{
						type:"close",
						text:"切换账号",
						url:""
					},{
						type:"home",
						text:"退出登录",
						url:"/pages/index/index"
					}
				],
			}
		},
		methods: {
			changePage(str1,str2){
				uni.navigateTo({
					url:str1,
					success() {
						if(str2==="退出登录"){
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
									}
								},
								fail:(error)=>{
									console.log(error)
									uni.showToast({
										title:"页面错误!!!",
										icon:'error',
										duration:1000,
										mask:true,
									})
								}
							});
							uni.showToast({
								icon:'success',
								title:"退出成功",
								duration:1000
							})
						}else{
							uni.showToast({
								icon:'success',
								title:str2,
								duration:1000
							})
						}
					},
					fail() {
						uni.showToast({
							icon:'fail',
							title:"页面待开发!",
							duration:1000
						})
					}
				})
			},
		}
	}
</script>

