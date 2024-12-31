"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tempFilePaths: [],
      baseFormData: {
        approvalForms: {
          fromName: null,
          type: "请假",
          description: null
        },
        approvers: [1],
        object: {
          startDate: null,
          endDate: null
        }
      }
    };
  },
  methods: {
    async selectImage(e) {
      await common_vendor.index.chooseImage({
        count: 8,
        success: (res) => {
          this.uploadFile(res);
        }
      });
    },
    isImageByExtension(fileName) {
      return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
    },
    isVideoByExtension(fileName) {
      return /.(mp4|mov|avi|wmv|flv|mkv|webm|m4v)$/i.test(fileName);
    },
    uploadFile(res) {
      console.log(res);
      this.filePaths = [];
      if (res.tempFiles) {
        res.tempFilePaths.forEach((item) => {
          this.tempFilePaths.push({
            "url": item,
            "name": item
          });
          this.filePaths.push({
            "url": item,
            "name": item
          });
          console.log(this.tempFilePaths);
        });
      } else if (res.tempFilePath) {
        this.tempFilePaths.push({
          "url": res.tempFilePath,
          "name": res.tempFilePath
        });
        this.filePaths.push({
          "url": res.tempFilePath,
          "name": res.tempFilePath
        });
        console.log(this.tempFilePaths);
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
    allData() {
      console.log(this.baseFormData);
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/approvalForms/addApprovalForms",
        method: "POST",
        data: this.baseFormData,
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        success: (res) => {
          if (res.data.code === "200") {
            common_vendor.index.showModal({
              title: "提示",
              content: "已成功提交",
              success: (res2) => {
                common_vendor.index.navigateBack();
              }
            });
          } else {
            common_vendor.index.showModal({
              title: "提示",
              content: "提交失败，请确认表单信息"
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_forms2 + _easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_forms + _easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.approvalForms.fromName = $event),
    b: common_vendor.p({
      placeholder: "请输入请假标题",
      modelValue: $data.baseFormData.approvalForms.fromName
    }),
    c: common_vendor.p({
      label: "请假说明",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.approvalForms.type = $event),
    e: common_vendor.p({
      disabled: true,
      modelValue: $data.baseFormData.approvalForms.type
    }),
    f: common_vendor.p({
      label: "类型",
      required: true
    }),
    g: common_vendor.o(($event) => $data.baseFormData.approvalForms.description = $event),
    h: common_vendor.p({
      type: "textarea",
      placeholder: "请输入详细的说明",
      modelValue: $data.baseFormData.approvalForms.description
    }),
    i: common_vendor.p({
      label: "请假详细说明",
      required: ""
    }),
    j: common_vendor.o(($event) => $data.baseFormData.object.startDate = $event),
    k: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.object.startDate
    }),
    l: common_vendor.p({
      label: "开始时间",
      required: true
    }),
    m: common_vendor.o(($event) => $data.baseFormData.object.endDate = $event),
    n: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.object.endDate
    }),
    o: common_vendor.p({
      label: "结束时间",
      required: true
    }),
    p: common_vendor.o((...args) => $options.selectImage && $options.selectImage(...args)),
    q: common_vendor.f($data.tempFilePaths, (item, k0, i0) => {
      return {
        a: item.url
      };
    }),
    r: common_vendor.p({
      label: "图片",
      required: true
    }),
    s: common_vendor.sr("baseForm", "237c264d-2,237c264d-1"),
    t: common_vendor.p({
      modelValue: $data.baseFormData,
      ["label-width"]: "200rpx",
      ["label-position"]: "top"
    }),
    v: common_vendor.o((...args) => $options.allData && $options.allData(...args)),
    w: common_vendor.p({
      title: "请假",
      ["sub-title"]: "填写请假信息",
      extra: "注意填写真实性"
    }),
    x: common_vendor.p({
      title: "请假审批",
      type: "line",
      ["title-font-size"]: "50rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
