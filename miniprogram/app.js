//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
    env:'ifilmsenvironment',
    traceUser:true
    })
  }
})
