// miniprogram/pages/info/info.js
const app = getApp()
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
const allFilms=db.collection("Films")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows:[],
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
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 2000//持续的时间
      })
      wx.cloud.callFunction({
        name:"addCollection",
        data:{
          videoId: videoId,
          openid:ui.openid,
          date:Date.now()
        }
      })
    }
    this.setData({
      condition:1
    })
  },

  offChange: function(e){
    //已收藏按钮触发事件
    const videoId = e.currentTarget.dataset.id
    console.log("videoId",videoId)
    const ui = wx.getStorageSync('userInfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/collection/collection',
      })
    }else{
      filmsCollection.where({
        videoId:videoId
      }).get().then(res=>{
        for(let j = 0; j < res.data.length; j++) {
          if (res.data[j].openid == ui.openid){
            console.log(res.data[j])
            wx.cloud.callFunction({
              name:"delCollection",
              data:{
                _id:res.data[j]._id
              }
            })
            console.log("已删除")
            break
          }
        }
      })
      wx.showToast({
        title: '已取消',
        icon: 'success',
        duration: 2000//持续的时间
      })
      
    }
    this.setData({
      condition:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const ui = wx.getStorageSync('userInfo')
     await allFilms.where({
       _id:options.id
     }).get().then(res=>{
      res.data[0].points=parseFloat(res.data[0].points.substring(5))
      res.data[0].intro=res.data[0].intro.substring(5)
      this.data.shows=res.data[0]
     })

     this.setData({
       condition:0
     })

     await filmsCollection.where({
       videoId:options.id
     }).get().then(res=>{
       for(let j = 0; j < res.data.length; j++) {
         if (res.data[j].openid == ui.openid){
          this.setData({
            condition: 1
           })
           console.log("已存在收藏")
         }
       }
     })

     console.log(this.data.shows)
     this.setData({
      movies: this.data.shows
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