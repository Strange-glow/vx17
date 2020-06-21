// pages/catogory/catogory.js
const db=wx.cloud.database()
const productsCollection=db.collection('Films')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav:0,
    navList:[
      {id:0,type:"全部"},{id:1,type:"恐怖"},{id:2,type:"犯罪"},{id:3,type:"战争"},{id:4,type:"武侠"},{id:5,type:"喜剧"},{id:6,type:"爱情"},{id:7,type:"科幻"},{id:8,type:"动作"},{id:9,type:"悬疑"}],
    
  },

  activeNav(e){
    this.setData({
      currentIndexNav:e.target.dataset.index,
    })
    var index=e.target.dataset.index;
    var str=this.data.navList[index].type;
    if(index==0){
      wx.navigateTo({
        url:'../catogory/catogory' //恐怖
      })
    }else if(index==1){
      wx.navigateTo({
        url:'../page1/page1' //恐怖
    })
    }else if(index==2){
      wx.navigateTo({
        url:'../page2/page2' //犯罪
      })
    }else if(index==3){
      wx.navigateTo({
        url:'../page3/page3' //战争
      })
    }else if(index==4){
      wx.navigateTo({
        url:'../page4/page4' //武侠
      })
    }else if(index==5){
      wx.navigateTo({
        url:'../page5/page5'  //喜剧
      })
    }else if(index==6){
      wx.navigateTo({
        url:'../page6/page6' //爱情
      })
    }else if(index==7){
      wx.navigateTo({
        url:'../page7/page7' //科幻
      })
    }else if(index==8){
      wx.navigateTo({
        url:'../page8/page8'  //动作
      })
    }else if(index==9){
      wx.navigateTo({
        url:'../page9/page9'  //悬疑
      })
    }
   
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var total=178;
    const batchTimes = Math.ceil(total / 20)
     var Film=[]          
    
    for (let i = 0; i < batchTimes; i++) {
      db.collection('Films').skip(i*20).get().then(res=>{
        for (let j = 0; j < res.data.length; j++) {
            res.data[j].points=parseFloat(res.data[j].points.substring(5))
            Film.push(res.data[j])
          }
          this.setData({
            Films:Film
          })
        })
        
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})