export let getAddress=()=>uni.getLocation({
	type:'gcj02',
	success: (res) => {
		console.log('当前位置的经度：' + res.longitude);
		console.log('当前位置的纬度：' + res.latitude);
	},
	fail: (error) => {
		console.log(error)
	}
})