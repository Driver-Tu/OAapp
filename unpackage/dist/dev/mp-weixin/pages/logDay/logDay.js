"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      items: [{
        num: 0,
        title: "日报",
        subtitle: "按照需求编写日志",
        extra: "日志记录",
        thumbnail: "/static/logDay/rb.png",
        URL: "/pages/logDay/InsertReport",
        url: "/pages/logDay/SelectReport"
      }, {
        num: 1,
        title: "周报",
        subtitle: "按照需求编写周志",
        extra: "周志记录",
        thumbnail: "/static/logDay/zb.png",
        URL: "/pages/logDay/InsertReport",
        url: "/pages/logDay/SelectReport"
      }, {
        num: 2,
        title: "月报",
        subtitle: "按照需求编写月报",
        extra: "月报记录",
        thumbnail: "/static/logDay/yb.png",
        URL: "/pages/logDay/InsertReport",
        url: "/pages/logDay/SelectReport"
      }]
    };
  },
  methods: {
    changePage(item) {
      common_vendor.index.navigateTo({
        url: item.URL,
        success: (res) => {
          common_vendor.index.showToast({
            duration: 1e3,
            title: "新增" + item.title,
            icon: "success"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            duration: 1e3,
            title: "跳转失败",
            icon: "error"
          });
        }
      });
    },
    changeSelectPage(item) {
      common_vendor.index.navigateTo({
        url: item.url + "?item=" + encodeURIComponent(JSON.stringify(item)),
        success: (res) => {
          common_vendor.index.showToast({
            duration: 1e3,
            title: "查看" + item.title,
            icon: "success"
          });
        },
        fail: (res) => {
          common_vendor.index.showToast({
            duration: 1e3,
            title: "跳转失败",
            icon: "error"
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: "1f341b02-1-" + i0 + "," + ("1f341b02-0-" + i0),
        b: common_vendor.t(item.title),
        c: common_vendor.o(($event) => $options.changeSelectPage(item)),
        d: "1f341b02-2-" + i0 + "," + ("1f341b02-0-" + i0),
        e: common_vendor.o(($event) => $options.changePage(item)),
        f: "1f341b02-0-" + i0,
        g: common_vendor.p({
          title: item.title,
          ["sub-title"]: item.subtitle,
          extra: item.extra,
          padding: "10px 0",
          thumbnail: item.thumbnail
        })
      };
    }),
    b: common_vendor.p({
      color: "#0055ff",
      type: "bars",
      size: "40rpx"
    }),
    c: common_vendor.p({
      color: "#ff0000",
      type: "plusempty",
      size: "40rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
