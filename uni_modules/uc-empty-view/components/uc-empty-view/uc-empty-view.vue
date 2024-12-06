<template>
	<view class="empty-bg" v-if="status != UCEmptyStatus.done">
		<view class="empty-body">
			<!-- 加载中 -->
			<view class="uc-empty-loading" v-if="status == UCEmptyStatus.loading">
				<view>
					<view class="spinner">
						<view class="bounce1 spinner-view"></view>
						<view class="bounce2 spinner-view"></view>
						<view class="bounce3 spinner-view"></view>
					</view>
				</view>
			</view>
			<!-- 无数据 -->
			<view class="uc-empty-empty" v-if="status == UCEmptyStatus.empty">
				<view>
					<image src="@/uni_modules/uc-empty-view/static/icon_empty.png" />
				</view>
				<view class="uc-empty-notice">
					<text>什么也没有</text>
				</view>
			</view>
			<!-- 请求错误 -->
			<view class="uc-empty-error" v-if="status == UCEmptyStatus.error">
				<view>
					<image src="@/uni_modules/uc-empty-view/static/icon_error.png" />
				</view>
				<view class="uc-empty-notice">
					<text>网络出错了</text>
				</view>
				<slot name="cus-error"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
	import UCEmptyStatus from './uc-empty-status.js'

	import {
		defineProps,
	} from 'vue'

	defineProps({
		// 网络加载状态
		status: {
			type: String,
			default: UCEmptyStatus.done
		},
		emptyNotice: {
			type: String,
			default: '什么也没有'
		},
		errorNotice: {
			type: String,
			default: '网络出错了'
		}
	})
</script>

<style scoped>
	.empty-bg {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.empty-body {
		justify-content: center;
		align-items: center;
	}

	.uc-empty-loading {
		margin-bottom: 200rpx;
	}

	.uc-empty-empty {
		background-color: transparent;
	}

	.uc-empty-error {
		background-color: transparent;
	}

	.uc-empty-notice {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999;
	}

	.spinner {
		background-color: transparent;
		display: flex;
		flex-direction: row;
	}

	.spinner-view {
		width: 10rpx;
		height: 10rpx;
		background-color: #167BEF;

		border-radius: 50%;
		display: inline-block;
		-webkit-animation: bouncedelay 1.4s infinite ease-in-out;
		animation: bouncedelay 1.4s infinite ease-in-out;
		/* Prevent first frame from flickering when animation starts */
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.spinner .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.spinner .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes bouncedelay {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0.0)
		}

		40% {
			-webkit-transform: scale(1.0)
		}
	}

	@keyframes bouncedelay {

		0%,
		80%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}

		40% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>