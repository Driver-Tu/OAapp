<template>
	<view>
		dasdasdsadasd
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:{
    "pageNum":1,
    "pageSize":10,
    "data":{}

},
             allData:[]
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			getData(){
				uni.request({
					url:"http://localhost:8088/report/list",
					header:{
						"satoken":uni.getStorageSync("satoken")
					},
					data:this.data,
					method:'POST',
					success: (res) => {
						console.log(res)
					},
					fail: (fail) => {
						console.log(fail)
					}
				})
			}
		}
	}
</script>

<style>

</style>
