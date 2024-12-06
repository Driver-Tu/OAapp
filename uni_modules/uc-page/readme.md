# uc-page


```json
"app-plus": {
	"bounce": "none"
}
```


示例一：顶部侵入式背景图片
```vue
<template>
	<uc-page root fullScreen navBackgroundColor="linear-gradient(to bottom, #ffffff, rgba(0,0,0,0))" :more="loading"
		enableLoadMore :loadMore="getMore" :status="data.status">
		<template #left>
			<text style="padding-left: 20rpx;color: #fff;font-size: 17px;">遇见·更好的你</text>
		</template>
		<!-- banner -->
		<swiper style="height: 450rpx;" :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in data.banners" :key="index">
				<view class="swiper-item" @click="clickItem(item)">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 菜单 -->
		<uc-menu :datas="data.menus" column="2" @clickMenu="clickMenu"></uc-menu>
		<!-- tab -->
		<uc-tab @clickAtIndex="clickAtIndex" :datas="data.tabs"></uc-tab>
		<!-- 列表数据 -->
		<view>
			<view v-for="(item,index) in data.list" :key="item._id">
				<user-cell @tap="userDetail(item)" :user="item"></user-cell>
			</view>
		</view>

	</uc-page>
</template>
```


示例二： subheader refresh  loadmore status
```vue
<template>
	<uc-page :title="data.title" :status="data.status" :subHeaderHeight="80" enableRefresh enableLoadMore
		:refresh="refresh" :loadMore="loadMore" :refreshing="data.refreshing" :more="data.more">
		<template #subHeader v-if="data.type==3">
			<view style="width: 100%;height: 40px;position: relative;">
				<uc-tab @clickAtIndex="clickAtIndex" :datas="data.tabs.items"></uc-tab>
			</view>
		</template>
		<view class="section">
			<view v-for="(item,index) in data.tabs.items[data.tabs.current].datas" :key="index">
				<user-cell :user="item"></user-cell>
			</view>
		</view>
	</uc-page>
	<view v-if="data.type==3" class="add" @click="addEvent">
		<uni-icons type="plusempty" color="#b60001" size="20"></uni-icons>
	</view>
</template>
```

