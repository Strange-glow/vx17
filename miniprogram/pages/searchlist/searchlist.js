// miniprogram/pages/searchlist/searchlist.js
const app = getApp()
const db = wx.cloud.database()
const filmsCollection=db.collection('Films')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shows:[]
  },
  navigateToInfo: function(e){
    wx.navigateTo({
      url: '../info/info?id='+e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    var idset=options.idset.split(',')
    //console.log(idset)
    if(idset[0]==="") idset=[]
    this.setData({
      len: idset.length,
    })
      for (let index = 0; index < idset.length; index++) {
        const element = idset[index];
        await filmsCollection.where({
          _id: element
        }).get().then(res=>{ 
          res.data[0].points=parseFloat(res.data[0].points.substring(5))
          this.data.shows.push(res.data[0])
      });
      }
       
    this.setData({
      films: this.data.shows
    })
    //console.log(this.data.shows)
  },

})