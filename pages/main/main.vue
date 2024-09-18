<template>
	<view>
		<view class="div1" style="width: 100%; height: 30vh;background-color: aqua;">
			
		</view>
		<view class="div1" style="width: 100%; height: 40vh;background-color: green;">
			
		</view>
		<view class="div1" style="width: 100%; height: 30vh;background-color: red;">
			
		</view>
	</view>
</template>

<script>
import { ref } from "vue"


uni.getLocation({
		type: 'gcj02',
		success: function (res) {
			console.log('当前位置的经度：' + res.longitude);
			console.log('当前位置的纬度：' + res.latitude);
		}
	});
</script>

<style>

</style>
