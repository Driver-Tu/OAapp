"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: ["users"],
  data() {
    return {
      defaultImage: "https://mp-b8e53f5e-c503-4780-9859-ec2675b3d8cd.cdn.bspapp.com/unicloud/wenjian.png",
      tempFilePaths: [],
      filePaths: [],
      textNum: null,
      items: ["日报", "周报", "月报"],
      baseFormData: {
        reportName: null,
        type: "日报",
        content: null,
        filePath: [],
        userIDS: []
      },
      userList: []
    };
  },
  onLoad(options) {
    if (options.users) {
      const users = JSON.parse(options.users);
      this.userList = users;
      this.baseFormData.userIDS = users.map((item) => item.userId);
      this.baseFormData = JSON.parse(common_vendor.index.getStorageSync("baseFormData"));
      common_vendor.index.removeStorageSync("baseFormData");
    }
  },
  onShow() {
    if (common_vendor.index.getStorageSync("baseData")) {
      this.baseFormData = JSON.parse(common_vendor.index.getStorageSync("baseData"));
    }
    if (common_vendor.index.getStorageSync("tempFilePaths")) {
      this.tempFilePaths = JSON.parse(common_vendor.index.getStorageSync("tempFilePaths"));
    }
    if (common_vendor.index.getStorageSync("userList")) {
      this.userList = JSON.parse(common_vendor.index.getStorageSync("userList"));
    }
  },
  methods: {
    saveData() {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确认保存吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.setStorageSync("baseData", JSON.stringify(this.baseFormData));
            common_vendor.index.setStorageSync("tempFilePaths", JSON.stringify(this.tempFilePaths));
            common_vendor.index.setStorageSync("userList", JSON.stringify(this.userList));
            common_vendor.index.showToast({
              duration: 1e3,
              title: "保存成功",
              icon: "success"
            });
          } else if (res.cancel)
            ;
        }
      });
    },
    changeSelectUserPage() {
      common_vendor.index.setStorageSync("baseFormData", JSON.stringify(this.baseFormData));
      common_vendor.index.navigateTo({
        url: "SelectUser/SelectUser"
      });
    },
    isImageByExtension(fileName) {
      return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
    },
    isVideoByExtension(fileName) {
      return /.(mp4|mov|avi|wmv|flv|mkv|webm|m4v)$/i.test(fileName);
    },
    uploadFile(res) {
      this.filePaths = [];
      if (res.tempFiles) {
        res.tempFilePaths.forEach((item) => {
          this.tempFilePaths.push({ "url": item, "name": item });
          this.filePaths.push({ "url": item, "name": item });
        });
      } else if (res.tempFilePath) {
        this.tempFilePaths.push({ "url": res.tempFilePath, "name": res.tempFilePath });
        this.filePaths.push({ "url": res.tempFilePath, "name": res.tempFilePath });
      }
      this.filePaths.forEach((item) => {
        common_vendor.index.uploadFile({
          url: "http://192.168.0.196:8088/report/file/upload",
          filePath: item.url,
          name: "files",
          header: {
            "satoken": common_vendor.index.getStorageSync("satoken")
          },
          success: (end) => {
            const final = JSON.parse(end.data);
            if (final.code === "200") {
              const uuid = final.data;
              console.log(uuid);
              this.baseFormData.filePath.push(uuid);
            }
          },
          fail: (err) => {
            console.log(err);
          }
        });
      });
    },
    chengeStatus(e) {
      this.baseFormData.type = this.items[e.currentIndex];
    },
    async selectImage(e) {
      await common_vendor.index.chooseImage({
        success: (res) => {
          this.uploadFile(res);
        }
      });
    },
    async selectVideo(e) {
      console.log(e);
      await common_vendor.index.chooseVideo({
        success: (res) => {
          this.uploadFile(res);
        }
      });
    },
    allData() {
      if (this.baseFormData.reportName !== null && this.baseFormData.reportName !== "" && (this.baseFormData.content !== null && this.baseFormData.content !== "")) {
        if (common_vendor.index.getStorageSync("baseData")) {
          common_vendor.index.removeStorageSync("baseData");
        }
        if (common_vendor.index.getStorageSync("tempFilePaths")) {
          common_vendor.index.removeStorageSync("tempFilePaths");
        }
        if (common_vendor.index.getStorageSync("userList")) {
          common_vendor.index.removeStorageSync("userList");
        }
        common_vendor.index.request({
          url: "http://192.168.0.196:8088/report/addReport",
          method: "POST",
          header: {
            "satoken": common_vendor.index.getStorageSync("satoken")
          },
          data: this.baseFormData,
          success: (res) => {
            common_vendor.index.redirectTo({
              url: "/pages/logDay/logDay",
              success() {
                common_vendor.index.showToast({
                  duration: 1e3,
                  title: "提交成功",
                  icon: "success"
                });
              },
              fail() {
                common_vendor.index.showToast({
                  duration: 1e3,
                  title: "提交错误!",
                  icon: "error"
                });
              }
            });
          },
          fail: (fail) => {
            console.log(fail);
          }
        });
      } else {
        common_vendor.index.showToast({
          duration: 1e3,
          title: "标题/内容不规范",
          icon: "error"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_segmented_control2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_tooltip2 + _easycom_uni_icons2 + _easycom_uni_section2 + _easycom_uni_card2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_tooltip = () => "../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_tooltip + _easycom_uni_icons + _easycom_uni_section + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.chengeStatus),
    b: common_vendor.p({
      current: 0,
      values: $data.items,
      ["style-type"]: "text",
      ["active-color"]: "#00b100"
    }),
    c: common_vendor.o(($event) => $data.baseFormData.reportName = $event),
    d: common_vendor.p({
      placeholder: "请输入标题",
      modelValue: $data.baseFormData.reportName
    }),
    e: common_vendor.p({
      label: "日志标题",
      name: "reportName",
      required: true
    }),
    f: common_vendor.o(($event) => $data.baseFormData.content = $event),
    g: common_vendor.p({
      type: "textarea",
      maxlength: -1,
      inputBorder: false,
      placeholder: "请输入今日感悟",
      clearable: true,
      autoHeight: true,
      modelValue: $data.baseFormData.content
    }),
    h: $data.baseFormData.content
  }, $data.baseFormData.content ? {
    i: common_vendor.t($data.baseFormData.content.length)
  } : {}, {
    j: common_vendor.p({
      label: "今日工作内容及感悟",
      name: "content",
      required: true
    }),
    k: common_vendor.sr("baseForm", "a517ba92-1"),
    l: common_vendor.p({
      modelValue: $data.baseFormData,
      ["label-width"]: "100%",
      ["label-position"]: "top"
    }),
    m: common_vendor.f($data.userList, (item, k0, i0) => {
      return common_vendor.e({
        a: $options.isImageByExtension(item.userImage)
      }, $options.isImageByExtension(item.userImage) ? {
        b: item.userImage
      } : item.userImage === null ? {
        d: common_assets._imports_0$2
      } : {
        e: common_assets._imports_0$2
      }, {
        c: item.userImage === null,
        f: "a517ba92-7-" + i0 + ",a517ba92-6",
        g: common_vendor.p({
          content: item.userName,
          placement: "on"
        })
      });
    }),
    n: common_vendor.o($options.changeSelectUserPage),
    o: common_vendor.p({
      type: "plusempty",
      size: "60rpx",
      color: "#b6b6b6"
    }),
    p: common_vendor.p({
      title: "选择查看人",
      type: "circle"
    }),
    q: common_vendor.p({
      type: "image",
      size: "46rpx",
      color: "#00aaff"
    }),
    r: common_vendor.o(($event) => $options.selectImage()),
    s: $data.tempFilePaths
  }, $data.tempFilePaths ? {
    t: common_vendor.f($data.tempFilePaths, (item, k0, i0) => {
      return common_vendor.e({
        a: $options.isImageByExtension(item.name)
      }, $options.isImageByExtension(item.name) ? {
        b: item.url
      } : {});
    })
  } : {}, {
    v: common_vendor.p({
      type: "image",
      size: "46rpx",
      color: "#00aaff"
    }),
    w: common_vendor.o(($event) => $options.selectVideo()),
    x: $data.tempFilePaths
  }, $data.tempFilePaths ? {
    y: common_vendor.f($data.tempFilePaths, (item, k0, i0) => {
      return common_vendor.e({
        a: $options.isVideoByExtension(item.url)
      }, $options.isVideoByExtension(item.url) ? {
        b: item.url
      } : {});
    })
  } : {}, {
    z: common_vendor.p({
      title: "选择附件",
      type: "square"
    }),
    A: common_vendor.t($data.baseFormData.type),
    B: common_vendor.o(($event) => $options.saveData()),
    C: common_vendor.t($data.baseFormData.type),
    D: common_vendor.o(($event) => $options.allData())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
