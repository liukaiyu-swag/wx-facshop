// pages/product_show/product_show.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visibleTabKey: 'desc',
    sku_num: 1,
    product_data: null,
    product_id: null,

    // 购物车中的商品总数量
    items_count: 0,
  },

  

  addToFavorite: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/favorite',
      data: {
        product_id: this.data.product_id
      },
      header: {
        'access-token': wx.getStorageSync('access-token')
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code === 200) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success'
          })
        } else if (res.data.code === 1100003) {
          wx.navigateTo({ url: '/pages/login/login' })
        }
      },
      fail: () => util.fail()
    })
  },

  setSkuNum: function (e) {
    this.setData({
      sku_num: Number(e.detail.value)
    })
  },

  changeVisibleKey: function (e) {
    this.setData({
      visibleTabKey: e.currentTarget.dataset.key
    })
  },

  changeProperty: function (e) {
    this.setData({
      product_id: e.currentTarget.dataset.oid
    })
    this.fetchData();
  },

  minusSkuNum: function () {
    if (this.data.sku_num > 1) {
      this.setData({
        sku_num: this.data.sku_num - 1
      })
    }
  },

  plusSkuNum: function () {

    this.setData({
      sku_num: this.data.sku_num + 1
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      product_id: options.product_id || '57bab0d5f656f2940a3bf56e'
    })
  },

  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/index',
      data: {
        product_id: this.data.product_id
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          product_data: res.data.data.product,
          shouldAdd: true
        })
      },
      fail: () => util.fail()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  addToCart: function () {
      util.showLoading();
      wx.request({
        url: util.url + 'checkout/cart/add',
        method: 'POST',
        data: {
          custom_option: {},
          product_id: this.data.product_id,
          qty: this.data.sku_num
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Token': wx.getStorageSync('access-token'),
          'Fecshop-Uuid': wx.getStorageSync('uuid')
        },
        success: res => {
          wx.hideLoading();
          if (res.data.code === 200) {
            let v = res.data.data.items_count
            wx.showToast({
              title: '加入成功',
              icon:'success',
              duration:300
            })
            wx.setStorageSync('items_count',v)
            this.setData({
              items_count:v
            })
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
    if(!wx.getStorageSync('access-token')){
      wx.navigateTo({url:'/pages/login/login'});
    }else{
      if (!this.data.product_data) {
        this.fetchData();
      }
      if(wx.getStorageSync('items_count')){
        this.setData({
          items_count: wx.getStorageSync('items_count')
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