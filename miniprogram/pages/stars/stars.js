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
      url: '../starInfo/starInfo?id='+e.currentTarget.dataset.id
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
      // starred.push(userFilm[0])
    for(let i=0;i<userFilm.length;i++){
      // that.setData({
      //   flag:false
      // })
      // for(let j=0;j<starred.length;j++){
      //     if(logs[i].videoId==starred[j].videoId){
      //       that.setData({
      //         flag:true
      //       })
      //     }
      // }
      if(starred.findIndex(userFilm[i])>=0)
        console.log("已存在")
      else
        starred.push(userFilm[i])
     
    }
    
    })
    
    console.log("Film",Film)
    console.log("userFilm",userFilm)
    console.log("starred",starred)
  },

  onShow:function(){
    this.getlogs()
  }

})