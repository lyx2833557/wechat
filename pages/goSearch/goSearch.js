// pages/goSearch/goSearch.js
import API from '../../requestFn/api'
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seacrhType:1,
    historyList:wx.getStorageSync('historyList') || [],
    hotList:[],
    searchWord:"",
    searchSuggest:[]
  },
  getSearchList(){
    // 1取到用户输入的内容。将内容推到本地存储
    // v-model 双向数据绑定 给input绑定：value（变量） 和@input（改变变量）来实现
    console.log(this.data.searchWord);
    // 将输入后的内容存起
    let searchWord=this.data.searchWord;
    // 取到之前的历史记录
    let historyList=this.data.historyList
    // let historyList=wx.getStorageSync('historyList') || []
    historyList.unshift(searchWord)
    wx.setStorageSync('historyList',historyList)
    this.setData({
      historyList
    })
  },
  // 清空
  delHistory(){
    console.log('历史情况');
    wx.clearStorageSync('historyList')
    this.setData({
      historyList:[]
    })
  },
  // 调取热搜榜接口方法
getHotList(){
  // 这个接口需要一上来就调用，所以放在onload里面调用
  app.request({
    url:API.search.searchHot
  }).then(res=>{
    console.log('热搜榜',res);
    this.setData({
      hotList:res.data
    })
  })
            
},
// 监听用户输入
inputFn(e){
  console.log(e);
  let keyword=e.detail.value;
  app.request({
    url:API.search.searchSuggest,
    data:{
      keywords:keyword,
      type:'mobile'
    }
  }).then(res=>{
    console.log('搜索建议',res);
    this.setData({
      searchSuggest:res.result.allMatch,
      seacrhType:2,
      
     
    })
  })
},
// 点击历史记录的某一项快速进搜索结果并且输入框内文字变成点击的文字
clickHistory(e){  
  console.log(e);
  let keyword=e.currentTarget.dataset.searchword
this.setData({
  searchWord:keyword
})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.getHotList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})