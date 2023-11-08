let util = require('../../utils/util.js')
const db = wx.cloud.database()
// pages/home/home.js
const app = getApp()

  
Page({
  data: {
    hasUserInfo: false,
    hasDataBase: false,
    userInfo:{
      avatarUrl:'',
      nickName:'',
      openId:''
    }

  },

  

  chooseAvatar:function (e) {
      const {avatarUrl} = e.detail
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
      })

      if(this.data.userInfo.avatarUrl && this.data.userInfo.nickName &&
        this.data.userInfo.openId){
        wx.setStorageSync('userInfo', this.data.userInfo)
        this.setData({
          hasUserInfo:true
        })
        wx.showToast({
          title: '登录成功',
        })
      }
  },

  inputChange: function (e) {
    
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickName":nickName
    })

    if(!this.data.userInfo.avatarUrl){
      wx.showToast({
        title: '请添加头像',
      })
    }

    if(this.data.userInfo.avatarUrl && this.data.userInfo.nickName && 
      this.data.userInfo.openId){
      wx.setStorageSync('userInfo', this.data.userInfo)
      this.setData({
        hasUserInfo:true
      })
      wx.showToast({
        title: '登录成功',
      })
    }
  },

  navTo:function (params) {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  onLoad(options) {
    if(app.globalData.userInfo){
      this.setData({
        "userInfo.avatarUrl":app.globalData.userInfo.avatarUrl,
        "userInfo.nickName":app.globalData.userInfo.nickName,
        "userInfo.openId":app.globalData.userInfo.openId,
        hasUserInfo:true
      })
    } else{
      wx.cloud.callFunction({
        name:'quickstartFunctions',
        data:{
          type:'getOpenId'
        }
      }).then((res) => {
        this.data.userInfo.openId = res.result.userInfo.openId
        
      })
    }
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