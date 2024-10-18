<template>
  <view class="mine-empty">
    <view class="mine-empty__image">
      <image src="/component/img/empty.png" mode="aspectFit"></image>
    </view>
    <view class="mine-empty__text">
      {{text}}
    </view>
    <slot></slot>
  </view>
</template>
 
<script>
  export default {
    name: "mine-empty",
    props: {
      mode: {
        type: String,
        default: 'noData'
      },
      text: {
        type: String,
        default: '暂无数据'
      },
    }
  }
</script>
 
<style lang="scss">
  .mine-empty {
    padding: 100rpx;
    .mine-empty__image {
      display: flex;
      justify-content: center;
      align-items: center;
 
      image {
        width: 520upx;
        height: 260upx;
        display: block;
      }
    }
    .mine-empty__text{
      font-size: 28px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20upx;
    }
  }
</style>