// pages/cart/cart.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAll: null,
    cart_info: null,
    isEmpty: true,
  },

  showDetail: function (e) {
    wx.navigateTo({
      url: '/pages/product_show/product_show?product_id=' + e.currentTarget.dataset.id
    })
  },

  updateInfo: function (e) {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/updateinfo',
      method: 'POST',
      data: {
        up_type: e.currentTarget.dataset.type,
        item_id: e.currentTarget.dataset.id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
      },
      fail: () => util.fail()
    })
  },

  toggleSelectOne: function (e) {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/selectone',
      method: 'GET',
      data: {
        item_id: e.currentTarget.dataset.id,
        checked: e.currentTarget.dataset.active ? 0 : 1
      },
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
      },
      fail: () => util.fail()
    })
  },

  toggleSelectAll: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/selectall',
      method: 'GET',
      data: {
        checked: this.data.selectedAll ? 0 : 1
      },
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.fetchData();
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

  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/cart/index',
      method: 'GET',
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code === 200) {
          let v = res.data.data.cart_info;
          let n = 0;
          if (v) {
            v.products.forEach(item => {
              if (item.active) {
                n = n + 1
              }
            })
            this.setData({
              cart_info: v,
              selectedAll: n == v.products.length,
              isEmpty: false
            })
          } else {
            // 购物车为空
            this.setData({
              isEmpty: true
            })
          }
        } else if (res.data.code === 1100003) {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      },
      fail: () => util.fail()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!wx.getStorageSync('access-token')) {
      wx.navigateTo({ url: '/pages/login/login' })
    } else {
     
        this.fetchData();
      
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