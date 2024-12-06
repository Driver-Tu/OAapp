import UCEmptyStatus from '@/uni_modules/uc-empty-view/components/uc-empty-view/uc-empty-status.js'

const props = {
	// 是否全屏
	fullScreen: {
		type: Boolean,
		default: false
	},
	showBack: {
		type: Boolean,
		default: true
	},
	navBar: {
		type: Boolean,
		default: true
	},
	// 顶部背景
	navBackgroundColor: {
		type: String,
		default: '#fff'
	},
	navBackgroundImage: {
		type: String
	},
	// 副标题高度
	subHeaderHeight: {
		type: Number,
		default: 0
	},
	bodyOffsetY: {
		type: Number,
		default: 0
	},
	title: {
		type: String,
		default: ''
	},
	fontSize: {
		type: Number,
		default: 32
	},
	fontFamily: {
		type: String,
		default: "Source Han Sans SC"
	},
	fontWight: {
		type: String,
		default: '500'
	},
	fontColor: {
		type: String,
		default: '#111'
	},

	// 底部高度
	bottomHeight: {
		type: Number,
		default: 0
	},
	// 计算底部高度时是否包含安全区域
	containBottomSafeArea: {
		type: Boolean,
		default: true
	},
	footerBgCor: {
		type: String,
		default: '#fff'
	},
	// 是否是tabbar 页面
	root: {
		type: Boolean,
		default: false
	},
	// 网络请求状态
	status: {
		type: String,
		default: UCEmptyStatus.loading
	},
	headerZIndex: {
		type: Number,
		default: 2
	},
	bodyZIndex: {
		type: Number,
		default: 0
	},
	footerZIndex: {
		type: Number,
		default: 1
	},
	cusHeader: {
		type: Boolean,
		default: false
	},
	backColor: {
		type: String,
		default: 'white'
	},
	enableRefresh: {
		type: Boolean,
		default: false
	},
	enableLoadMore: {
		type: Boolean,
		default: false
	},
	refresh: {
		type: Function
	},
	loadMore: {
		type: Function
	},
	refreshing: {
		type: Boolean,
		default: false
	},
	// 'loading' 'more' 'no-more'
	more: {
		type: String,
		default: 'loading'
	}
}

export default props