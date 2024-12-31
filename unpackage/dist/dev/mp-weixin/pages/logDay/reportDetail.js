"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
function isImageType(filename) {
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp", "tiff"];
  const extension = filename.split(".").pop().toLowerCase();
  return imageExtensions.includes(extension);
}
function isVideoType(filename) {
  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "mkv", "3gp"];
  const extension = filename.split(".").pop().toLowerCase();
  return videoExtensions.includes(extension);
}
const _sfc_main = {
  props: ["reportId"],
  data() {
    return {
      disabled: false,
      userInfo: {
        name: null,
        departmentName: null,
        userImage: null,
        roleName: null
      },
      userOnVos: [],
      videoUrls: [],
      imageUrls: [],
      FileUrls: [],
      data: {
        pageNum: 1,
        pageSize: 1,
        data: {
          reportId: null
        }
      },
      userIds: [],
      allData: [],
      schedule: 0,
      index: null
    };
  },
  onLoad(options) {
    if (options.reportId) {
      this.data.data.reportId = JSON.parse(decodeURIComponent(options.reportId)).split(",")[0];
      const index = JSON.parse(decodeURIComponent(options.reportId)).split(",")[1];
      this.index = index;
      console.log(index);
      if (index === "0") {
        this.getMyShareData();
      } else {
        this.getData();
      }
    }
  },
  methods: {
    videoShow() {
      common_vendor.index.navigateTo({
        url: "/pages/VideoShow/VideoShow?videoUrls=" + JSON.stringify(this.videoUrls)
      });
    },
    isImageByExtension(fileName) {
      return /.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
    },
    //获取分享给自己的日志
    selectItemUser(item) {
      this.disabled = true;
      this.userInfo.name = item.userName;
      this.userInfo.departmentName = item.departmentName;
      this.userInfo.roleName = item.roleName;
      this.userInfo.userImage = item.userImage;
    },
    getMyShareData() {
      common_vendor.index.showLoading({
        title: "正在获取当天数据..."
      });
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/shareReport",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        method: "POST",
        success: (res) => {
          if (res.data.code === "200") {
            common_vendor.index.hideLoading();
            const records = res.data.data.records;
            this.total = res.data.total;
            if (records[0].fileUrls.length !== 0) {
              const fileUrls = records[0].fileUrls;
              fileUrls.forEach((item) => {
                if (isImageType(item)) {
                  this.imageUrls.push(item);
                } else if (isVideoType(item)) {
                  this.videoUrls.push(item);
                } else {
                  this.FileUrls.push(item);
                }
              });
            }
            this.allData = records;
          } else {
            common_vendor.index.hideLoading();
            console.log(res);
          }
        },
        fail: (fail) => {
          common_vendor.index.hideLoading();
          console.log(fail);
        }
      });
      common_vendor.index.hideLoading();
    },
    imagePreview(i) {
      common_vendor.index.previewImage({
        urls: [i]
      });
    },
    deleteReport() {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确认删除吗?",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.request({
              url: "http://192.168.0.196:8088/report/deleteReports",
              data: [this.data.data.reportId],
              method: "DELETE",
              header: {
                "satoken": common_vendor.index.getStorageSync("satoken")
              },
              success: (res2) => {
                if (res2.data.code === "200") {
                  common_vendor.index.showModal({
                    title: "恭喜",
                    content: "删除成功",
                    confirmColor: "#ffe30f",
                    showCancel: false,
                    success: (res3) => {
                      if (res3.confirm) {
                        common_vendor.index.navigateBack({
                          delta: 1
                        });
                      }
                    }
                  });
                } else {
                  common_vendor.index.showModal({
                    title: "失败",
                    content: "删除失败",
                    confirmColor: "#ffe30f"
                  });
                }
              },
              fail: (err) => {
                console.log(err);
              }
            });
          } else if (res.cancel) {
            console.log("用户已经取消了删除！");
          }
        }
      });
    },
    filePreview(item) {
      common_vendor.index.showLoading({
        title: "正在打开..."
      });
      this.schedule = 0;
      const downloadTask = common_vendor.index.downloadFile({
        url: item,
        // 图片或者文件地址
        success: function(res) {
          var filePath = res.tempFilePath;
          common_vendor.index.openDocument({
            filePath: encodeURI(filePath),
            // fileType: 'pdf',
            success: function(res2) {
              common_vendor.index.hideLoading();
            },
            fail: function(err) {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "打开失败",
                duration: 1500,
                icon: "none"
              });
            }
          });
        },
        fail: function(err) {
          console.log("下载失败原因", err);
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            title: "您需要授权相册权限",
            success(res) {
              if (res.confirm) {
                common_vendor.index.openSetting({
                  success(res2) {
                  },
                  fail(res2) {
                    console.log(res2);
                  }
                });
              }
            }
          });
        }
      });
      downloadTask.onProgressUpdate((res) => {
        console.log("下载进度" + res.progress);
        this.schedule = res.progress;
      });
    },
    getData() {
      common_vendor.index.showLoading({
        title: "正在获取当天数据..."
      });
      common_vendor.index.request({
        url: "http://192.168.0.196:8088/report/list-self",
        header: {
          "satoken": common_vendor.index.getStorageSync("satoken")
        },
        data: this.data,
        method: "POST",
        success: (res) => {
          console.log(res);
          if (res.data.code === "200") {
            common_vendor.index.hideLoading();
            const records = res.data.data.records;
            this.total = res.data.total;
            if (records[0].fileUrls.length !== 0) {
              const fileUrls = records[0].fileUrls;
              fileUrls.forEach((item) => {
                if (isImageType(item)) {
                  this.imageUrls.push(item);
                } else if (isVideoType(item)) {
                  this.videoUrls.push(item);
                } else {
                  this.FileUrls.push(item);
                }
              });
            }
            let userId = records[0].shareUserId;
            if (userId && typeof userId === "string") {
              userId = userId.replace(/\[/g, "");
              userId = userId.replace(/\]/g, "");
              this.userIds = userId.split(",");
            }
            common_vendor.index.request({
              url: "http://192.168.0.196:8088/report/shareReportToUser",
              data: this.userIds,
              header: {
                "satoken": common_vendor.index.getStorageSync("satoken")
              },
              method: "POST",
              success: (res2) => {
                if (res2.data.code === "200") {
                  this.userOnVos = res2.data.data;
                  console.log(this.userOnVos);
                } else {
                  console.log(res2);
                }
              },
              fail: (err) => {
                console.log(err);
              }
            });
            this.allData = records;
          } else {
            common_vendor.index.hideLoading();
            console.log(res);
          }
        },
        fail: (fail) => {
          common_vendor.index.hideLoading();
          console.log(fail);
        }
      });
      common_vendor.index.hideLoading();
    }
  }
};
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_icons + _easycom_uni_card)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.allData, (item, k0, i0) => {
      return common_vendor.e({
        a: item.content
      }, $data.index === "1" && $data.userOnVos !== null && $data.userOnVos.length !== 0 ? {
        b: common_vendor.f($data.userOnVos, (item2, k1, i1) => {
          return common_vendor.e({
            a: $options.isImageByExtension(item2.userImage)
          }, $options.isImageByExtension(item2.userImage) ? {
            b: item2.userImage
          } : item2.userImage === null ? {
            d: common_assets._imports_0$2
          } : {
            e: common_assets._imports_0$2
          }, {
            c: item2.userImage === null,
            f: common_vendor.o(($event) => $options.selectItemUser(item2))
          });
        }),
        c: "c0888022-2-" + i0 + "," + ("c0888022-1-" + i0),
        d: common_vendor.p({
          title: "接收人",
          ["show-animation"]: true
        }),
        e: "c0888022-1-" + i0 + "," + ("c0888022-0-" + i0)
      } : {}, {
        f: common_vendor.f($data.imageUrls, (i, k1, i1) => {
          return {
            a: i,
            b: common_vendor.o(($event) => $options.imagePreview(i))
          };
        }),
        g: "c0888022-4-" + i0 + "," + ("c0888022-3-" + i0),
        h: "c0888022-3-" + i0 + "," + ("c0888022-0-" + i0),
        i: common_vendor.f($data.FileUrls, (i, k1, i1) => {
          return {
            a: common_vendor.o(($event) => $options.filePreview(i))
          };
        }),
        j: "c0888022-6-" + i0 + "," + ("c0888022-5-" + i0),
        k: "c0888022-5-" + i0 + "," + ("c0888022-0-" + i0)
      }, $data.videoUrls.length !== 0 ? {
        l: "c0888022-7-" + i0 + "," + ("c0888022-0-" + i0),
        m: common_vendor.p({
          type: "camera",
          size: "30rpx"
        }),
        n: common_vendor.t($data.videoUrls.length),
        o: common_vendor.o((...args) => $options.videoShow && $options.videoShow(...args))
      } : {}, $data.index === "1" ? {
        p: common_vendor.o($options.deleteReport),
        q: "c0888022-8-" + i0 + "," + ("c0888022-0-" + i0),
        r: common_vendor.p({
          type: "trash",
          size: "30",
          color: ""
        })
      } : {}, {
        s: "c0888022-0-" + i0,
        t: common_vendor.p({
          title: item.reportName,
          ["sub-title"]: item.reportDate,
          extra: item.userName + "的" + item.type,
          thumbnail: "../../static/tx/default.png"
        })
      });
    }),
    b: $data.index === "1" && $data.userOnVos !== null && $data.userOnVos.length !== 0,
    c: common_vendor.p({
      title: "图片",
      ["show-animation"]: true
    }),
    d: common_vendor.p({
      title: "文件",
      ["show-animation"]: true
    }),
    e: $data.videoUrls.length !== 0,
    f: $data.index === "1",
    g: $data.disabled
  }, $data.disabled ? common_vendor.e({
    h: $options.isImageByExtension($data.userInfo.userImage)
  }, $options.isImageByExtension($data.userInfo.userImage) ? {
    i: common_vendor.p({
      thumbnail: $data.userInfo.userImage,
      title: $data.userInfo.name,
      extra: $data.userInfo.departmentName,
      ["sub-title"]: $data.userInfo.roleName
    })
  } : {
    j: common_vendor.p({
      thumbnail: "../../static/tx/default.png",
      title: $data.userInfo.name,
      extra: $data.userInfo.departmentName,
      ["sub-title"]: $data.userInfo.roleName
    })
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
