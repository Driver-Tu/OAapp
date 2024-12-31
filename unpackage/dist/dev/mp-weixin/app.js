"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/main/main.js";
  "./pages/index/index.js";
  "./pages/review/reviewDetail.js";
  "./pages/selfMessage/punchMessage.js";
  "./pages/selfMessage/self.js";
  "./pages/selfMessage/selfMessage.js";
  "./pages/selfMessage/updateSelf/updateSelf.js";
  "./pages/punchIn/punchIn.js";
  "./pages/review/review.js";
  "./pages/review/askForLeave.js";
  "./pages/review/businessReview.js";
  "./uni_modules/unicloud-city-select/pages/uni-city-list/uni-city-list.js";
  "./pages/logDay/logDay.js";
  "./component/mineList/mine-empty/mine-empty.js";
  "./pages/logDay/InsertReport.js";
  "./pages/logDay/SelectReport.js";
  "./pages/logDay/reportDetail.js";
  "./pages/mailToUserByQQ/mailToUserByQQ.js";
  "./pages/selfMessage/adminPageController/adminPageController.js";
  "./pages/selfMessage/selfDataPage/selfDataPage.js";
  "./pages/selfMessage/SetUpPage/SetUpPage.js";
  "./pages/logDay/SelectUser/SelectUser.js";
  "./pages/VideoShow/VideoShow.js";
}
const _sfc_main = {
  onLaunch: function() {
    let token = common_vendor.index.getStorageSync("satoken");
    if (!token) {
      common_vendor.index.navigateTo({
        url: "/pages/index/index"
      });
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
