import Axios from "axios";
import iView from 'iview';
import router from '../router/index.js'
const qs = require('qs');
var user_info = JSON.parse(sessionStorage.getItem('user_info'))
if (user_info) {
  var agent_id = user_info.agent.id
}
//[ 1, 3, 4, 5, 6, 7 ]
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

Axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

Axios.interceptors.response.use((response) => {
  return response;

}, function (error) {
  if (error.response&&error.response.status===401){
    router.push({ path: 'login' });
  }
  return Promise.reject(error);
});

let baseUrl = 'http://47.103.50.102:8300/Home'
// let baseUrl = 'http://192.168.0.104:8081'
let web_url = '47.103.50.102:8305'
// let web_url = '192.168.0.104:8081'
const api = {
  // gambling: `${baseUrl}/gambling`, //获取赌局
  gambling: `${baseUrl}/gambling`, //上庄
  login: `${baseUrl}/oauth/token`, //登陆
  wechatAccessToenk: `${baseUrl}/auth/wechat`, //微信登陆
  bets: `${baseUrl}/gambling/`,
  state: `${baseUrl}/game/state`,
  notification:`${baseUrl}/game/notification`,//通告
  trend:`${baseUrl}/gambling/trend`,
  statistics:`${baseUrl}/gambling/statistics`,
  getUser:`${baseUrl}/user/me`,
  getLog:`${baseUrl}/gambling/log`,
  retister:`${baseUrl}/user`,
  sendCode:`${baseUrl}/user/code`,
  lottery:`${baseUrl}/Topic/lottery`,
  GamblingAction:`${baseUrl}/Gambling/action/`,

}
// 获取用户列表
const http = {
  // 登陆
  login: function (model) {
  	iView.LoadingBar.start();
    return Axios.post(api.login, qs.stringify(model), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  wechatLogin(model) {
    return Axios.get(api.wechatAccessToenk, {
      params: model
    })
  },
  // 获取赌局
  gambling: function (model) {
    return Axios.get(api.gambling, model)
  },
  // 开奖
  lottery: function (model) {
    return Axios.get(api.lottery, model)
  },
  // 上庄
  up_gambling: function (model) {
  	iView.LoadingBar.start();
    console.log(model,'model')
    return Axios.post(api.gambling, model)
  },
  // 下注
  bets: function (model) {
    iView.LoadingBar.start();
    console.log(model);
    return Axios.post(`${api.bets}2/bet`, model)
  },
  getLog:function(model){
    console.log(model,'model>>>>>>')
    return Axios.get(api.getLog, {params:model,paramsSerializer: function(params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
  }})
  },
  state: function () {
    return Axios.get(api.state)
  },
  // 拉取
  // getCode: function() {
  // 	return Axios.get('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc429adbe0546c7c1&redirect_uri=andy-yzz.iicp.net:53869&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
  // }
  trend:function(){
    return Axios.get(api.trend)
  },
  statistics:function(){
    return Axios.get(api.statistics)
  },
  getUser:function(){
    return Axios.get(api.getUser)
  },
  regster:function(model){
    iView.LoadingBar.start();
    return Axios.post(api.retister,model)
  },
  notification:function(){
    return Axios.get(api.notification)
  },
  sendCode:function(model){
    return Axios.get(api.sendCode,{params:model})
  },
  gamblingAction:function(){
    return Axios.get(api.GamblingAction)
  }
}

export { web_url, http };
