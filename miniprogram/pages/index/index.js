//index.js
const app = getApp()
const db = wx.cloud.database()
const filmsCollection=db.collection('Films')
Page({
  data:{
    value:'',
    shows:[],
    icon:"star-o",
    button:"收藏"
  },
  onSearch: function(e){
    var idset=[]
    filmsCollection.where({
      name:db.RegExp({
        regexp:e.detail,
        options:'i',
      })
    }).get().then(res=>{
      res.data.forEach(element => {
        idset.push(element._id)
      });
      console.log(idset)
        wx.navigateTo({
          url: '../searchlist/searchlist?idset='+idset,
        })
    })
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
      wx.cloud.callFunction({
        name:"addCollection",
        data:{
          videoId: videoId,
          openid:ui.openid,
          date:Date.now()
        }
      })
    }
  },
  navigateToInfo: function(e){
    wx.navigateTo({
      url: '../info/info?id='+e.currentTarget.dataset.id
    })
  },
  pad: function (num) {  
    num=num.toString()
    var len = num.length;  
    while(len < 3) {  
        num = "0" + num;  
        len++;  
    }  
    
    return num;  
},
  onLoad:async function(options){
  var s= new Set();
  var length=178
  while(s.size<4){
    var num=Math.floor(Math.random()*length)+1
    while (s.has(num)) num=Math.floor(Math.random()*length)+1
    s.add(num)
    var id = this.pad(num)
    await filmsCollection.where({
      _id: id
    }).get().then(res=>{
      console.log(res)  
      res.data[0].points=parseFloat(res.data[0].points.substring(5))
      this.data.shows.push(res.data[0])
    })
  }
  this.setData({
    films: this.data.shows
  })
  },
  onPullDownRefresh:async function(res){
    this.data.shows=[]
    var s= new Set();
  var length=178
  while(s.size<4){
    var num=Math.floor(Math.random()*length)+1
    while (s.has(num)) num=Math.floor(Math.random()*length)+1
    s.add(num)
    var id = this.pad(num)
    await filmsCollection.where({
      _id: id
    }).get().then(res=>{
      console.log(res)  
      res.data[0].points=parseFloat(res.data[0].points.substring(5))
      this.data.shows.push(res.data[0])
    })
  }
  this.setData({
    films: this.data.shows
  })
  wx.stopPullDownRefresh()
  },
  // onShow: function(){
  //   this.setData({
  //     films: this.data.shows
  //   })
  // }
  
})
