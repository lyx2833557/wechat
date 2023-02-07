// app.js
App({
  onLaunch() {
  },
  onLoad(){

  },
  onShow(){},
  // 自定义请求的方法
  request(opt){
    return new Promise((resolve,reject)=>{
      let token=""
    wx.request({
      // 接口请求地址 域名+接口地址 
      url: this.globalData.baseURL+opt.url,
      method:opt.method || 'GET',
      data:opt.data||{},
      timeout:10000, 
      header:{
        'authorization':token},
        success(res){
          // 成功
          if(res.data.code==200){
            resolve(res.data)

          }else if(res.data.code==401){
                  // 401是身份错误或者token验证问题
                  // 刷新token
                   resolve(res.data)
          }else{
            // 其他异常情况
            // showToast是弹框
           wx.showToast({
             title:res.data.meesageToUser,
             icon:"none"
           })
           resolve(res.data)
          }

        }, 
        fail(res){
          // 接口请求 失败
          reject(res.data )
        }   
    })
    })
    
  },
  // 每一个请求地址都包括域名，所以域名存放在全局变量中
  globalData: {
    userInfo: null,
  // 请求的地址
    baseURL:'http://localhost:3000'
  }
})
