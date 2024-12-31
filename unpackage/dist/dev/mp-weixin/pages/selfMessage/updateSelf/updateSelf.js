"use strict";
const common_vendor = require("../../../common/vendor.js");
function validateInput(inputValue) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  const qqEmailRegex = /^[1-9]\d{4,11}@qq\.com$/;
  if (inputValue.telephone === null && inputValue.email === null && inputValue.userName === null) {
    return "请输入要修改的数据s";
  }
  if (!phoneRegex.test(inputValue.telephone) && inputValue.telephone !== null) {
    return "手机号格式错误";
  }
  if (!qqEmailRegex.test(inputValue.email) && inputValue.email !== null) {
    return "QQ邮箱格式不正确";
  }
  return "数据正确";
}
const _sfc_main = {
  data() {
    return {
      userInfo: {
        telephone: null,
        email: null,
        userName: null
      }
    };
  },
  methods: {
    offUpdate() {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要退出修改?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.navigateBack({
              delta: 1
            });
          } else if (res.cancel)
            ;
        },
        fail: (error) => {
          console.log(error);
        }
      });
    },
    updateSelfMessage() {
      if (validateInput(this.userInfo) === "数据正确") {
        common_vendor.index.request({
          url: "http://192.168.0.196:8088/user/updateSelfUserInfo",
          method: "POST",
          header: {
            "satoken": common_vendor.index.getStorageSync("satoken")
          },
          data: this.userInfo,
          success: (res) => {
            common_vendor.index.showModal({
              title: res.data.msg,
              content: "修改成功",
              success() {
                common_vendor.index.navigateBack({
                  delta: 1
                });
              }
            });
          },
          fail: (error) => {
            console.log(error);
          }
        });
      } else {
        common_vendor.index.showModal({
          title: "警告",
          content: validateInput(this.userInfo)
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.userInfo.userName,
    b: common_vendor.o(($event) => $data.userInfo.userName = $event.detail.value),
    c: $data.userInfo.telephone,
    d: common_vendor.o(($event) => $data.userInfo.telephone = $event.detail.value),
    e: $data.userInfo.email,
    f: common_vendor.o(($event) => $data.userInfo.email = $event.detail.value),
    g: common_vendor.o((...args) => $options.updateSelfMessage && $options.updateSelfMessage(...args)),
    h: common_vendor.o((...args) => $options.offUpdate && $options.offUpdate(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
