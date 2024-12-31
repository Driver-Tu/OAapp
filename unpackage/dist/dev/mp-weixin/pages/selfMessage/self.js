"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
      position: null,
      userMessage: {
        departmentName: null,
        userName: null,
        userImage: null,
        departmentName: null,
        empNum: null,
        roleName: null,
        telephone: null,
        email: null,
        status: null,
        ctTime: null,
        sex: null,
        birth: null
      },
      userInfo: {
        telephone: null,
        email: null,
        userName: null
      }
    };
  },
  methods: {
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
    upName() {
      common_vendor.index.showModal({
        editable: true,
        title: "请输入新呢称",
        success: (res) => {
          if (res.confirm) {
            this.userInfo.userName = res.content;
            this.updateSelfMessage();
          }
        }
      });
    },
    upEmail() {
      common_vendor.index.showModal({
        editable: true,
        title: "请输入新的邮箱号码",
        success: (res) => {
          if (res.confirm) {
            this.userInfo.email = res.content;
            this.updateSelfMessage();
          }
        }
      });
    },
    upTelephone() {
      common_vendor.index.showModal({
        editable: true,
        title: "请输入新的电话号码",
        success: (res) => {
          if (res.confirm) {
            this.userInfo.telephone = res.content;
            this.updateSelfMessage();
          }
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
              title: "提示",
              content: res.data.msg,
              showCancel: false,
              success: (res2) => {
                if (res2.confirm) {
                  this.getSelfMessage();
                }
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
    },
    updateImage() {
    },
    imagePreview(i) {
      common_vendor.index.previewImage({
        urls: [i]
      });
    },
    showDrawer() {
      common_vendor.index.navigateTo({
        url: "/pages/selfMessage/updateSelf/updateSelf"
      });
    },
    back() {
      common_vendor.index.navigateBack({
        delta: 1
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
              this.userMessage.status = res.data.data.status === 1 ? "在线" : "请假";
              this.userMessage.empNum = res.data.data.empNum;
              this.userMessage.roleName = res.data.data.roleName;
              var currentDate = /* @__PURE__ */ new Date();
              var date = new Date(res.data.data.ctTime);
              const timeDifference = Math.abs(date - currentDate);
              this.userMessage.ctTime = Math.ceil(timeDifference / (1e3 * 60 * 60 * 24)) + "天";
              this.userMessage.sex = res.data.data.sex === "1" ? "男" : "女";
              this.userMessage.birth = res.data.data.birth;
              this.userMessage.userImage = res.data.data.userImage;
              console.log(this.userMessage);
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
  },
  onShow() {
    this.getSelfMessage();
    this.getSelfPosition();
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
    a: common_vendor.o($options.showDrawer),
    b: common_vendor.o($options.back),
    c: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#ffffff",
      border: false,
      ["status-bar"]: true,
      color: "#00000",
      ["right-text"]: "编辑",
      title: "个人资料",
      ["left-icon"]: "left"
    }),
    d: $data.userMessage.userImage !== null
  }, $data.userMessage.userImage !== null ? {
    e: $data.userMessage.userImage,
    f: common_vendor.o(($event) => $options.imagePreview($data.userMessage.userImage))
  } : {}, {
    g: $data.userMessage.userImage === null
  }, $data.userMessage.userImage === null ? {
    h: common_assets._imports_0$1
  } : {}, {
    i: common_vendor.t($data.userMessage.userName),
    j: common_vendor.p({
      type: "right"
    }),
    k: common_vendor.o(($event) => $options.upName()),
    l: common_vendor.t($data.userMessage.empNum),
    m: common_vendor.t($data.userMessage.sex),
    n: common_vendor.t($data.userMessage.email),
    o: common_vendor.p({
      type: "right"
    }),
    p: common_vendor.o(($event) => $options.upEmail()),
    q: common_vendor.t($data.userMessage.telephone),
    r: common_vendor.p({
      type: "right"
    }),
    s: common_vendor.o(($event) => $options.upTelephone()),
    t: common_vendor.t($data.position),
    v: common_vendor.t($data.userMessage.departmentName),
    w: common_vendor.t($data.userMessage.ctTime),
    x: common_vendor.t($data.userMessage.birth),
    y: common_vendor.t($data.userMessage.status)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
