"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      url: "",
      baseFormData: {
        name: null,
        type: "出差",
        description: null,
        map: {
          business: {
            startTime: null,
            endTime: null,
            address: null
          }
        }
      }
    };
  },
  methods: {
    select(e) {
      console.log(e);
    },
    progress(e) {
      console.log(e);
    },
    fileSuccess(e) {
      console.log(e.tempFilePaths[0]);
      this.url = e.tempFilePaths[0];
    },
    fileFail(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_datetime_picker2 + _easycom_uni_file_picker2 + _easycom_uni_forms2 + _easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_datetime_picker + _easycom_uni_file_picker + _easycom_uni_forms + _easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.baseFormData.name = $event),
    b: common_vendor.p({
      placeholder: "请输入出差标题",
      modelValue: $data.baseFormData.name
    }),
    c: common_vendor.p({
      label: "出差说明",
      required: true
    }),
    d: common_vendor.o(($event) => $data.baseFormData.type = $event),
    e: common_vendor.p({
      disabled: true,
      modelValue: $data.baseFormData.type
    }),
    f: common_vendor.p({
      label: "类型",
      required: true
    }),
    g: common_vendor.o(($event) => $data.baseFormData.description = $event),
    h: common_vendor.p({
      type: "textarea",
      placeholder: "请输入详细的说明",
      modelValue: $data.baseFormData.description
    }),
    i: common_vendor.p({
      label: "出差详细说明",
      required: true
    }),
    j: common_vendor.o(($event) => $data.baseFormData.map.business.startTime = $event),
    k: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.map.business.startTime
    }),
    l: common_vendor.p({
      label: "开始时间",
      required: true
    }),
    m: common_vendor.o(($event) => $data.baseFormData.map.business.endTime = $event),
    n: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.map.business.endTime
    }),
    o: common_vendor.p({
      label: "结束时间",
      required: true
    }),
    p: common_vendor.o($options.select),
    q: common_vendor.o($options.progress),
    r: common_vendor.o($options.fileSuccess),
    s: common_vendor.o($options.fileFail),
    t: common_vendor.p({
      limit: "2",
      ["file-mediatype"]: "all",
      title: "最多选择2个图片/视频",
      mode: "grid"
    }),
    v: common_vendor.p({
      label: "图片/视频",
      required: true
    }),
    w: common_vendor.sr("baseForm", "4b1b40e2-2,4b1b40e2-1"),
    x: common_vendor.p({
      modelValue: $data.baseFormData,
      labelWidth: "200rpx"
    }),
    y: common_vendor.p({
      title: "出差",
      ["sub-title"]: "填写出差信息",
      extra: "注意填写真实性"
    }),
    z: common_vendor.p({
      title: "出差审批",
      type: "line",
      ["title-font-size"]: "50rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
