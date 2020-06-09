Page({
  data:{
    userInfo:{},
    openid:"",
  },
  onGotUserInfo:function(e){
    const that=this
    wx.cloud.callFunction({
      name:"login",
      success:res=>{
        console.log("云函数调用成功")
        that.setData({
          openid:res.result.openid,
          userInfo:e.detail.userInfo,
        })
        that.data.userInfo.openid=that.data.openid
        console.log("userInfo",that.data.userInfo)
        wx.setStorageSync("userInfo", that.data.userInfo)
      },
      fail:res=>{
        console.log("云函数调用失败")
      }
    })
  },
  onload:function(options){
    const ui=wx.getStorageSync('userInfo')
    this.setData({
      userinfo:ui,
      // 1111
      openid:ui.openid
    })
  }
})