"use strict";
const common_vendor = require("../../common/vendor.js");
const mineEmpty = () => "../../component/mineList/mine-empty/mine-empty2.js";
const _sfc_main = {
  props: ["item", "nums"],
  components: {
    mineEmpty
  },
  data() {
    return {
      num: 0,
      items: ["我收到的", "我发出的"],
      total: 0,
      data: {
        pageNum: 1,
        pageSize: 10,
        data: {
          reportId: null,
          reportDate: null,
          type: "日报",
          share: null
        }
      },
      range: [
        {
          value: 0,
          text: "日报"
        },
        {
          value: 1,
          text: "周报"
        },
        {
          value: 2,
          text: "月报"
        }
      ],
      allData: []
    };
  },
  onLoad(options) {
    if (options.item) {
      const decodedItem = decodeURIComponent(options.item);
      const parsedItem = JSON.parse(decodedItem);
      this.data.data.type = parsedItem.title;
      this.num = parsedItem.num;
    }
    if (options.nums) {
      this.num = parseInt(options.nums);
      console.log(this.num);
    }
  },
  onShow() {
    this.init();
  },
  methods: {
    insertReportPage() {
      common_vendor.index.showModal({
        content: "准备前往写一篇日志...",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: "/pages/logDay/InsertReport"
            });
          } else if (res.cancel)
            ;
        }
      });
    },
    formatDate(dateString) {
      var date = new Date(dateString);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      var weekDay = days[date.getDay()];
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var formattedDate = year + "年" + month + "月" + day + "日 " + weekDay;
      return formattedDate;
    },
    init() {
      if (this.num === 0) {
        this.getMyShareData();
      } else {
        this.getData();
      }
    },
    change(res) {
      this.num = res.currentIndex;
      this.init();
    },
    //获取分享给自己的日志
    getMyShareData() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/shareReport",
        method: "POST",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        success: (res) => {
          this.allData = res.data.data.records;
          this.total = res.data.data.total;
        },
        fail: (error) => {
          console.log(error);
        }
      });
    },
    selectDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/logDay/reportDetail?reportId=" + encodeURIComponent(JSON.stringify(id + "," + this.num))
      });
    },
    chengeType(e) {
      this.data.pageNum = 1;
      this.data.data.type = this.range[e].text;
      this.init();
    },
    getDataNext() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/list-self",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        method: "POST",
        success: (res) => {
          res.data.data.records.map((item) => {
            this.allData.push(item);
          });
          this.total = res.data.data.total;
        },
        fail: (fail) => {
          console.log(fail);
        }
      });
    },
    getShareDataNext() {
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/shareReport",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        method: "POST",
        success: (res) => {
          res.data.data.records.map((item) => {
            this.allData.push(item);
          });
          this.total = res.data.data.total;
        },
        fail: (fail) => {
          console.log(fail);
        }
      });
    },
    getData() {
      common_vendor.index.showLoading({
        title: "数据加载中..."
      });
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/list-self",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        method: "POST",
        success: (res) => {
          this.allData = res.data.data.records;
          this.total = res.data.data.total;
          common_vendor.index.hideLoading();
        },
        fail: (fail) => {
          common_vendor.index.hideLoading();
          console.log(fail);
        }
      });
    }
  },
  //上拉加载
  onReachBottom() {
    let allTotal = this.data.pageNum * this.data.pageSize;
    if (allTotal <= this.total) {
      common_vendor.index.showLoading({
        title: "数据加载中"
      });
      this.data.pageNum++;
      if (this.index === 0) {
        this.getShareDataNext();
        common_vendor.index.hideLoading();
      } else {
        this.getDataNext();
        common_vendor.index.hideLoading();
      }
    } else {
      common_vendor.index.showToast({
        duration: 1e3,
        title: "已加载全部数据",
        icon: "success"
      });
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    this.allData = [];
    this.data.pageNum = 1;
    this.data.data.reportId = null;
    this.init();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _component_mine_empty = common_vendor.resolveComponent("mine-empty");
  (_easycom_uni_nav_bar2 + _easycom_uni_segmented_control2 + _easycom_uni_data_select2 + _easycom_uni_section2 + _easycom_uni_card2 + _component_mine_empty)();
}
const _easycom_uni_nav_bar = () => "../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_segmented_control + _easycom_uni_data_select + _easycom_uni_section + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.insertReportPage()),
    b: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#ffffff",
      border: false,
      ["left-text"]: "日志查看",
      ["left-icon"]: "search",
      ["left-width"]: "45vw",
      ["status-bar"]: true,
      color: "#00aaff",
      ["right-icon"]: "plusempty"
    }),
    c: common_vendor.o($options.change),
    d: common_vendor.p({
      current: $data.num,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#00aaff"
    }),
    e: common_vendor.o($options.chengeType),
    f: common_vendor.p({
      localdata: $data.range,
      clear: false
    }),
    g: common_vendor.p({
      title: "请选择日报类型",
      type: "line"
    }),
    h: common_vendor.f($data.allData, (item, k0, i0) => {
      return {
        a: common_vendor.t($options.formatDate(item.reportDate)),
        b: item.content,
        c: common_vendor.o(($event) => $options.selectDetail(item.reportId)),
        d: "9812458c-4-" + i0,
        e: common_vendor.p({
          title: "报告标题：",
          ["sub-title"]: item.reportName,
          extra: item.userName + "的" + item.type
        })
      };
    }),
    i: $data.allData.length === 0
  }, $data.allData.length === 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
