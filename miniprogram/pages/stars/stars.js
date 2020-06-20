// pages/stars/stars.js
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
const allFilms=db.collection("Films")
Page({
 data:{
    s:[]
 },
getStars:function(){
  const ui  =wx.getStorageSync('userInfo')
  const that=this
  wx.cloud.callFunction({
    name:"getUserStars",
    data:{
      openid:ui.openid
    },
    success:res=>{
      console.log("云函数调用成功")
      console.log("res",res)
      that.setData({
        star:res.data
      })
    },
    fail:res=>{
     console.log("云函数调用失败")
    },
  })
},
onLoad:function(options){
  const ui  =wx.getStorageSync('userInfo')
  var Film=[]
  var userFilm=[]
  var starred=[]
  filmsCollection.get().then(res=>{
    console.log(res)
    for (let j = 0; j < res.data.length; j++) {
      if(res.data[j].openid==ui.openid)
      Film.push(res.data[j])
    }
    this.setData({
      starred:Film
    })
   

  })
  allFilms.get().then(res=>{
    console.log(res)
    for(let i=0;i<starred.length;i++)
    for (let j = 0; j < res.data.length; j++) {
      if(res.data[j]._id==starred[i].videoId)
      userFilm.push(res.data[j])
    }
    this.setData({
      finalOne:userFilm
    })
   

  })
      
  },

// onShow:function(){
//   this.getStars()
// }

})