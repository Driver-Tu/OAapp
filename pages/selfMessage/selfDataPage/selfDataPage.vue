<template>
	<uni-list>
			<uni-list-item v-for="item in list1" :title="item.text" showArrow
						:thumb="item.img"
						thumb-size="lg" rightText="点击查看" link="navigateTo" :to="item.url" />
				</uni-list>
</template>

<script>
	export default {
		data() {
			return {
				list1:[{
						img:"/static/selfImage/grrz.png",
						text:"个人日志",
						url:"/pages/logDay/logDay",
					},{
						img:"/static/selfImage/dkxx.png",
						text:"打卡信息",
						url:"/pages/selfMessage/punchMessage",
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
