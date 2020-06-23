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
      console.log("res",res)
      that.setData({
        logs:res.result.data
        
      })
      for(let i=0;i<res.result.data.length;i++){
        Film.push(res.result.data[i])
      }
      console.log("film",Film)
      for(let k=0;k<Film.length;k++){
        for (let i = 0; i < 9; i++) {
          allFilms.skip(i*20).get().then(res=>{
            for (let j = 0; j < res.data.length; j++) {
                if(Film[k].videoId==res.data[j]._id && ids.indexOf(res.data[j]._id)==-1){
                  res.data[j].points=parseFloat(res.data[j].points.substring(5))
                  userFilm.push(res.data[j])
                  ids.push(res.data[j]._id)
                  len=userFilm.length
                  that.setData({
                    final:userFilm
                  })
                }
            }
          }) 
          //console.log("ids",ids)
          console.log("len",len)
        }
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