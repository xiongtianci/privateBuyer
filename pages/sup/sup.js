// pages/sup/sup.js
var network = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTap:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync("sessionId")){
      that.tabup();
    }
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
  //跳转页面方法
  tabup: function () {
    wx.switchTab({
      url: '../index/index',
    })
  }, 
  //登录授权
  bindGetUserInfo: function (e) {
    var that = this;
    wx.setStorageSync('userInfo', e.detail.userInfo) //如果已有userInfo时写入缓存
    var code = null;
    // 防止重复弹出
    if (that.data.isTap === true) {
      return;
    } else {
      that.setData({
        isTap: true
      });
    }
    if (!wx.getStorageSync("sessionId")) {
      wx.login({
        success: res => {
          console.info(res);
          if (res.errMsg == "login:ok") {
            try {
              code = res.code;
              if (code != null) {
                var data = {
                  code: code,
                  iv: e.detail.iv,
                  encryptedData: e.detail.encryptedData,
                }
                console.log('进入授权', data)
                network.requestLoading(getApp().data.baseUrl + '/ztm/buyer/auth/oauth', data, "POST", "正在登录", function (res) {
                  console.log('授权成功返回用户信息', res)
                  if (res.success) {
                    console.log('成功登陆', data)
                    wx.setStorageSync('sessionId', res.data.csessionId);
                    that.tabup();
                  } else {
                    wx.showToast({
                      icon: 'none',
                      title: res.message,
                      duration: 2500
                    });
                    that.setData({
                      isTap: false
                    });
                  }
                }, function (res) {
                  wx.showToast({
                    icon: 'none',
                    title: '登录验证失败',
                  });
                  that.setData({
                    isTap: false
                  });
                })
              }
            } catch (e) {
              console.log(e);
              that.setData({
                isTap: false
              });
            }
          }
        },
        complete(e) {
          that.setData({
            isTap: false
          });
        }
      });

    } else {
      wx.setStorageSync('userInfo', e.detail.userInfo) //如果已有userInfo时写入缓存
      wx.checkSession({
        success: function () {
          //session_key 未过期，并且在本生命周期一直有效
          var sessionId = wx.getStorageSync('sessionId');
          var data = {
            csessionId: sessionId,
          }
          network.requestLoading(getApp().data.baseUrl + '/ztm/buyer/auth/isLogin', data, "POST", "正在验证身份", function (res) {
            if (res.success) {
              that.tabup();
            } else {
              console.log('自动登录失败')
              try {
                wx.clearStorageSync()
              } catch (e) {
              }
              //重新授权登录
              wx.login({
                success: res => {
                  console.info(res);
                  if (res.errMsg == "login:ok") {
                    try {
                      code = res.code;
                      if (code != null) {
                        var data = {
                          code: code,
                          iv: e.detail.iv,
                          encryptedData: e.detail.encryptedData,
                        }
                        console.log('进入授权', data)
                        network.requestLoading(getApp().data.baseUrl + '/ztm/buyer/auth/oauth', data, "POST", "正在登录", function (res) {
                          console.log('授权成功返回用户信息', res)
                          if (res.success) {
                            console.log('成功登陆', data)
                            wx.setStorageSync('sessionId', res.data.csessionId);
                            that.tabup();
                          } else {
                            wx.showToast({
                              icon: 'none',
                              title: res.message,
                              duration: 2500
                            });
                            that.setData({
                              isTap: false
                            });
                          }
                        }, function (res) {
                          wx.showToast({
                            icon: 'none',
                            title: '登录验证失败',
                          });
                          that.setData({
                            isTap: false
                          });
                        })
                      }
                    } catch (e) {
                      console.log(e);
                      that.setData({
                        isTap: false
                      });
                    }
                  }
                },
                complete(e) {
                  that.setData({
                    isTap: false
                  });
                }
              });
            }

          }, function (res) {
            wx.showToast({
              icon: 'none',
              title: '加载数据失败',
            })
          })
        },
        fail: function () {
          that.setData({
            isTap: false
          });
        },
        complete() {
          that.setData({
            isTap: false
          });
        }
      })
    }
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

  }
})