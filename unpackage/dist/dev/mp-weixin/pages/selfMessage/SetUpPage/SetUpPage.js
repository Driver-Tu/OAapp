"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list3: [
        // {
        // 	type:"close",
        // 	text:"切换账号",
        // 	url:""
        // },
        {
          type: "home",
          text: "退出登录",
          url: "/pages/index/index"
        }
      ]
    };
  },
  methods: {
    changePage(str1, str2) {
      common_vendor.index.navigateTo({
        url: str1,
        success() {
          if (str2 === "退出登录") {
            common_vendor.index.request({
              url: "http://192.168.0.196:8088/user/logout",
              header: {
                "satoken": common_vendor.index.getStorageSync("satoken")
              },
              method: "GET",
              success: (res) => {
                if (res.data.code === "200") {
                  common_vendor.index.setStorageSync("satoken", "");
                  common_vendor.index.showToast({
                    title: "退出成功",
                    icon: "success",
                    duration: 1e3,
                    mask: true
                  });
                } else {
                  common_vendor.index.showToast({
                    title: res.data.msg,
                    icon: "error",
                    duration: 1e3,
                    mask: true
                  });
                }
              },
              fail: (error) => {
                console.log(error);
                common_vendor.index.showToast({
                  title: "页面错误!!!",
                  icon: "error",
                  duration: 1e3,
                  mask: true
                });
              }
            });
            common_vendor.index.showToast({
              icon: "success",
              title: "退出成功",
              duration: 1e3
            });
          } else {
            common_vendor.index.showToast({
              icon: "success",
              title: str2,
              duration: 1e3
            });
          }
        },
        fail() {
          common_vendor.index.showToast({
            icon: "fail",
            title: "页面待开发!",
            duration: 1e3
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list3, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.text,
        c: common_vendor.o(($event) => $options.changePage(item.url, item.text), item.text)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
