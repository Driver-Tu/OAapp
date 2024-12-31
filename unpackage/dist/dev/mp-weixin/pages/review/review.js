"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      approlist1: [
        {
          text: "请假",
          url: "/pages/review/askForLeave",
          src: "../../static/iconReview/qj.jpg"
        },
        {
          text: "报销",
          url: "",
          src: "../../static/iconReview/bx.jpg"
        },
        {
          text: "出差",
          url: "/pages/review/businessReview",
          src: "../../static/iconReview/cc.jpg"
        },
        {
          text: "加班",
          url: "",
          src: "../../static/iconReview/jb.jpg"
        },
        {
          text: "补签",
          url: "",
          src: "../../static/iconReview/bq.jpg"
        }
      ],
      approlist2: [
        {
          text: "入职",
          url: "",
          src: "../../static/iconReview/rz.jpg"
        },
        {
          text: "培训",
          url: "",
          src: "../../static/iconReview/px.jpg"
        },
        {
          text: "薪资调整",
          url: "",
          src: "../../static/iconReview/xztz.jpg"
        },
        {
          text: "离职",
          url: "",
          src: "../../static/iconReview/lz.jpg"
        }
      ],
      approlist3: [
        {
          text: "采购",
          url: "",
          src: "../../static/iconReview/cg.jpg"
        },
        {
          text: "用车",
          url: "",
          src: "../../static/iconReview/yc.jpg"
        },
        {
          text: "预算",
          url: "",
          src: "../../static/iconReview/ys.jpg"
        },
        {
          text: "招聘",
          url: "",
          src: "../../static/iconReview/zp.jpg"
        },
        {
          text: "设备维修",
          url: "",
          src: "../../static/iconReview/sbwx.jpg"
        }
      ],
      approlist4: [
        {
          text: "合同签署",
          url: "",
          src: "../../static/iconReview/htqs.jpg"
        },
        {
          text: "项目立项",
          url: "",
          src: "../../static/iconReview/xmlx.jpg"
        }
      ]
    };
  },
  onShow() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/isLogin",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          if (res.data.code === "200")
            ;
          else {
            common_vendor.index.showModal({
              content: "登录已失效",
              title: "提示",
              success() {
                common_vendor.index.redirectTo({
                  url: "/pages/index/index"
                });
              }
            });
          }
        }
      });
    },
    changePage(str1, str2) {
      common_vendor.index.navigateTo({
        url: str1,
        success() {
          common_vendor.index.showToast({
            icon: "success",
            title: str2 + "申请!",
            duration: 1e3
          });
        },
        fail() {
          common_vendor.index.showToast({
            icon: "error",
            title: str2 + "待开发!",
            duration: 1e3
          });
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_notice_bar2 + _easycom_uni_section2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "1、确定审批类型! 2、提交审批表单! 3、静候审批结果! 祝大家工作顺利!"
    }),
    b: common_vendor.f($data.approlist1, (item, k0, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.changePage(item.url, item.text))
      };
    }),
    c: common_vendor.p({
      title: "个人",
      ["title-font-size"]: "40rpx",
      subTitle: "个人审批",
      type: "line"
    }),
    d: common_vendor.f($data.approlist2, (item, k0, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.changePage(item.url, item.text))
      };
    }),
    e: common_vendor.p({
      title: "职位",
      ["title-font-size"]: "40rpx",
      subTitle: "入职和离职",
      type: "line"
    }),
    f: common_vendor.f($data.approlist3, (item, k0, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.changePage(item.url, item.text))
      };
    }),
    g: common_vendor.p({
      title: "公共",
      ["title-font-size"]: "40rpx",
      subTitle: "公司工作中的需求",
      type: "line"
    }),
    h: common_vendor.f($data.approlist4, (item, k0, i0) => {
      return {
        a: item.src,
        b: common_vendor.t(item.text),
        c: common_vendor.o(($event) => $options.changePage(item.url, item.text))
      };
    }),
    i: common_vendor.p({
      title: "合同",
      ["title-font-size"]: "40rpx",
      subTitle: "公司项目的立案和员工合同的签署",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
