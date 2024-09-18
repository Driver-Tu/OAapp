<script>
	export default {
		onLaunch: function() {
			let token=uni.getStorageSync("satoken")
			if(!token){
				uni.navigateTo({
					url:"/pages/index/index",
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
