// pages/goodsDetail/index.js
var network = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodInfo:null,
    showMask:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.goodId);
    var that = this;
    that.setData({
      goodId: options.goodId,
    })
    that.getGoodsInfoById(options.goodId);
  },

  //根据指定ID获取商品信息
  getGoodsInfoById: function (goodId) {
    var that = this;
    //整理请求参数
    var data = {
      goodsId: goodId,
    };
    network.request(getApp().data.baseUrl + '/ztm/api/shopCollect/getGoodsInfoById', data, function (res) {
      if (res.success) {
      //成功回调
      console.log(res.data.data);
      that.setData({
        goodInfo: res.data.data,
      })
      }
    }, function (res) {
      //失败回调
      console.log(res)
    })
  },

  //跳转店铺详情
  shopsDetail(e) {
    // console.log(e.currentTarget.dataset.deptid);
    var deptId = e.currentTarget.dataset.deptid;
    wx.navigateTo({
      url: '../shop/index?deptId=' + deptId,
    })
  },
  //跳转首页
  toIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  //分享获币功能方法
  shareFunc:function(){
    wx.showModal({
      title: '尚未开放',
      content: '敬请期待',
    })
  },
  
  //联系客服
  makeCall:function(e){
    var that = this;
    var phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone //商店客服电话
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
  onShareAppMessage: function () {
  
  },
  showPD: function () {
    var that = this;
    that.setData({
      showMask: true,
    })
  },
  closeMask: function(){
    var that = this;
    that.setData({
      showMask: false,
    })
  }
})