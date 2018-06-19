// pages/login/login.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      email: null,
      password: null,
    }
  },
  updateFormData: function (e) {
    let o = this.data.formData;
    o[e.currentTarget.dataset.key] = e.detail.value;
    this.setData({
      formData: o
    })
  },
  submit: function () {
    util.showLoading();
    wx.request({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.data.formData,
      url: util.url + 'customer/login/account',
      success: res => {
        wx.hideLoading();
        if(res.data.code==200){
          // 记录access_token
          wx.setStorageSync("uuid",res.header['Fecshop-Uuid']);
          wx.setStorage({
            key:'access-token',
            data: res.header['Access-Token'],
            success:function(){
              wx.navigateBack()
            }
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      },
      fail: () => util.fail()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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