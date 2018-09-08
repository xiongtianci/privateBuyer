// pages/order/index.js
var network = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    AllOrder: [{
        id: 1,
        imgSrc: '../res/goods_img.jpg',
        shopName: '八马茶叶',
        name: '八马茶叶如意大红袍......',
        price: '500',
        original_price: '1000',
        count: '1',
        cancel_order: false
      },
      {
        id: 2,
        imgSrc: '../res/goods_img.jpg',
        shopName: '八马茶叶',
        name: '武夷山玫瑰花茶2',
        price: '500',
        original_price: '1000',
        count: '1',
        real_pay: '500',
        cancel_order: false
      }
    ],
    HvaePay: [{
      id: 1,
      imgSrc: '../res/goods_img.jpg',
      shopName: '八马茶叶',
      name: '八马茶叶如意大红袍......',
      price: '500',
      original_price: '1000',
      count: '1',
      cancel_order: false
    }, ],
    HavedTake: [],
    HavedCancel: [{
        id: 1,
        imgSrc: '../res/goods_img.jpg',
        shopName: '八马茶叶',
        name: '八马茶叶如意大红袍......',
        price: '500',
        original_price: '1000',
        count: '1',
        cancel_order: true
      },
    ],
    ReturngGoods: [
      {
        id: 1,
        imgSrc: '../res/tea.png',
        shopName: '八马茶叶',
        name: '八马茶叶如意大红袍......',
        price: '500',
        count: '1',
        cancel_order: false
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });

  },
  swichNav: function(e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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

  },

  thCrod: function() {
    wx.navigateTo({
      url: '../goodsCord/index',
    })
  },
  cancelOrder:function(){
    wx.showModal({
      title: '提醒',
      content: '您是否确定取消订单',
      cancelText: '否',
      cancelColor:'#ef4836',
      confirmText:'是',
      confirmColor:'#666',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../refund/index',
          })
        } else if (res.cancel) {
          
        }
      }
    })
  }

})