"use strict";
const common_vendor = require("../../common/vendor.js");
const mineEmpty = () => "../../component/mineList/mine-empty/mine-empty2.js";
const _sfc_main = {
  components: {
    mineEmpty
  },
  data() {
    return {
      items: ["已完成", "未完成", "申请成功", "申请失败"],
      styleType: "text",
      activeColor: "#00b100",
      reviewData: [],
      data: {
        pageNum: 1,
        pageSize: 30,
        data: {
          type: null,
          status: "已完成"
        }
      },
      value: null,
      range: [
        {
          value: 0,
          text: "请假",
          urlEnd: "askForLeave"
        },
        {
          value: 1,
          text: "报销",
          urlEnd: ""
        },
        {
          value: 2,
          text: "出差",
          urlEnd: "businessReview"
        },
        {
          value: 3,
          text: "加班",
          urlEnd: ""
        },
        {
          value: 4,
          text: "补签",
          urlEnd: ""
        },
        {
          value: 5,
          text: "入职",
          urlEnd: ""
        },
        {
          value: 6,
          text: "培训",
          urlEnd: ""
        },
        {
          value: 7,
          text: "薪资调整",
          urlEnd: ""
        },
        {
          value: 8,
          text: "离职",
          urlEnd: ""
        },
        {
          value: 9,
          text: "采购",
          urlEnd: ""
        },
        {
          value: 10,
          text: "用车",
          urlEnd: ""
        },
        {
          value: 11,
          text: "预算",
          urlEnd: ""
        },
        {
          value: 12,
          text: "招聘",
          urlEnd: ""
        },
        {
          value: 13,
          text: "设备维修",
          urlEnd: ""
        },
        {
          value: 14,
          text: "合同签署",
          urlEnd: ""
        },
        {
          value: 15,
          text: "项目立项",
          urlEnd: ""
        }
      ]
    };
  },
  onPullDownRefresh() {
    this.data.data.type = null;
    this.data.data.status = null;
    this.value = null;
    this.getReviewDatas();
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    changeWeb(subUrl, type) {
      common_vendor.index.navigateTo({
        url: "/pages/review/" + subUrl,
        success() {
          common_vendor.index.showToast({
            icon: "success",
            title: "请修改" + type,
            duration: 1e3
          });
        },
        fail() {
          common_vendor.index.showToast({
            icon: "error",
            title: "页面错误",
            duration: 1e3
          });
        }
      });
    },
    update(item) {
      console.log(item);
      common_vendor.index.setStorageSync("formId", item.formId);
      this.range.forEach((items) => {
        if (items.text === item.type) {
          this.changeWeb(items.urlEnd, items.text);
        } else {
          common_vendor.index.showToast({
            icon: "error",
            title: "页面还未设计",
            duration: 1e3
          });
        }
      });
    },
    changeDate(e) {
      const time = new Date(e);
      const newDate = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.getHours() + "时";
      return newDate;
    },
    change(e) {
      if (this.range[e]) {
        this.data.data.type = this.range[e].text;
        console.log(this.data);
        this.getReviewDatas();
      } else {
        this.data.data.type = null;
        console.log(this.data);
        this.getReviewDatas();
      }
    },
    chengeStatus(e) {
      this.data.data.status = this.items[e.currentIndex];
      console.log(this.data);
      this.getReviewDatas();
    },
    async getReviewDatas() {
      await common_vendor.index.request({
        url: "http://192.168.0.196:8088/approvalForms/getSelfApprovalForms",
        method: "POST",
        data: this.data,
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          this.reviewData = res.data.data.records.map((record) => {
            const time = new Date(record.applicationDate);
            if (record) {
              return {
                "formId": record.formId,
                "applicantId": record.applicantId,
                "attendanceId": record.attendanceId,
                "fromName": record.fromName,
                "applicationDate": time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + "日" + time.getHours() + "时" + time.getMinutes() + "m" + time.getSeconds() + "s",
                "status": record.status,
                "type": record.type,
                "description": record.description,
                "departmentName": record.departmentName,
                "userName": record.userName,
                "map": record.map
              };
            }
          });
        },
        fail: (error) => {
          console.log(error);
        }
      });
    }
  },
  onShow() {
    this.getReviewDatas();
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_mineEmpty = common_vendor.resolveComponent("mineEmpty");
  (_easycom_uni_segmented_control2 + _easycom_uni_data_select2 + _easycom_uni_section2 + _easycom_uni_icons2 + _component_mineEmpty)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_data_select + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.chengeStatus),
    b: common_vendor.p({
      current: 0,
      values: $data.items,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    c: common_vendor.o($options.change),
    d: common_vendor.o(($event) => $data.value = $event),
    e: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    f: common_vendor.p({
      title: "选择审批类型",
      type: "line"
    }),
    g: $data.reviewData.length !== 0
  }, $data.reviewData.length !== 0 ? {
    h: common_vendor.f($data.reviewData, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.type),
        b: common_vendor.t(item.applicationDate),
        c: common_vendor.t(item.fromName),
        d: item.description,
        e: item.status === "已完成" || item.status === "申请完成"
      }, item.status === "已完成" || item.status === "申请完成" ? {
        f: common_vendor.t(item.status)
      } : {}, {
        g: item.status === "未完成" || item.status === "申请失败"
      }, item.status === "未完成" || item.status === "申请失败" ? {
        h: common_vendor.t(item.status)
      } : {}, {
        i: common_vendor.o(($event) => $options.update(item)),
        j: "0f557373-3-" + i0
      });
    }),
    i: common_vendor.p({
      type: "more-filled"
    })
  } : {}, {
    j: $data.reviewData.length === 0
  }, $data.reviewData.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
