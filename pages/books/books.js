// pages/books/books.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    list:'',
    current:'',
    scrollTop:0,
    noLogin:true,
    login:false
  },

  tap:function (e) {
    
    this.setData({
      current: this.data.list[e.currentTarget.id]
    })
    this.scrollToTop()
  },

  scrollToTop:function () {
    this.setData({
      scrollTop:0
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('userInfo')){
      let a
      let tempDate
      db.collection('userlist').where({
      }).get().then((res) => {
        a = res.data[0]
        tempDate = Object.keys(a)
        
        for( let i = 0; i < 2; i++){
          tempDate.pop()
        }
        this.setData({
          date: tempDate,
          list: a
        })
        this.setData({
          current: this.data.list[tempDate[tempDate.length-1]],
          noLogin:false
        })
        
      })
    } else {
      this.setData({
        noLogin:true
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
    if(wx.getStorageSync('userInfo')){
      let a
      let tempDate
      db.collection('userlist').where({
      }).get().then((res) => {
        a = res.data[0]
        tempDate = Object.keys(a)
        
        for( let i = 0; i < 2; i++){
          tempDate.pop()
        }
        this.setData({
          date: tempDate,
          list: a
        })
        this.setData({
          current: this.data.list[tempDate[tempDate.length-1]],
          noLogin:false
        })
        wx.stopPullDownRefresh()
      })
    } else {
      this.setData({
        noLogin:true
      })
    }

    
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