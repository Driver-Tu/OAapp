<style lang="scss">
	.input{
		input{
			border: 1rpx solid #000;
			padding: 20rpx;
			height: 40rpx;
			border-radius: 10rpx;
		}
	}
</style>
<template>
	<view>
		<uni-section title="更改密码" type="line">
			<uni-card>
				<view class="input">
					<uni-section title="输入老密码" type="circle">
						<input v-model="oldPassword"/>
					</uni-section>
				</view>
				<view class="input">
					<uni-section title="输入新密码" type="circle">
						<input v-model="newPassword"/>
					</uni-section>
				</view>
				<view class="input">
					<uni-section title="确认新密码" type="circle">
						<input v-model="endPassword"/>
					</uni-section>
				</view>
			</uni-card>
		</uni-section>
		<button type="primary" style="border-radius: 10rpx;width: 50vw;" @click="updatePassword()">修改密码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword:null,
				newPassword:null,
				endPassword:null
			}
		},
		methods: {
			updatePassword(){
				if(this.oldPassword===null||this.newPassword===null||this.endPassword===null){
					uni.showModal({
						showCancel:false,
						title:"警告",
						content:"请将数据填写完毕"
					})
				}else if(this.newPassword!==this.endPassword){
					uni.showModal({
						showCancel:false,
						title:"警告",
						content:"两个新密码不一致"
					})
					//数据核对成功
				}else{
					this.update()
				}
			},
			update(){
				uni.request({
					url:"http://8.129.26.229:8088/user/updateSelfPassword?oldPassword="+this.oldPassword+"&newPassword="+this.newPassword,
					method:"POST",
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					success: (res) => {
						console.log(res)
						if(res.data.code==="200"){
							uni.showModal({
								title:"恭喜",
								content:"更改成功",
								showCancel:false,
								success: (res1) => {
									if(res1.confirm){
										uni.navigateBack({
											delta:1
										})
									}
								}
							})
						}else{
							uni.showModal({
								title:"警告",
								content:res.data.msg,
								showCancel:false,
								complete: (com) => {
									uni.navigateBack({
										delta:1
									})
								}
							})
						}
					},
					fail: (err) => {
						console.log(err)
					}
				})
			}
		}
	}
</script>


