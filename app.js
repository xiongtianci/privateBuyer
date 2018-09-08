//app.js
App({
  data:{
   baseUrl: 'https://zhaotemai.net/buyer-api',
   //baseUrl:'http://192.168.0.4:8084'

  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
})