<template>
  <view class="page">
   <uni-section title="请选择" type="square">
	   <scroll-view scroll-y="ture" style="max-height: 73vh;">
	   	<view class="user-list">
	   	  <view v-for="user in users" :key="user.userId" class="user-item">
	   	    <view class="user-checkbox">
	   	      <checkbox :checked="isSelected(user)" @click="toggleSelection(user)"/>
	   	    </view>
	   	    <view class="user-info">
	   	      <image class="user-avatar" v-if="isValidImageUrl(user.userImage)" :src="user.userImage" />
	   		  <image class="user-avatar" v-else src="../../../static/tx/default.png"></image>
	   	      <text class="user-name">{{ user.userName }}</text>
	   	    </view>
	   	  </view>
	   	</view>
	   </scroll-view>
   </uni-section>
    <button @click="submitSelection">提交选择</button>
  </view>
</template>

<script>
export default {

  data() {
    return {
      users: [],
      selectedUsers: []
    };
  },
  onShow() {
  	this.getApproval()
  },
  methods: {
	  isValidImageUrl(imageUrl) {
	    // 正则表达式，用于匹配常见的图片格式
	    const imagePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.jpg|\.jpeg|\.png|\.gif)$/i;
	  
	    // 检查是否匹配图片URL正则表达式
	    if (imagePattern.test(imageUrl)) {
	      // 进行可选的HTTP请求检查，这里仅作为示例，实际使用时需要根据项目环境进行调整
	      // return fetch(imageUrl)
	      //   .then(response => response.ok) // 检查响应状态是否OK
	      //   .catch(() => false); // 捕获异常，返回false
	      return true; // 如果不需要HTTP请求检查，直接返回true
	    }
	    return false;
	  },
	  getApproval(){
	  	uni.request({
	  		url:"http://8.129.26.229:8088/user/shareUserList",
	  		method:"GET",
	  		header:{
	  			"satoken":uni.getStorageSync("satoken")
	  		},
	  		success: (res) => {
	  			const resData=res.data.data
	  			// // 转换数据
	  			// const transformedData = resData.reduce((acc, user) => {
	  			//   // 如果acc中没有当前roleName的记录，添加一个新的记录
	  			//   if (!acc.some(item => item.letter === user.roleName)) {
	  			//     acc.push({
	  			//       letter: user.roleName,
	  			//       data: [user.userName]
	  			//     });
	  			//   } else {
	  			//     // 如果已经有了，就将userName添加到对应的data数组中
	  			//     const existingItem = acc.find(item => item.letter === user.roleName);
	  			//     if (existingItem) {
	  			//       if (!existingItem.data.includes(user.userName)) {
	  			//         existingItem.data.push(user.userName);
	  			//       }
	  			//     }
	  			//   }
	  			//   return acc;
	  			// }, []);
	  			// console.log(transformedData);
	  			this.users=resData
	  		},
	  		fail: (err) => {
	  			console.log(err)
	  		}
	  	})
	  },
    toggleSelection(user) {
      const index = this.selectedUsers.findIndex(u => u.userId === user.userId);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      } else {
        this.selectedUsers.push(user);
      }
    },
    isSelected(user) {
      return this.selectedUsers.some(u => u.userId === user.userId);
    },
    submitSelection() {
      // 这里可以调用uni-app的API来返回数据到前一个页面
      // 例如，如果使用Vuex或者全局事件总线，可以在这里触发一个事件或者提交一个mutation
      // 这里只是一个简单的示例，实际项目中需要根据项目结构来实现
	  console.log(this.selectedUsers)
      uni.redirectTo({
        url:"/pages/logDay/InsertReport?users="+JSON.stringify(this.selectedUsers)
      });
    }
  }
};
</script>

<style>
.page {
  padding: 20px;
}
.user-list {
  margin-bottom: 20px;
}
.user-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user-checkbox {
  margin-right: 10px;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20rpx;
  margin-right: 10px;
}
.user-name {
  margin-right: 10px;
}
</style>