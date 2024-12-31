"use strict";
const common_vendor = require("./common/vendor.js");
function compareTimeWithSpecificTime(startTime, endTime) {
  const currentDateTime = new Date(startTime);
  const specificDateTime = new Date(endTime);
  const morningTime = new Date(new Date(startTime).setHours(9, 0, 0, 0));
  const eveningTime = new Date(new Date(startTime).setHours(17, 30, 0, 0));
  if (currentDateTime <= morningTime && specificDateTime >= eveningTime) {
    return "正常";
  } else if (currentDateTime <= morningTime && specificDateTime < eveningTime) {
    return "早退";
  } else if (currentDateTime > morningTime && specificDateTime >= eveningTime) {
    return "迟到";
  } else if (currentDateTime > morningTime && specificDateTime < eveningTime) {
    return "迟到又早退";
  }
}
const _sfc_main = {
  components: {},
  data() {
    return {
      data: {
        pageNum: 1,
        pageSize: 200,
        data: {
          status: null,
          type: null,
          date: null
        }
      },
      data1: {
        pageNum: 1,
        pageSize: 200,
        data: {
          status: null,
          type: null,
          date: null
        }
      },
      showCalendar: false,
      info: {
        selected: [],
        message: [],
        fullDate: ""
      },
      timeNow: "",
      timeSelectNow: "",
      finalResult: null
    };
  },
  created() {
    this.getData();
    setInterval(this.getData, 3e4);
  },
  onReady() {
  },
  onShow() {
    this.getData();
  },
  methods: {
    isToday(dateString) {
      const date = new Date(dateString);
      const today = /* @__PURE__ */ new Date();
      return date.toDateString() === today.toDateString();
    },
    isTomorrow(date) {
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      today.setDate(today.getDate() + 1);
      const inputDate = new Date(date);
      return inputDate > today;
    },
    changePage() {
      common_vendor.index.switchTab({
        url: "/pages/review/review",
        success() {
          common_vendor.index.showToast({
            mask: true,
            title: "成功跳转",
            icon: "success",
            duration: 1e3
          });
        }
      });
    },
    changePage2() {
      common_vendor.index.navigateTo({
        url: "/pages/punchIn/punchIn",
        success() {
          common_vendor.index.showToast({
            mask: true,
            title: "请打卡",
            icon: "success",
            duration: 1e3
          });
        }
      });
    },
    change(e) {
      this.info.message = [];
      this.data1.data.date = e.fulldate;
      this.timeSelectNow = e.fulldate;
      this.finalResult = null;
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/attendance/getSelfAttendance",
        data: this.data1,
        method: "POST",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          if (res.data.data) {
            this.info.message = res.data.data.records.map((record) => {
              if (record && record.timeIn && record.timeOut) {
                const timeI = new Date(record.timeIn);
                const timeO = new Date(record.timeOut);
                const timeIn = timeI.getHours() + ":" + timeI.getMinutes() + ":" + timeI.getSeconds();
                const timeOut = timeO.getHours() + ":" + timeO.getMinutes() + ":" + timeO.getSeconds();
                const address = record.address;
                this.finalResult = compareTimeWithSpecificTime(record.timeIn, record.timeOut);
                return {
                  "address": address,
                  "timeIn": timeIn,
                  "timeOut": timeOut
                };
              } else if (record && !record.timeIn && record.timeOut) {
                const timeO = new Date(record.timeOut);
                const timeIn = "上班未打卡";
                const timeOut = timeO.getHours() + ":" + timeO.getMinutes() + ":" + timeO.getSeconds();
                const address = record.address;
                this.finalResult = "上班未打卡";
                return {
                  "address": address,
                  "timeIn": timeIn,
                  "timeOut": timeOut
                };
              } else if (record && record.timeIn && !record.timeOut) {
                const timeI = new Date(record.timeIn);
                const timeIn = timeI.getHours() + ":" + timeI.getMinutes() + ":" + timeI.getSeconds();
                const timeOut = "下班未打卡";
                const address = record.address;
                this.finalResult = "下班未打卡";
                return {
                  "address": address,
                  "timeIn": timeIn,
                  "timeOut": timeOut
                };
              }
            });
          }
        },
        fail: (error) => {
          console.log(error);
        }
      });
    },
    getData() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/attendance/getSelfAttendance",
        data: this.data,
        method: "POST",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          if (res.data.data.records !== void 0) {
            this.info.selected = res.data.data.records;
            this.info.selected = this.info.selected.map((record) => {
              if (this.isToday(record.date) && record.timeOut === null) {
                return {
                  "address": record.address,
                  "date": record.date,
                  "info": "请签到"
                };
              } else {
                return {
                  "address": record.address,
                  "date": record.date,
                  "info": record.status
                };
              }
            });
          }
        },
        fail: (error) => {
          console.log(error);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_section2 + _easycom_uni_calendar2 + _easycom_uni_icons2)();
}
const _easycom_uni_section = () => "./uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_calendar = () => "./uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
const _easycom_uni_icons = () => "./uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_calendar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "打卡情况",
      ["sub-title"]: "个人的打卡信息",
      ["title-font-size"]: "50rpx",
      type: "line",
      ["sub-title-color"]: "#757575"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      selected: $data.info.selected,
      showMonth: true,
      lunar: true
    }),
    d: common_vendor.p({
      title: "详细信息",
      type: "line"
    }),
    e: common_vendor.t($data.timeSelectNow),
    f: $data.info.message.length !== 0 && $data.info.message[0] !== void 0
  }, $data.info.message.length !== 0 && $data.info.message[0] !== void 0 ? {
    g: common_vendor.t($data.info.message[0].timeIn)
  } : {}, {
    h: $data.info.message.length !== 0 && $data.info.message[0] !== void 0
  }, $data.info.message.length !== 0 && $data.info.message[0] !== void 0 ? {
    i: common_vendor.p({
      type: "location",
      size: "16px"
    }),
    j: common_vendor.t($data.info.message[0].address)
  } : {}, {
    k: $data.info.message.length !== 0 && $data.info.message[0] !== void 0
  }, $data.info.message.length !== 0 && $data.info.message[0] !== void 0 ? {
    l: common_vendor.t($data.info.message[0].timeOut)
  } : {}, {
    m: $data.info.message.length !== 0 && $data.info.message[0] !== void 0 && $data.info.message[0].timeOut != "下班未打卡"
  }, $data.info.message.length !== 0 && $data.info.message[0] !== void 0 && $data.info.message[0].timeOut != "下班未打卡" ? {
    n: common_vendor.p({
      type: "location",
      size: "16px"
    }),
    o: common_vendor.t($data.info.message[0].address)
  } : {}, {
    p: $data.info.message.length === 0 && $options.isToday($data.data1.data.date) === false && $options.isTomorrow($data.data1.data.date) === false
  }, $data.info.message.length === 0 && $options.isToday($data.data1.data.date) === false && $options.isTomorrow($data.data1.data.date) === false ? {} : {}, {
    q: $options.isTomorrow($data.data1.data.date)
  }, $options.isTomorrow($data.data1.data.date) ? {} : {}, {
    r: $data.info.message.length === 0 && $options.isToday($data.data1.data.date) === false && $options.isTomorrow($data.data1.data.date) === false
  }, $data.info.message.length === 0 && $options.isToday($data.data1.data.date) === false && $options.isTomorrow($data.data1.data.date) === false ? {
    s: common_vendor.o((...args) => $options.changePage && $options.changePage(...args))
  } : {}, {
    t: $options.isToday($data.data1.data.date) && $data.info.message.length === 0 && $data.info.message[0] === void 0
  }, $options.isToday($data.data1.data.date) && $data.info.message.length === 0 && $data.info.message[0] === void 0 ? {
    v: common_vendor.o((...args) => $options.changePage2 && $options.changePage2(...args))
  } : {}, {
    w: $data.finalResult !== null && $data.finalResult === "正常"
  }, $data.finalResult !== null && $data.finalResult === "正常" ? {
    x: common_vendor.t($data.finalResult)
  } : {}, {
    y: $data.finalResult !== null && $data.finalResult !== "正常"
  }, $data.finalResult !== null && $data.finalResult !== "正常" ? {
    z: common_vendor.t($data.finalResult)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.MiniProgramPage = MiniProgramPage;
