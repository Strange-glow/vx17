// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = wx.cloud.database()
const filmsCollection=db.collection('Collection')
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await filmsCollection.where({
      openid:event.openid
    }).get()
  } catch (e) {
    console.log(e)
  }
}