"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loginAll = common_vendor.reactive({
      empNum: common_vendor.index.getStorageSync("empNum"),
      password: common_vendor.index.getStorageSync("password")
    });
    common_vendor.ref("");
    const login = () => {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/login?empNum=" + loginAll.empNum + "&password=" + loginAll.password + "&device=app",
        method: "POST",
        success: (res) => {
          if (res.data.code === "200") {
            common_vendor.index.setStorageSync("empNum", loginAll.empNum);
            common_vendor.index.setStorageSync("satoken", res.data.data.tokenValue);
            common_vendor.index.showToast({
              title: "登陆成功",
              icon: "success",
              duration: 1e3,
              mask: true
            });
            common_vendor.index.switchTab({
              url: "/pages/main/main"
            });
          } else {
            common_vendor.index.showModal({
              title: "警告",
              content: res.data.msg
            });
          }
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: "页面错误!!!",
            icon: "error",
            duration: 5e3,
            mask: true
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact",
          size: "33"
        }),
        b: loginAll.empNum,
        c: common_vendor.o(($event) => loginAll.empNum = $event.detail.value),
        d: common_vendor.p({
          type: "eye-filled",
          size: "33"
        }),
        e: loginAll.password,
        f: common_vendor.o(($event) => loginAll.password = $event.detail.value),
        g: common_vendor.o(login)
      };
    };
  }
};
wx.createPage(_sfc_main);
