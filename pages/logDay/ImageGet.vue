<script setup>
import {onBeforeMount, ref} from 'vue';

const props = defineProps({
  src: String,
  token: String
});

const tempUrl = ref(null);

onBeforeMount(async () => {
 tempUrl.value = await uni.request({
  	url:"http://localhost:8088/report/file/getData?objectName="+props.src,
	method:"GET",
	headers: {
	  satoken: props.token,
	},
	responseType:"blob",
	success: (res) => {
		tempUrl.value=res.data
	},
	fail: (error) => {
	}
  });
  // 通过 axios 请求获取到的图片数据的 Blob 转换为一个临时的 URL
});
</script>

<template>
  <img :src="tempUrl" />
</template>
