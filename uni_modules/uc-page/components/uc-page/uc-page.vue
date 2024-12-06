<template>
	<view class="uc-page">
		<!-- 导航 -->
		<view v-if="navBar" class="nav-bar"
			:style="{height: screen.navHeight + screen.safeTop + 'px',background:navBackgroundColor}">
			<!-- 导航背景图 -->
			<image v-if="navBackgroundImage!=undefined" class="nav-image" :src="navBackgroundImage" mode="aspectFill">
			</image>
			<view class="content" :style="{height: screen.navHeight + 'px',top:screen.safeTop+'px'}">
				<view class="nav-left">
					<view v-if="!$slots.left && showBack"
						style="display: flex;align-items: center;justify-content: center; width: 80rpx;"
						@tap="backEvent">
						<uni-icons type="back" size="20" color="#fff"></uni-icons>
					</view>
					<slot name="left"></slot>
				</view>
				<view class="nav-title">
					<view v-if="!$slots.title">
						{{title}}
					</view>
					<slot name="title"></slot>
				</view>
				<view class="nav-right" :style="{right: screen.safeRight+'px'}">
					<slot name="right"></slot>
				</view>
			</view>
		</view>

		<view class="uc-subHeader" v-if="subHeaderHeight != 0"
			:style="{top:navBar?(screen.navHeight + screen.safeTop + 'px'):0, height: subHeaderHeight +'rpx'}">
			<slot name="subHeader"></slot>
		</view>
		<!-- 主体 -->
		<view class="uc-body" :style="{top:bodyTop,bottom:btmHeight, zIndex:bodyZIndex}">
			<scroll-view scroll-y="true" class="scroll-content" enable-flex style="background-color: transparent"
				:refresher-enabled="enableRefresh" refresher-background="transparent" @refresherrefresh="refresh"
				:refresher-triggered='refreshing' @scrolltolower="loadMore" @scroll="onScroll">
				<view class="body-bg">
					<view class="body-blew">
						<slot name="body-blew"></slot>
					</view>
					<view class="body-above" :style="{top:bodyOffsetY +'rpx'}">
						<uc-empty-view :status="status" />
						<slot v-if="status==UCEmptyStatus.done">
						</slot>
						<uni-load-more :status="more" v-if="enableLoadMore&&status==UCEmptyStatus.done"></uni-load-more>
					</view>
				</view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view v-if="status==UCEmptyStatus.done||status==UCEmptyStatus.empty" class="uc-footer-bg"
			:style="{height:btmHeight ,zIndex: footerZIndex,background:footerBgCor}">
			<view class="uc-footer" :style="{bottom:containBottomSafeArea?0:(safeAreaInsets.bottom) + 'px' }">
				<slot name="cus-footer" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import UcEmptyView from '@/uni_modules/uc-empty-view/components/uc-empty-view/uc-empty-view.vue'

	import {
		reactive,
		ref,
		defineProps,
		defineEmits,
		computed
	} from 'vue'
	import UCEmptyStatus from '../../../uc-empty-view/components/uc-empty-view/uc-empty-status.js';

	import data from './props.js'

	const props = defineProps(data)
	const emits = defineEmits(['scroll', 'back'])
	let safeAreaInsets, screenWidth
	if (getApp().globalData.safeAreaInsets == undefined) {
		const info = uni.getSystemInfoSync()
		safeAreaInsets = info.safeAreaInsets
		screenWidth = info.screenWidth
		getApp().globalData.screenWidth = screenWidth
		console.log(safeAreaInsets)
		if (safeAreaInsets.bottom != 0 || info.platform == 'android') {
			getApp().globalData.safeAreaInsets = safeAreaInsets
		}
	} else {
		safeAreaInsets = getApp().globalData.safeAreaInsets
		screenWidth = getApp().globalData.screenWidth
	}
	let navHeight = 44
	let marginRight = 0
	// 导航高度 44px
	// #ifdef MP-WEIXIN
	const menuRect = uni.getMenuButtonBoundingClientRect()
	marginRight = screenWidth - menuRect.left
	// #endif

	const screen = reactive({
		safeTop: safeAreaInsets.top,
		safeRight: marginRight,
		safeBottom: safeAreaInsets.bottom,
		navHeight: navHeight
	})

	const bodyTop = computed(() => {
		return props.fullScreen ? 0 : (props.navBar ? (safeAreaInsets.top + navHeight) : 0) + rpxToPx(props
			.subHeaderHeight) + 'px'
	})

	const bodyBottom = computed(() => {
		return btmHeight
	})

	const btmHeight = computed(() => {
		// #ifdef H5
		if (props.bottomHeight == 0 && props.root) {
			return 50 + 'px'
		}
		// #endif

		if (props.status == UCEmptyStatus.done) {
			return props.containBottomSafeArea ? props.bottomHeight + 'rpx' : safeAreaInsets.bottom + rpxToPx(props
				.bottomHeight) + 'px'
		}
		return 0
	})

	// 将rpx转化为px
	function rpxToPx(rpx) {
		const screenWidth = uni.getSystemInfoSync().screenWidth
		return (screenWidth * Number.parseInt(rpx)) / 750
	}

	// 下拉刷新
	function refresh() {
		if (props.refresh != undefined) {
			props.refresh()
		}
	}
	// 上拉加载更多
	function loadMore() {
		if (props.loadMore != undefined) {
			props.loadMore()
		}
	}

	function onScroll(e) {
		emits('scroll', e)
	}

	function backEvent() {
		emits('back')
		uni.navigateBack()
	}
</script>

<style scoped lang="scss">
	.uc-page {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $uni-bg-color-grey;
		color: #333;

		.nav-bar {
			position: fixed;
			z-index: 1;
			left: 0;
			top: 0;
			right: 0;
			display: flex;
			flex-direction: column;

			.nav-image {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
			}

			.content {
				display: flex;
				position: absolute;
				left: 0;
				width: 100%;

				.nav-left {
					display: flex;
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					align-items: center;
					justify-content: center;
				}

				.nav-title {
					align-items: center;
					justify-content: center;
					display: flex;
					position: relative;
					font-weight: bold;
					font-size: 17px;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}

				.nav-right {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;
					position: absolute;
					background: red;
					top: 0;
					bottom: 0;
				}
			}
		}
	}



	.uc-top-bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}

	.uc-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.uc-nav-status {
		background-color: transparent;
	}

	.uc-subHeader {
		position: absolute;
		left: 0;
		right: 0;
	}

	.uc-body {
		color: #333;
		position: fixed;
		left: 0;
		right: 0;
		overflow: auto;
	}

	.scroll-content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.body-bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.body-above {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: transparent;
	}

	.uc-footer-bg {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.uc-footer {
		position: absolute;
		left: 0;
		right: 0;
	}
</style>