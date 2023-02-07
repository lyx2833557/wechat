// index.js
// 引入api
import API from '../../requestFn/api'
// 获取应用实例

const app = getApp()

Page({
  data: {
    list:[]
  },
  // 事件处理函数
  goSearch(){
    wx.navigateTo({
      url: '/pages/goSearch/goSearch',
    })
  },

  onLoad(options) {
    this.getTopList()
    // wx.showToast({
    //   title: '提示信息',
    //   icon:"none"
    // })
  },
  // 自己封装一个方法 获取首页数据
  getTopList(){
    app.request({
      url:API.index.getTopListDetail
    }).then(res=>{
      console.log('首页榜单',res);
      if(res.code==200){
          this.setData({
            list:res.list.slice(0,4)
          })
      }
    })
  }
})
