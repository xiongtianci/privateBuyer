//index.js
var network = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsArr: [],
    page: 1,
    rows: 8,
    tab: 'left',
    banner: [],
  },
  //跳转商品详情
  goodsDetail(e) {
    // console.log(e.currentTarget.dataset.goodid);
    var goodid = e.currentTarget.dataset.goodid;
    wx.navigateTo({
      url: '../goodsDetail/index?goodId=' + goodid,
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
  onLoad: function () {
    var that = this;
    that.queryShopsCollectionList();
    that.getBanner();
  },
  //获取banner
  getBanner: function () {
    var that = this;
    //整理请求参数
    var data = {
      local: '36'
    };
    network.request(getApp().data.baseUrl + '/ztm/api/banner/list', data, function (res) {
      if (res.success) {
        //成功回调
        // console.log(res.data)
        that.setData({
          banner: res.data,
        })
      } else {
        that.setData({
          banner: [],
        })
      }
    }, function (res) {
      //失败回调
      console.log(res)
    })
  },
  //获取首页我的收藏店铺
  queryShopsByMyColl: function () {
    var that = this;
    //获取当前经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //整理请求参数
        var data = {
          sessionId: wx.getStorageSync("sessionId"),
          lat: latitude,
          lng: longitude,
          page: that.data.page,
          rows: that.data.rows,
        };
        network.request(getApp().data.baseUrl + '/ztm/api/shopCollect/queryShopsByMyColl', data, function (res) {
          if (res.success) {
            //成功回调
            console.log(res.data);
            that.setData({
              goodsArr: res.data,
              tab: 'right',
            })

          } else {
            that.setData({
              goodsArr: [],
              tab: 'right',
            })
          }
        }, function (res) {
          //失败回调
          console.log(res)
        })
      }
    });
  },
  //根据商铺的经纬度搜索附近的商铺
  queryShopsCollectionList: function () {
    var that = this;
    //获取当前经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //整理请求参数
        var data = {
          lat: latitude,
          lng: longitude,
          page: that.data.page,
          rows: that.data.rows,
        };
        network.request(getApp().data.baseUrl + '/ztm/api/shopCollect/queryShopsCollectionList', data, function (res) {
          if (res.success) {
            //成功回调
            console.log(res.data)
            that.setData({
              goodsArr: res.data,
              tab: 'left',
            })
          } else {
            that.setData({
              goodsArr: [],
              tab: 'left',
            })
          }
        }, function (res) {
          //失败回调
          console.log(res)
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    network.loginJudge();
  },
})