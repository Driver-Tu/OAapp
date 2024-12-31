"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      users: [],
      selectedUsers: []
    };
  },
  onShow() {
    this.getApproval();
  },
  methods: {
    isValidImageUrl(imageUrl) {
      const imagePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (imagePattern.test(imageUrl)) {
        return true;
      }
      return false;
    },
    getApproval() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/shareUserList",
        method: "GET",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          const resData = res.data.data;
          this.users = resData;
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    toggleSelection(user) {
      const index = this.selectedUsers.findIndex((u) => u.userId === user.userId);
      if (index > -1) {
        this.selectedUsers.splice(index, 1);
      } else {
        this.selectedUsers.push(user);
      }
    },
    isSelected(user) {
      return this.selectedUsers.some((u) => u.userId === user.userId);
    },
    submitSelection() {
      console.log(this.selectedUsers);
      common_vendor.index.redirectTo({
        url: "/pages/logDay/InsertReport?users=" + JSON.stringify(this.selectedUsers)
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.users, (user, k0, i0) => {
      return common_vendor.e({
        a: $options.isSelected(user),
        b: common_vendor.o(($event) => $options.toggleSelection(user), user.userId),
        c: $options.isValidImageUrl(user.userImage)
      }, $options.isValidImageUrl(user.userImage) ? {
        d: user.userImage
      } : {
        e: common_assets._imports_0$2
      }, {
        f: common_vendor.t(user.userName),
        g: user.userId
      });
    }),
    b: common_vendor.p({
      title: "请选择",
      type: "square"
    }),
    c: common_vendor.o((...args) => $options.submitSelection && $options.submitSelection(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
