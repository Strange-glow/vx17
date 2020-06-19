// miniprogram/pages/info/info.js
const app = getApp()
const db = wx.cloud.database()
const filmsCollection=db.collection('Films')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCollected: false
  },
  onChange: function(e){
    //收藏按钮触发事件
    //todo
    const videoId = e.currentTarget.dataset.id
    console.log("videoId",videoId)
    const ui = wx.getStorageSync('userInfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/collection/collection',
      })
    }else{
      wx.cloud.callFunction({
        name:"addCollection",
        data:{
          videoId: videoId,
          openid:ui.openid,
          date:Date.now()
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
     await filmsCollection.where({
       _id:options.id
     }).get().then(res=>{
       this.setData({
         movies: res.data[0]
       })
     })
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
})