// pages/search/search.js
const app = getApp()
let util = require('../../utils/util.js')
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    current:'',
    title:'',
    scrollTop:0,
  },

  back:function (params) {
    wx.navigateBack()
  },

  upData:function (e) {
   console.log(e)
   if( wx.getStorageSync('userInfo')){
    let date = util.formatTime(new Date()).toString().substring(0,10)
    let cont
    let tit
    cont = this.data.current[e.currentTarget.id]
    tit = this.data.title

    db.collection('userlist').where({}).update({
      data:{
        [date]: _.push({content:cont,title:tit})
      }
    }).then(() => {
      wx.showToast({
        title: '添加成功',
      })
    })
   } else {
    wx.showModal({
      content:'前往个人中心登录即可添加摘录',
      showCancel:false,
      confirmText:'确定',

    })
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      title:app.globalData.searchContent[options.id].title,
      current:app.globalData.searchContent[options.id].content
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }

 
})