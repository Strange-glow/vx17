// pages/details/details.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   videoId:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      videoId:options.id
    })
    var total=178;
    const batchTimes = Math.ceil(total / 20)
    var Film=[]          
    
    for (let i = 0; i < batchTimes; i++) {
      db.collection('Films').skip(i*20).get().then(res=>{
        for (let j = 0; j < res.data.length; j++) {
            Film.push(res.data[j])
          }
          this.setData({
            Films:Film
          })
        })
      
    }
  },
 
  onChange: function(e){
    //收藏按钮触发事件
    //todo
    this.setData({
      videoId:this.e.currentTarget.dataset.id
    })

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
      wx.showToast({
        title: '收藏成功！',
        icon: 'none',
        duration: 1500
      })
      wx.hideLoading()
    }
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