// pages/stars/stars.js
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
const allFilms=db.collection("Films")
Page({
  data:{
    s:[],
    logs:[]
  },
  navigateToInfo: function(e){
    wx.navigateTo({
      url: '../info/info?id='+e.currentTarget.dataset.id
    })
  },
  getlogs:function(){
    const that = this
    const ui = wx.getStorageSync('userInfo')
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
                if(Film[k].videoId==res.data[j]._id){
                  userFilm.push(res.data[j])
                  that.setData({
                    logs:userFilm
                  })
                }
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
  },

  onShow:function(){
    this.getlogs()
  }

})