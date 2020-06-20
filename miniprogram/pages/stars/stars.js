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
    // this.setData({
    //   starred:Film
    // })
    for(let k=0;k<Film.length;k++){
      for (let i = 0; i < 9; i++) {
        allFilms.skip(i*20).get().then(res=>{
          for (let j = 0; j < res.data.length; j++) {
              if(Film[k].videoId==res.data[j]._id)
              userFilm.push(res.data[j])
            }
            // this.setData({
            //   starred:userFilm
            // })
          })
          
      }
    
    }

  })
  console.log("Film",Film)
 
console.log("userFilm",userFilm)
console.log("starred",starred)
      
  },

// onShow:function(){
//   this.getStars()
// }

})