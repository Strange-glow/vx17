// pages/stars/stars.js
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
Page({
 data:{
    stars:[]
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
        stars:res.result.data
      })
    },
    fail:res=>{
     console.log("云函数调用失败")
    },
  })
},
onShow:function(){
  this.getStars()
}

})