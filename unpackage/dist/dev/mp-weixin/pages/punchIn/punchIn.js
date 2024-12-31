"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
function checkTime() {
  const now = /* @__PURE__ */ new Date();
  const hour = now.getHours();
  if (hour < 9 || hour > 17.5) {
    return true;
  } else {
    return false;
  }
}
function getFormattedDate() {
  const today = /* @__PURE__ */ new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}
const _sfc_main = {
  data() {
    return {
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
      },
      addance: {
        longitude: null,
        latitude: null,
        address: "点击选择打卡位置",
        date: null,
        type: "上班打卡"
      },
      blueMessage: {
        bluetoothName: null,
        remark: null
      },
      currentTimeDisplay: "",
      clockInButton: true,
      clockOutButton: true,
      outCheckIn: true,
      deviceIds: []
    };
  },
  methods: {
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
    },
    getBlueTooth() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/bluetooth/getBluetooth",
        method: "GET",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          this.deviceIds = res.data.data;
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    getAddress() {
      common_vendor.index.getLocation(
        {
          type: "gcj02",
          geocode: true,
          isHighAccuracy: true,
          success: (res1) => {
            this.addance.longitude = res1.longitude;
            this.addance.latitude = res1.latitude;
            common_vendor.index.chooseLocation({
              success: (res2) => {
                if (Math.abs(res1.longitude - res2.longitude) < 2e-4 && Math.abs(res1.latitude - res2.latitude) < 2e-4) {
                  this.addance.address = res2.name;
                  common_vendor.index.showToast({
                    title: "定位成功",
                    icon: "success",
                    success: (res) => {
                      this.clockInButton = false;
                      this.clockOutButton = false;
                    }
                  });
                } else {
                  common_vendor.index.showToast({
                    title: "定位失败",
                    icon: "error"
                  });
                }
              }
            });
          }
        }
      );
    },
    updateTime() {
      var now = /* @__PURE__ */ new Date();
      now.getHours();
      now.getMinutes();
      this.currentTimeDisplay = `中国时间:${now.toLocaleTimeString()}`;
    },
    show() {
      this.addance.date = getFormattedDate();
      if (checkTime()) {
        this.punchIn();
      } else {
        common_vendor.index.showModal({
          title: "警告",
          content: "还未到打卡时间，您确认打卡吗",
          success: (res) => {
            if (res.confirm) {
              this.punchIn();
            } else if (res.cancel)
              ;
          },
          fail: (err) => {
            console.log(err);
          }
        });
      }
    },
    punchIn() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/attendance/addAttendance",
        method: "POST",
        data: this.addance,
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          common_vendor.index.showModal({
            title: "提示",
            content: res.data.data,
            showCancel: false
          });
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    scanBluetooth() {
      common_vendor.index.openBluetoothAdapter({
        success: () => {
          common_vendor.index.startBluetoothDevicesDiscovery({
            success: (res) => {
              common_vendor.index.onBluetoothDeviceFound((devices) => {
                this.deviceIds.map((deviceId) => {
                  if (deviceId.deviceId === devices.devices[0].deviceId) {
                    common_vendor.index.stopBluetoothDevicesDiscovery({
                      success: () => {
                        common_vendor.index.showToast({
                          title: "成功连接蓝牙",
                          icon: "success",
                          duration: 1e3,
                          success: () => {
                            this.outCheckIn = false;
                            this.blueMessage.bluetoothName = deviceId.bluetoothName;
                            this.blueMessage.remark = deviceId.remark;
                          }
                        });
                      },
                      fail: () => {
                        console.error("停止扫描失败");
                        common_vendor.index.showToast({
                          title: "无法连接蓝牙",
                          icon: "error"
                        });
                      }
                    });
                  }
                });
              });
            },
            fail: (err) => {
              console.error("开始扫描失败", err);
              common_vendor.index.closeBluetoothAdapter();
            }
          });
        },
        fail: (err) => {
          console.error("开启蓝牙适配器失败", err);
        }
      });
    }
  },
  //初始化挂载
  created() {
    setInterval(this.updateTime, 1e3);
  },
  onShow() {
    this.getSelfMessage();
    this.getBlueTooth();
    this.scanBluetooth();
  },
  updated() {
    this.updateTime();
  }
};
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_notice_bar2 + _easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "提示: 1.上班打卡时间为早上九点之前,下班打卡时间为下午五点半之后。2.打卡定位之前,必须连接公司打卡蓝牙机才能够进行定位。3.如果还是无法打卡,请保留相关信息,作为后期补签证据。"
    }),
    b: $data.userMessage.avatar !== null
  }, $data.userMessage.avatar !== null ? {
    c: $data.userMessage.avatar,
    d: common_vendor.o(($event) => _ctx.imagePreview($data.userMessage.avatar))
  } : {
    e: common_assets._imports_0$1,
    f: common_vendor.o(($event) => _ctx.imagePreview($data.userMessage.avatar))
  }, {
    g: common_vendor.t($data.userMessage.userName),
    h: common_vendor.t($data.addance.address),
    i: common_vendor.o((...args) => $options.getAddress && $options.getAddress(...args)),
    j: $data.outCheckIn,
    k: common_vendor.p({
      title: "请选择地址",
      type: "square"
    }),
    l: common_vendor.t($data.currentTimeDisplay),
    m: common_vendor.t($data.blueMessage.remark),
    n: $data.clockInButton,
    o: common_vendor.o(($event) => $options.show()),
    p: $data.clockOutButton,
    q: common_vendor.o(($event) => $options.show())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
