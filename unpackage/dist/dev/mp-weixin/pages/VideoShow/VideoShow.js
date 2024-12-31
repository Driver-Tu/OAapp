"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["videoUrls"],
  onLoad(options) {
    if (options.videoUrls) {
      this.videoUrl = JSON.parse(options.videoUrls);
    }
  },
  data() {
    return {
      videoUrl: []
    };
  },
  methods: {
    vedioPreview(i) {
      common_vendor.index.previewMedia({
        urls: [i]
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  _easycom_uni_section2();
}
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  _easycom_uni_section();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.videoUrl, (i, index, i0) => {
      return {
        a: i,
        b: common_vendor.o(($event) => $options.vedioPreview(i)),
        c: "a791db18-0-" + i0,
        d: common_vendor.p({
          title: "视频(" + (index + 1) + "):",
          ["title-font-size"]: "50rpx"
        })
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
