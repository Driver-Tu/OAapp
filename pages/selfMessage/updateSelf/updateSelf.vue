
<style lang="scss">
.layout{
	width: 100vw;
	height: 100vh;
	text{
		padding: 10rpx;
		margin: 5rpx;
		font-weight: 700;
		font-size: 40rpx;
	}
	input{
		border-bottom: 1px solid #001100;
		margin: 10rpx;
		padding: 10rpx;
	}
	button{
		display: inline-block;
	}
	.button-controller{
		width: 100%;
		.okUpdate{
				background-color: #00aaff;
				 width: 44vw; 
				 margin:20rpx;
			}
		.offUpdate{
				background-color: #ff0000; 
				width: 44vw; 
				margin:20rpx;
			}
	}
	
}
</style>
<template>
	<view class="layout">
		<uni-card>
			<text>修改姓名</text>
			<input placeholder="请输入" v-model="userInfo.userName" ></input>
			<text style="margin: 5rpx;padding: 5rpx;">修改手机号</text>
			<input placeholder="请输入" v-model="userInfo.telephone" ></input>
			<text style="margin: 5rpx;padding: 5rpx;">修改邮箱</text>
			<input placeholder="请输入" v-model="userInfo.email"></input>
		</uni-card>
		<view class="button-controller">
			<button class="okUpdate" @click="updateSelfMessage" type="primary">提交修改</button>
			<button class="offUpdate" @click="offUpdate" type="primary">取消修改</button>
		</view>
	</view>
</template>

<script>
	function validateInput(inputValue) {
	    // 手机号正则表达式
	    const phoneRegex = /^1[3-9]\d{9}$/;
	    // QQ邮箱正则表达式
	    const qqEmailRegex = /^[1-9]\d{4,11}@qq\.com$/;
		if(inputValue.telephone===null&&inputValue.email===null&&inputValue.userName===null){
			return "请输入要修改的数据s"
		}
			// 判断是否为手机号
		if(!phoneRegex.test(inputValue.telephone)&&inputValue.telephone!==null){
			return "手机号格式错误"
		}
		if (!qqEmailRegex.test(inputValue.email)&&inputValue.email!==null) {
			return "QQ邮箱格式不正确"
		}
		// 如果都不是，则返回正确信息
	    return "数据正确";
	}
	export default {
		data() {
			return {
				userInfo:{
					telephone:null,
					email:null,
					userName:null
				}
			}
		},
		methods: {
			offUpdate(){
				uni.showModal({
					title:"提示",
					content:"您确定要退出修改?",
					success:function(res){
						if(res.confirm){
							uni.navigateBack({
								delta:1
							})
						}else if(res.cancel){
						}
					},
					fail:(error)=> {
						console.log(error)
					}
				})
				
			},
			updateSelfMessage(){
				if(validateInput(this.userInfo)==="数据正确"){
					uni.request({
						url:"http://192.168.0.196:8088/user/updateUserInfo",
						method:'POST',
						header:{
							"satoken":uni.getStorageSync("satoken")
						},
						data:this.userInfo,
						success:(res)=> {
							uni.showModal({
								title:res.data.msg,
								content:"修改成功",
								success(){
									uni.navigateBack({
										delta:1
									})
								}
							})
						},
						fail: (error) => {
							console.log(error)
						}
					})
				}else{
					uni.showModal({
						title:"警告",
						content:validateInput(this.userInfo)
					})
				}
			},
		}
	}
</script>

