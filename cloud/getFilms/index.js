// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  try {
		if(event.type == "get"){
	    return await targetDB.where(event.condition)
		  .skip(20*event.skip) 
		  .limit(event.limit) 
      .get()
    }

   } catch (e) {
    console.error(e)
  }

}