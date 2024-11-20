export const url="http://192.168.0.196:8088/report/file/getData?objectName=";

export function getImageOrFile(url, i, callback) {
  uni.downloadFile({
    url: url + i,
    header: {
      "satoken": uni.getStorageSync("satoken")
    },
    success: (res) => {
      if (res.data) {
        const contentType = res.header["content-type"] || "application/octet-stream";
       uni.d
        let result = {};
        if (contentType.startsWith("image/")) {
          result.imageUrls = [Url];
        } else if (contentType.startsWith("video/")) {
          result.videoUrls = [Url];
        } else {
          result.fileUrls = [Url];
        }
        callback(result);
      } else {
        console.log('Failed to get image URL');
        callback(null);
      }
    },
    fail: (err) => {
      console.log('Request failed', err);
      callback(null, err);
    }
  });
}