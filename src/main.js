import Vue from 'vue'
import App from './App.vue'
// import '@/utils/rem'
import router from '@/router/router';
import './common/common.scss';
import { Toast, List,Empty } from 'vant';
import 'vant/lib/toast/style';
import 'vant/lib/list/style';
import 'vant/lib/empty/style';
import {calcShowAmount} from '@/utils/ethersUtils/helper/number'

import './assets/css/index.css';
import i18n from './il8n';
Vue.use(Toast);
Vue.use(List);
Vue.use(Empty)

Vue.config.productionTip = false


Vue.filter('subNumber', (value, arg1 = 4) =>{
  return calcShowAmount(value, arg1)
})
Vue.filter('timestamp2Time', (timestamp) =>{
  if(!timestamp){
    return '0000:00:00 00:00'
  }
  var date = new Date(Number(timestamp) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + " ";
  var h = (date.getHours() < 10 ? "0"+date.getHours() : date.getHours()) + ":";
  var m = (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes())  + ":";
  var s = (date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
})
Vue.filter('subAddress', (value, arg1 = 17) =>{
  const address = value
  if (address !== '') {
    const prevStr = address.substring(0, arg1)
    const lastStr = address.substring(
      address.length - arg1,
      address.length,
    )
    return prevStr + '...' + lastStr
  } else {
    return ''
  }
})
Vue.filter('uppercase', (value) =>{
    return value.toUpperCase()
})

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
