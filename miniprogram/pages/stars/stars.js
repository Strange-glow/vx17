// pages/stars/stars.js
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
const allFilms=db.collection("Films")

Page({

  data:{
    s:[],
    logs:[],
    final:[],
    flag:false
  },
  navigateToInfo: function(e){
    wx.navigateTo({
      url: '../info/info?id='+e.currentTarget.dataset.id
    })
  },
  navigateToFind: function(event){
    wx.switchTab({
      url: '../index/index'
    })
  },
 func:async function(){
   
   const that=this
   var Film=[]
   var userFilm=[]
   var len=0
   var ids=[]
   this.setData({
     final:[]
   })
  const ui = wx.getStorageSync('userInfo')
  wx.cloud.callFunction({
    name:"getS",
    data:{
      openid:ui.openid
    },
    success:res=>{
      that.setData({
        logs:res.result.data
        
      })
      for(let i=0;i<res.result.data.length;i++){
        Film.push(res.result.data[i])
      }
      for(let j=0;j<Film.length;j++){
        wx.cloud.callFunction({
          name: "getVideoById",
          data: {
            videoId:Film[j].videoId
          },
          success:res=>{
            console.log("res",res)
            if(ids.indexOf(res.result.data[0]._id)==-1){
              ids.push(res.result.data[0]._id)
              userFilm.push(res.result.data[0])
            }
            that.setData({
              final:userFilm
            })
          },
          fail: res => {
            console.log("失败")
          }
        })
      }
    },
    fail:res=>{
      console.log("失败")
    }
  })
 },

  onShow:function(){
    this.func()
  }

})