"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list1: [
        {
          type: "auth-filled",
          text: "部门管理",
          url: "",
          right: "right"
        },
        {
          type: "cloud-upload-filled",
          text: "员工管理",
          url: "",
          right: "right"
        },
        {
          type: "calendar",
          text: "岗位管理",
          url: "",
          right: "right"
        },
        {
          type: "upload-filled",
          text: "日志管理",
          url: "",
          right: "right"
        },
        {
          type: "paperclip",
          text: "打卡管理",
          url: "",
          right: "right"
        }
      ]
    };
  },
  methods: {
    changePage(str1, str2) {
      common_vendor.index.navigateTo({
        url: str1,
        success() {
          common_vendor.index.showToast({
            icon: "success",
            title: str2,
            duration: 1e3
          });
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list1, (item, k0, i0) => {
      return {
        a: "014c5678-0-" + i0,
        b: common_vendor.p({
          type: item.type,
          size: "20"
        }),
        c: common_vendor.t(item.text),
        d: "014c5678-1-" + i0,
        e: common_vendor.p({
          type: item.right,
          size: "20"
        }),
        f: common_vendor.o(($event) => $options.changePage(item.url, item.text))
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
