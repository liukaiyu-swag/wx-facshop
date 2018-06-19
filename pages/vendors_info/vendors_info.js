// pages/vendors_info/vendors_info.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vendors_info: null,
    current: '整机电教'
  },

  fn: function (e) {
    this.setData({
      current: e.currentTarget.dataset.id
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
  formatData: function (data) {
    let o = {}
    data.forEach(vendor => {
      let key = vendor.main.value || '其他';
      if (!o[key]) {
        o[key] = []
      }
      o[key].push(vendor);
    })
    return o;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.showLoading();
    if (!this.data.vendors_info) {
      if (wx.getStorageSync('vendors_info')) {
        wx.hideLoading();
        this.setData({
          vendors_info: wx.getStorageSync('vendors_info')
        })
      } else {
        wx.request({
          url: util.url + 'database.json',
          success: (res) => {
            wx.hideLoading();
            wx.setStorageSync(
              "vendors_info",
              this.formatData(res.data)
            )
            this.setData({
              vendors_info: this.formatData(res.data)
            })
          },
          fail: () => util.fail()
        })
      }

    }
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