"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const punchIn = () => "../selfMessage/punchMessage2.js";
const _sfc_main = {
  components: {
    punchIn
  },
  data() {
    return {
      userName: null,
      sList: [
        {
          url: "/pages/logDay/InsertReport",
          text: "写日志",
          icon: "wallet"
        },
        {
          url: "/pages/selfMessage/self",
          text: "个人信息",
          icon: "person"
        }
      ],
      images: [
        "../../static/lb1.png",
        "../../static/lb2.png",
        "../../static/lb3.png"
      ],
      list: [
        {
          url: "/static/main/mrdk.png",
          text: "考勤打卡",
          badge: "0",
          URL: "/pages/punchIn/punchIn"
        },
        // {
        // 	url: '/static/main/gzsp.jpg',
        // 	text: 'OA审批',
        // 	badge: '1',
        // 	URL: "/pages/review/review"
        // }, 
        {
          url: "/static/main/rz.png",
          text: "日志",
          badge: "2",
          URL: "/pages/logDay/SelectReport"
        }
      ],
      //后续用作审批流程
      spList: [],
      countData: {
        attendanceSuccess: 0,
        attendanceFail: 0,
        reportDay: 0,
        reportMonth: 0,
        reportWeek: 0
      }
    };
  },
  onShow() {
    this.isLogin();
    this.getSelfMessage();
    this.getAttendanceCount();
    this.getReportCount();
  },
  methods: {
    getReportCount() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/getSelfReportCount?year=" + (/* @__PURE__ */ new Date()).getFullYear() + "&month=" + ((/* @__PURE__ */ new Date()).getMonth() + 1),
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        method: "GET",
        success: (res) => {
          let rs = res.data.data;
          this.countData.reportDay = rs.daily;
          this.countData.reportWeek = rs.weekly;
          this.countData.reportMonth = rs.monthly;
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    getAttendanceCount() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/attendance/getCountByMonth?year=" + (/* @__PURE__ */ new Date()).getFullYear() + "&month=" + ((/* @__PURE__ */ new Date()).getMonth() + 1),
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        method: "GET",
        success: (res) => {
          let rs = res.data.data;
          this.countData.attendanceSuccess = rs.success;
          this.countData.attendanceFail = rs.fail;
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    changeMenuPage(urls) {
      common_vendor.index.navigateTo({
        url: urls
      });
    },
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    },
    logDayPage() {
      common_vendor.index.navigateTo({
        url: "/pages/logDay/SelectReport?nums=1"
      });
    },
    punchPage() {
      common_vendor.index.navigateTo({
        url: "/pages/punchIn/punchIn"
      });
    },
    punchMessagePage() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/punchMessage"
      });
    },
    reviewPage() {
      common_vendor.index.navigateTo({
        url: "/pages/review/review"
      });
    },
    isLogin() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/isLogin",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success(res) {
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
            title: str2,
            duration: 1e3
          });
        },
        fail() {
          common_vendor.index.switchTab({
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
                icon: "error",
                title: str2 + "待开发",
                duration: 1e3
              });
            }
          });
        }
      });
    },
    getSelfMessage() {
      if (common_vendor.index.getStorageSync("satoken")) {
        common_vendor.index.request({
          url: "http://192.168.0.196:8088/user/info",
          method: "GET",
          header: {
            "satoken": common_vendor.index.getStorageSync("satoken")
          },
          success: (res) => {
            if (res.data.code === "200") {
              this.userName = res.data.data.userName;
            } else {
              common_vendor.index.showToast({
                title: res.data.msg,
                icon: "fail",
                duration: 1e3,
                mask: true
              });
            }
          },
          fail: (error) => {
            common_vendor.index.showToast({
              title: "页面错误!!!",
              icon: "error",
              duration: 5e3,
              mask: true
            }), common_vendor.index.navigateTo({
              url: "/pages/index/index"
            });
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_section2 + _easycom_uni_popup2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons + _easycom_uni_section + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.toggle("top")),
    b: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#ffffff",
      border: false,
      ["left-text"]: "富辰方舟企业管理有限公司",
      ["left-icon"]: "medal",
      ["left-width"]: "45vw",
      ["status-bar"]: true,
      color: "#00aaff",
      ["right-icon"]: "plusempty"
    }),
    c: common_assets._imports_0,
    d: common_vendor.p({
      type: "right",
      size: "36rpx"
    }),
    e: common_vendor.o((...args) => $options.punchPage && $options.punchPage(...args)),
    f: common_vendor.p({
      type: "right",
      size: "36rpx"
    }),
    g: common_vendor.o((...args) => $options.logDayPage && $options.logDayPage(...args)),
    h: common_vendor.f($data.list, (item, k0, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: item.text,
        d: common_vendor.o(($event) => $options.changePage(item.URL), item.text)
      };
    }),
    i: common_vendor.p({
      title: "基本功能",
      type: "circle"
    }),
    j: common_vendor.t($data.countData.attendanceSuccess),
    k: common_vendor.o(($event) => $options.punchMessagePage()),
    l: common_vendor.t($data.countData.attendanceFail),
    m: common_vendor.o(($event) => $options.punchMessagePage()),
    n: common_vendor.p({
      title: "本月打卡次数",
      type: "square"
    }),
    o: common_vendor.t($data.countData.reportDay),
    p: common_vendor.o(($event) => $options.logDayPage()),
    q: common_vendor.t($data.countData.reportWeek),
    r: common_vendor.o(($event) => $options.logDayPage()),
    s: common_vendor.t($data.countData.reportMonth),
    t: common_vendor.o(($event) => $options.logDayPage()),
    v: common_vendor.p({
      title: "本月报告次数",
      type: "square"
    }),
    w: common_vendor.p({
      title: "本月数据",
      ["sub-title"]: "本月打卡总数,日报,周报和月报的篇数统计",
      type: "circle"
    }),
    x: common_vendor.f($data.sList, (item, k0, i0) => {
      return {
        a: "5e8e1ae2-8-" + i0 + ",5e8e1ae2-7",
        b: common_vendor.p({
          type: item.icon,
          size: "30rpx",
          color: "#000000"
        }),
        c: common_vendor.t(item.text),
        d: common_vendor.o(($event) => $options.changeMenuPage(item.url))
      };
    }),
    y: common_vendor.sr("popup", "5e8e1ae2-7"),
    z: common_vendor.p({
      ["background-color"]: "#fff"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
