// pages/indexs/indexs.js
let util = require('../../utils/util.js')
const db = wx.cloud.database()
const _ = db.command
const app = getApp()
let tit = []
let collectionData = 0
let titData
let current = 0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    title:'',
    current:'',
    scrollTop:0,
    search:true,
    searchContent:'',
    select:false
  },
 
  search:function (e) {
    
    if(e.detail.value){
      
      db.collection('Sayings').where({
        title: db.RegExp({
          regexp: e.detail.value
        })
      }).get().then((res) => {
          
          app.globalData.searchContent = res.data
          let temp = []
          for(let i = 0;i < res.data.length;i++){
            temp.push(res.data[i].title)
          }
          this.setData({
            searchContent: temp
          })
        })
    } else {
      this.setData({
        searchContent:''
      })
    }
     
  },

  navTo:function (e) { 
    
    wx.navigateTo({
      url: `../search/search?id=${e.currentTarget.id}`,
    })
  },

  showSearch:function () {
    this.setData({
      search:false
    })
  },

  cancelSearch:function (params) {
    this.setData({
      search:true,
    })
    
  },

  tap:function (e) {
    current = e.target.id
    this.setData({
      current:this.data.list[e.target.id].content,
      select:true
    })
    this.scrollToTop()
  },

  scrollToTop:function () {
      this.setData({
        scrollTop:0
      })
    
  },

  upData:function (e) {
    if( wx.getStorageSync('userInfo')){
      let cont
      let tit
      let date = util.formatTime(new Date()).toString().substring(0,10)
      cont = this.data.list[current].content[e.currentTarget.id]
      tit = this.data.list[current].title
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

  leftScroll:function () {
    
    collectionData += 7
    db.collection('Sayings').skip(collectionData).get().then(
      (res) => {
        titData = res.data
        for(let i = 0; i < res.data.length; i++ ){
           this.data.list.push(res.data[i])
        }
        
        this.setData({
          list:this.data.list,
        })
        
      }
    ).then(() => {
      for(let i = 0; i < titData.length; i++){
        tit.push(titData[i].title)
      }
      
      this.setData({
        title: tit,
        current:this.data.list[0].content
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection('Sayings').limit(7).get().then(
      (res) => {
        this.setData({
          list:res.data,
        })
      }
    ).then(() => {
      for(let i = 0; i < this.data.list.length; i++){
        tit[i] = this.data.list[i].title;
      }
      this.setData({
        title: tit,
        current:this.data.list[0].content
      })
    })

    
    
    db.collection('userlist').where({}).get().then((e) => {
      if(!e.data[0]){
        let date = util.formatTime(new Date()).toString().substring(0,10)
        db.collection('userlist').add({
          data:{
            [date]:[]
            
          }
        })
      } 
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

  },

})