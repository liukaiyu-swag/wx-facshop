// pages/register/register.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      email: null,
      password: null,
      firstname: '',
      lastname: 'shop_user',
      // captcha:null
    },
    // captchaPic:null
  },
  submit: function () {
    util.showLoading();
    wx.request({
      method: 'POST',
      url: util.url + 'customer/register/account',
      header: {
        'fecshop-uuid': wx.getStorageSync('uuid'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.data.formData,
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200 || res.data.code == 0) {
          // 记录access_token
          wx.setStorageSync("uuid", res.header['Fecshop-Uuid']);
          wx.setStorage({
            key: 'access-token',
            data: res.header['Access-Token'],
            success: function () {
              wx.navigateBack({
                delta: 2
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.data.error,
            icon: 'none'
          })
        }
      },
      fail: () => util.fail()
    })
  },
  updateFormData: function (e) {
    let o = this.data.formData;
    o[e.currentTarget.dataset.key] = e.detail.value;
    this.setData({
      formData: o
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
    // wx.request({
    //   url: util.url + 'customer/site/captcha',
    //   success:res=>{
    //     this.setData({
    //       captchaPic:res.data.data.image
    //     })
    //   }
    // })
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