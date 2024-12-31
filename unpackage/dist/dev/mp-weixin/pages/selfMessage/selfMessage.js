"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      list2: [
        {
          type: "auth-filled",
          text: "",
          url: "/pages/selfMessage/adminPageController/adminPageController",
          right: "right"
        }
      ],
      position: null,
      admin: null,
      userMessage: {
        userName: null,
        departmentName: null,
        userName: null,
        departmentName: null,
        empNum: null,
        telephone: null,
        email: null,
        status: null,
        ctTime: null,
        avatar: null
      }
    };
  },
  onShow() {
    this.isLogin();
    this.getIsAdmin();
    this.getSelfPosition();
  },
  methods: {
    changeAdmin() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/adminPageController/adminPageController"
      });
    },
    changeSetUp() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/SetUpPage/SetUpPage"
      });
    },
    selectDataPage() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/selfDataPage/selfDataPage"
      });
    },
    imagePreview(i) {
      common_vendor.index.previewImage({
        urls: [i]
      });
    },
    changeSelfPage() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/self"
      });
    },
    changeSelfUpdatePage() {
      common_vendor.index.navigateTo({
        url: "updateSelf/updateSelf"
      });
    },
    //获取岗位信息
    getSelfPosition() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/position/getSelfPosition",
        method: "GET",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          this.position = res.data.data.name;
        }
      });
    },
    isLogin() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/isLogin",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          if (res.data.code === "200") {
            this.getSelfMessage();
          } else {
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
    getIsAdmin() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/user/isAdmin",
        method: "GET",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          this.admin = res.data.data;
        },
        fail: (error) => {
          console.log(error);
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
              this.userMessage.userName = res.data.data.userName;
              this.userMessage.departmentName = res.data.data.departmentName;
              this.userMessage.email = res.data.data.email;
              this.userMessage.telephone = res.data.data.telephone;
              this.userMessage.status = res.data.data.status;
              this.userMessage.empNum = res.data.data.empNum;
              var date = new Date(res.data.data.ctTime);
              if (res.data.data.userImage !== null) {
                this.userMessage.avatar = res.data.data.userImage;
              } else {
                this.userMessage.avatar = "../../static/tx/default.png";
              }
              this.userMessage.ctTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
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
  (_easycom_uni_nav_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#ffffff",
      border: false,
      ["status-bar"]: true,
      color: "#000",
      title: "个人中心"
    }),
    b: $data.userMessage.avatar !== null
  }, $data.userMessage.avatar !== null ? {
    c: $data.userMessage.avatar,
    d: common_vendor.o(($event) => $options.imagePreview($data.userMessage.avatar))
  } : {
    e: common_assets._imports_0$1,
    f: common_vendor.o(($event) => $options.imagePreview($data.userMessage.avatar))
  }, {
    g: common_vendor.t($data.userMessage.userName),
    h: common_vendor.t($data.position),
    i: common_vendor.p({
      type: "auth-filled",
      size: "30rpx",
      color: "#00aaff"
    }),
    j: common_vendor.o($options.changeSelfPage),
    k: common_vendor.p({
      type: "compose",
      size: "15px"
    }),
    l: common_assets._imports_1,
    m: common_vendor.p({
      type: "right",
      size: "30rpx"
    }),
    n: common_vendor.o((...args) => $options.selectDataPage && $options.selectDataPage(...args)),
    o: common_assets._imports_2,
    p: common_vendor.p({
      type: "right",
      size: "30rpx"
    }),
    q: common_vendor.o((...args) => $options.changeSetUp && $options.changeSetUp(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
