import { get } from './http'

/// 获取团队信息
export const teamInfo = (contract_address, chain_id, w_address) => get('/team/info', {address: contract_address, chain_id: chain_id, account: w_address});

/// 获取记录
export const smallList = (contract_address, chain_id, w_address, page, per_page = 5) => get('/team/small', {address: contract_address, chain_id: chain_id, account: w_address, page, per_page});


// eg:::
// import {airdropApi, receiveApi} from '../pathTo/utils/request/api';
// methods:{
//   async getDetail(){
//     let params = {
//       page: 1,
//       deviceCode: 'xxxx',
//       type: 'xxx'
//     }
//     let res = listApi(params);
//     if(res.code == 0) {
//       // doSomething
//     }
//   }
// }