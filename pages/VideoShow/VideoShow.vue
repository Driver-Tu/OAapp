<template>
		<view class="video" v-for="(i,index) in videoUrl" style="display: inline-block; ">
			<uni-section :title="'视频('+(index+1)+'):'" title-font-size="50rpx" >
				<video :src="i" muted @click="vedioPreview(i)" style="margin: 20rpx 5vw ;width: 90vw;height: 500rpx;"></video>
			</uni-section>
		</view>
</template>
<script>
	export default {
		props: ['videoUrls'],
		onLoad(options) {
			if(options.videoUrls){
				this.videoUrl=JSON.parse(options.videoUrls)
			}
		},
		data() {
			return {
				videoUrl:[]
			}
		},
		methods: {
			vedioPreview(i) {
				uni.previewMedia({
					urls: [i]
				})
			},
		}
	}
</script>

<style>

</style>
