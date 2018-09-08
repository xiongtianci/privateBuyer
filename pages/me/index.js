// pages/me/index.js
var network = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userinfo = wx.getStorageSync("userInfo");
    that.setData({
      userinfo: userinfo,
    })
  },

  //联系客服
  makeCall:function(){
    wx.makePhoneCall({
      phoneNumber: '0793-8291102' //客服电话
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    network.loginJudge();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // },
  // ToOrder: function(){
  //   wx.navigateTo({
  //     url: '../order/index',
  //   })
  // }
})