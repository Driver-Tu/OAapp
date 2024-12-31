"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list1: [
        {
          img: "/static/selfImage/grrz.png",
          text: "个人日志",
          url: "/pages/logDay/logDay"
        },
        {
          img: "/static/selfImage/dkxx.png",
          text: "打卡信息",
          url: "/pages/selfMessage/punchMessage"
        }
      ]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list1, (item, k0, i0) => {
      return {
        a: "28c49dee-1-" + i0 + ",28c49dee-0",
        b: common_vendor.p({
          title: item.text,
          showArrow: true,
          thumb: item.img,
          ["thumb-size"]: "lg",
          rightText: "点击查看",
          link: "navigateTo",
          to: item.url
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
