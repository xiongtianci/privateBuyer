// pages/shop/index.js
var network = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsArr: [],
    lat: "",
    lot: "",
    address: "",
    dpname: ""
  },

  //跳转商品详情
  goodsDetail(e) {
    // console.log(e.currentTarget.dataset.goodid);
    var goodid = e.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: '../goodsDetail/index?goodId=' + goodid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.deptId);
    var that = this;
    that.setData({
      deptId: options.deptId,
    })
    that.getShopInfoById(options.deptId);
  },

  //根据指定ID获取商铺信息
  getShopInfoById: function(deptId) {
    var that = this;
    //获取当前经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //整理请求参数
        var data = {
          deptId: deptId,
          lat: latitude,
          lng: longitude,
        };
        network.request(getApp().data.baseUrl + '/ztm/api/shopCollect/getShopInfoById', data, function (res) {
          if (res.success) {
            //成功回调
            // console.log(res.data.data)
            that.setData({
              shopInfo: res.data.data,
              goodsArr: res.data.data.goodsList,
              lat: res.data.data.latitude,
              lot: res.data.data.longgitude,
              address: res.data.data.address,
              dpname: res.data.data.name
            })
          }
        }, function (res) {
          //失败回调
          // console.log(res)
        })
      }
    });
  },

  // 点击商铺地址实现定位
  getAddress: function (e) {
    wx.openLocation({
      latitude: this.data.lat,
      longitude: this.data.lot,
      name: this.data.dpname,
      address: this.data.address
    })
  },

  //分享页面
  // onShareAppMessage: function (ops) {
  //   if (ops.from === 'image') {
  //     console.log("666");
  //     // console.log(ops.target);
  //   }
  //   return {
  //     title: this.data.dpname,
  //     path: 'pages/index/index',
  //     success: function (res) {
  //       console.log("分享成功:" + JSON.stringify(res));
  //     },
  //     fail: function (res) {
  //       // 分享失败
  //       console.log("分享失败:" + JSON.stringify(res));
  //     }
  //   }
  // },

  //收藏店铺
  addCollection:function(e){
    var that = this;
    var storeId = e.currentTarget.dataset.deptid;
    // console.log(storeId)
    //整理请求参数
    var data = {
      sessionId: wx.getStorageSync("sessionId"),
      storeId: storeId,
    };
    // console.log(data)
    network.request(getApp().data.baseUrl + '/ztm/api/shopCollect/addCollection', data, function (res) {
      if (res.success) {
        //成功回调
        console.log(res)
        wx.showToast({
          title: res.message,
        })
      }
    }, function (res) {
      //失败回调
      // console.log(res)
    })
  },
  //跳转首页
  toIndex: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //拨打商铺电话
  makeCall: function (e) {
    // console.log(e)
    wx.makePhoneCall({
      phoneNumber: '13699999999' //客服电话
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    network.loginJudge();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})