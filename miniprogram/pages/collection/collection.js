Page({
  data:{
    userInfo:{},
    openid:"",
    collection: []
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
        this.getCollection()
      },
      fail:res=>{
        console.log("云函数调用失败")
      }
    })
  },
  getCollection:function(){
    const that = this
    const ui = wx.getStorageSync('userInfo')
    wx.cloud.callFunction({
      name:"getCollection",
      data:{
        openId:ui.openId
      },
      success:res=>{
        console.log("res",res)
        that.setData({
          collection:res.result.data
        })
      },
      fail: res=>{
        console.log("res",res)
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
    this.getCollection()
  }
})