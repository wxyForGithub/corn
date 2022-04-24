<template>
  <div class="home_container">
    <div class="main_container mx-auto relative flex flex-col justify-center items-center">
      <img src="../../assets/lucky/logo.png" class="w-258px h-264px" />
      <div class="static md:absolute md:top-16 md:right-4">
        <div class="border_btn text-16px text-FFFFFF" @click="h5Copy(myAddress)">{{myAddress|subAddress(5)}}</div>
        <div class="border_btn text-16px text-FFFFFF mt-2.5" @click="openWhitePaper">WHITEPAPER</div>
      </div>
    </div>
    <div class="lg:text-24px text-16px text-FBFF00 font-bold mt-2.5 main_container mx-auto px-4 lg:px-0 md:mt-0">The BNB Reward Pool with the 10% daily return and 13% referral rewards and lowest dev fee</div>
    <div class="flex flex-col lg:flex-row main_container mx-auto mt-8 space-y-4 lg:space-y-0 lg:space-x-4 px-4 lg:px-0">
      <!-- card1 -->
      <div class="card1 p-4 lg:w-1/3">
        <div class="flex flex-row justify-between">
          <div class="fStyle18_3D3D3D_bold">Contract</div>
          <div class="fStyle18_FFED4C_bold">{{totalSupply|subNumber}} BNB</div>
        </div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle18_3D3D3D_bold">wallet</div>
          <div class="fStyle18_FFED4C_bold">{{bnbBalance | subNumber}} BNB</div>
        </div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle18_3D3D3D_bold">You Corn</div>
          <div class="fStyle18_FFED4C_bold scale_text">{{coinAmount}} Corn</div>
        </div>
        <div class="input_wrap flex flex-row justify-between items-center px-4 mt-5">
          <input type="text" v-model="amount" class="w-full mr-4 h-full"/>
          <div>BNB</div>
        </div>
        <button class="round_button button mt-4" @click="burn">ROASTED CORN</button>
        <div class="flex flex-row justify-between mt-4">
          <div class="fStyle14_3D3D3D_bold">Daily Return</div>
          <div class="fStyle14_FFED4C_bold">10%</div>
        </div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle14_3D3D3D_bold">APR</div>
          <div class="fStyle14_FFED4C_bold">3650%</div>
        </div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle14_3D3D3D_bold">Dev Fee</div>
          <div class="fStyle14_FFED4C_bold">3%</div>
        </div>
      </div>
      <!-- card2 -->
      <div class="card2 p-4 lg:w-1/3">
        <div class="fStyle24_FBFF00_bold text-left">Referral Link</div>
        <div class="fStyle14_FFFFFF_bold mt-2.5 text-left">Earn 13% of the BNB used to roast corn from anyone who uses your referral link</div>
        <div class="flex flex-row justify-between mt-6">
          <div class="input_wrap s_input_wrap flex flex-row justify-between items-center px-4 ellipsis">
            <div>{{shareUrl()}}</div>
          </div>
          <button class="button mini_button ml-10" @click="h5Copy(shareUrl())">COPY</button>
        </div>
        <div class="h_dot_line"></div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle18_FFFFFF_bold">Your Rewards</div>
          <div class="fStyle18_FFFFFF_bold scale_text">{{reward|subNumber(8)}} BNB</div>
          <!-- <div class="fStyle18_FFFFFF_bold">{{reward }} BNB</div> -->
        </div>
        <div class="flex flex-row justify-between mt-8">
          <button class="midlle_button button" @click="rebuy">RE-ROAST</button>
          <button class="midlle_button button" @click="getReceiveIncome">EAT CORN</button>
        </div>
      </div>
      <!-- card3 -->
      <div class="card3 p-4 lg:w-1/3">
        <div class="fStyle24_3D3D3D_bold text-left">LuckyBNB(beta)</div>
        <div class="fStyle14_3D3D3D_bold mt-2.5 text-left">After 10 blocks<br />
          Victory gets 3x return</div>
        <div class="flex flex-row justify-center mt-6">
          <button class="midlle_button button" @click="go">BET</button>
        </div>
        <div class="h_dot_line"></div>
        <div class="fStyle24_3D3D3D_bold text-left">lucky pool</div>
        <div class="flex flex-row justify-between mt-2">
          <div class="fStyle18_3D3D3D_bold">lucky pool</div>
          <div class="fStyle18_FFED4C_bold">{{totalSupply |subNumber}} BNB</div>
        </div>
         <div class="flex flex-row justify-between mt-2">
          <div class="fStyle18_3D3D3D_bold">Dev Fee</div>
          <div class="fStyle18_FFED4C_bold">1%</div>
        </div>
      </div>

    </div>
    
    <div class="flex flex-row justify-center items-center space-x-4 main_container mx-auto mt-16">
      <a href="https://t.me/roastedcorn_io">
        <img src="../../assets/lucky/telegram.png" alt="" class="w-35px md:w-50px h-35px md:h-50px"/>
      </a>
      <a href="https://twitter.com/RoastedCorn_io">
        <img src="../../assets/lucky/twitter.png" alt="" class="w-35px md:w-50px h-35px md:h-50px"/>
      </a>
      <a :href="'https://bscscan.com/address/'+contractAddress+'#code'">
        <img src="../../assets/lucky/window.png" alt="" class="w-35px md:w-50px h-35px md:h-50px"/>
      </a>
    </div>
  </div>
</template>

<script>
import { h5Copy, initEth, timeUtils, vertify, Decimal } from "@/utils/utils";
import { ethers } from "ethers";
import { abi } from "./abi";
import { Toast } from "vant";
import { GLOBAL_CONFIGS } from "../../utils/global";
import EthersUtils from '@/utils/ethersUtils/index'
import ContractUtils from '@/utils/ethersUtils/contractUtils'
import {wei2Amount, amount2Wei} from '@/utils/ethersUtils/helper/number'
const RATE = ["0.1", "0.005", "0.006", "0.007", "0.008"];
export default {
  data() {
    return {
      provider: null,
      contractAddress: "0xAE247c40C96bebDCbc8083aa982Bd84b9abaa9c0", // 合约地址
      contract: null, // 当前的合约对象
      myAddress: "", // 我的地址
      balance: "0.00", // 我的余额
      bnbBalance: '0.00', // BNB余额
      // totalPower: "0",// 全网通证总量
      totalSupply: "0", // 全网通证总量
      power: "0", // 我的算力
      reward:"0",
      num:"0",
      level: 1,
      lvShow: false,
      bgShow: false,
      pledgeShow: false,
      pledgeOutShow: false,
      type: 1,
      epoch: 86400, // 挖矿周期
      inviteCount: "0", // 邀请的人数
      receiveTimestamp: 0, // 上次领取奖励的时间戳
      receiveTime: "", // 上次领取奖励的时间
      nextReceiveTime: "", // 下次领取奖励的时间
      inviteAddress: "", // 已绑定邀请人地址
      inviteAddressInput: "", // 输入邀请人的地址
      rewardCount: 0, // 获取累计收益
      incomeFlag: false, // 领取收益弹框
      showBurnFlag: false, // 燃烧算力弹框
       showrebuy: false, // 燃烧算力弹框
      receiveAble: false, // 收益是否可以被领取
      showgetFlag: false,
      amount: "0", // 燃烧数量
      expectAmount: 0, // 预估收益
      decimals: 18, //精度
      config: GLOBAL_CONFIGS,
      assetUrl: "",
      coinBalanceOf: 0,
      is_mint: false,
      plageName: "",
      coinAmount: 0,
      queryAddress: '0x0000000000000000000000000000000000000000',
      submtting: false,
    };
  },
  async created() {
    await this.getAddress();
    let currAbi = abi;
    // var contract = new ethers.Contract(
    //   this.contractAddress,
    //   currAbi,
    //   this.signer
    // );
    const base =  await new EthersUtils()
    this.provider = base;
    const contract = await new ContractUtils(this.contractAddress, currAbi, this.provider.signer, this.provider.address, this.provider.gasPrice, this.provider.provider, false)
    const {address} = this.$route.query
    if(address) {
      this.queryAddress = address
    }
    this.contract = contract;
    this.getTotalSupply()
    await this.getBnbBalance();
    this.getCoinAmount()
    setInterval(async ()=>{
      await this.getreward();
    }, 10000)
    
  },
  mixins: [h5Copy, initEth, timeUtils, vertify, Decimal],
  methods: {
    show(num) {
      this.type = num;
      this.bgShow = true;
    },
    // 获取合约初始化数据，以后都不会更新的方法，只请求一次
    // async initContract() {
    //   let _gasPrice = await this.signer.getGasPrice()
    //   _gasPrice = ethers.utils.hexValue(_gasPrice);
    //   _gasPrice = this.hex2int(_gasPrice) / ethers.BigNumber.from(10).pow(9);
    //   this.min_gasprice = _gasPrice
    // },
    async getBnbBalance() {
      var num = await this.provider.provider.getBalance(this.provider.address);
      this.bnbBalance= wei2Amount(num, 18)
    },
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if (error == null) {
        this.myAddress = address;
      } else {
        console.log(error);
      }
    },
    // 得到奖池余额
    async getTotalSupply() {
      var num = await this.provider.provider.getBalance(this.contractAddress);
      this.totalSupply= wei2Amount(num, 18)
    },
    async getCoinAmount() {
      let [error, res] = await this.contract.methodWithDecimal('hatcheryMiners', 0, [this.provider.address]);
      if(error == null) {
        this.coinAmount = res
      }
    },
    // 得到精度
    async getDecimals() {
      let [error, res] = await this.to(this.contract.decimals());
      this.doResponse(error, res, "decimals");
    },
   //我的奖励
    async getreward() {
      let [error, eggs] = await this.contract.methodWithDecimal('getMyEggs', 0);
      let [, res] = await this.contract.methodWithDecimal('calculateEggSell', 18, [eggs])
      if(error == null) {
        this.reward = res
      }
    },
    // 质押
    async burn() {
      if(this.submtting) {
        return;
      }
      if (!this.amount) {
          this.$toast("enter Amount");
          return;
      }  
      let QKIamount = amount2Wei(this.amount, 18);
      this.submtting = true
      let [error,] = await this.contract.estimateMethod('buyEggs', ()=>{
        this.amount = "";
        this.submtting = false
        this.getTotalSupply()
        this.getBnbBalance()
        Toast("Success");
        return [null]
      }, [this.queryAddress], QKIamount)

      if(error != null) {
        this.submtting = false
        this.amount = "";
        Toast(error)
      }
    },
     // 投注
    async go() {
      Toast('coming soon')
      // if (!this.amount) {
      //     this.$toast("请输入参数");
      //     return;
      // }   
      // let QKIamount = ethers.utils.parseEther(this.amount);
      // let [error, res] = await this.to(this.contract.rand({value: QKIamount}))
      // console.log(error, res);
      // if (this.doResponse(error, res)) {
      //   this.amount = "";
      //   this.showBurnFlag = false;
      //   Toast("操作成功");
      //   await this.queryTransation(res.hash);
      // }
    },
    // 领取挖矿收益
    async getReceiveIncome() {
      if(this.submtting) {
        return;
      }
      this.submtting = true
      let [error,] = await this.contract.estimateMethod('sellEggs', ()=>{
        this.submtting = false
        this.getTotalSupply()
        this.getBnbBalance()
        Toast("Success");
        return [null]
      })

      if(error != null) {
        this.submtting = false
        Toast(error)
      }
    },
    // 复投
    async rebuy(){ 
      if(this.submtting) {
        return;
      }
      this.submtting = true
      let [error,] = await this.contract.estimateMethod('hatchEggs', ()=>{
        this.submtting = false
        this.getTotalSupply()
        this.getBnbBalance()
        Toast("Success");
        return [null]
      }, [this.queryAddress])

      if(error != null) {
        this.submtting = false
        Toast(error)
      }
    },
    // 查询Transaction
    async queryTransation(hash, updateTime, callback) {
      await this.provider.waitForTransaction(hash).then(async (receipt) => {
        Toast("success", receipt);
        if(callback) {
          callback();
        } else {
          await this.getTotalSupply();
        }
        
      });
    },
    async calcExpectAmount(distance) {
      // 计算阶段奖励
      let currRate = "0.01";
      if (this.level == 1) {
        // if (this.coinBalanceOf < 1) {
        //   currRate = "0.001";
        // } else {
        //   currRate = RATE[this.level - 1];
        // }
        currRate = RATE[this.level - 1];
      } else {
        currRate = RATE[this.level - 1];
      }
      // 奖励是否过期
      let day = Math.floor(Math.abs(distance) / this.epoch);
      day = day + 1;
      // let expectAmount = this.accMul(this.power, currRate);
      if (this.timestampToTime == 0) {
        day = 1;
      } else {
        if (this.level == 1) {
          if (day > 1) {
            day = 1;
          }
        } else {
          if (day > 7) {
            day = 7;
          }
        }
      }

      // let par1 =
      this.expectAmount = this.accMul(this.accMul(this.power, currRate), day);
    },
    // 十六进制转10进制
    hex2int(hex) {
      if (hex.indexOf("0x") >= 0) {
        hex = hex.substring("2");
      }
      var len = hex.length,
        a = new Array(len),
        code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }
      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    // response公共处理方法
    doResponse(error, res, keyName, Decimal = 0) {
      console.log(keyName + "================", error, res);
      if (error == null) {
        if (keyName) {
          let hex = ethers.utils.hexValue(res);
          let Value =
            this.hex2int(hex) / ethers.BigNumber.from(10).pow(Decimal);
          this[keyName] = Value;
        }
        return true;
      } else {
        if (error.code == "INSUFFICIENT_FUNDS") {
          Toast("矿工费不足");
        } else if (error.code == 4001) {
          Toast("用户取消");
        } else {
          Toast("错误代码:" + error.code);
        }
        return false;
      }
    },
    // 输入全部
    inputAll() {
      this.amount = this.power-0.002;
    },
    shareUrl() {
      const origin = (window.location.href || '').split('#')[0]
      const text = origin+'#/home?address='+this.myAddress
      return text
    },
    async getEstimateGas(fn) {
      const [err, res] = await this.to(fn());
      if (this.doResponse(err, res)) {
        const hex = ethers.utils.hexValue(res);
        const Value = this.hex2int(hex);
        return String(Decimal.mul(Value, 1.5)).split(".")[0];
      } else {
        return 0;
      }
    },
   openWhitePaper() {
     window.location.href="https://crustwebsites.net/ipfs/QmYX1nuSxYDcFEVbn4cySonYCEJfwWyLkKgVNLZjgjgJoG"
    }
  },
    receiveTimestamp(newTime) {
      if (newTime != 0) {
        this.receiveTime = this.timestampToTime(this.receiveTimestamp);
        this.nextReceiveTime = this.timestampToTime(this.receiveTimestamp + this.epoch);
      }
      // 获取当前时间
      let nowTimeStr = Date.now().toString().substring(0, 10);
      // 如果distance大于0表示收益还不可以领取。需要计算倒计时
      let distance = this.receiveTimestamp + this.epoch - Number(nowTimeStr);
      if (distance > 0) {
        this.countDown(distance, () => {
          this.calcExpectAmount(distance);
          this.receiveAble = true;
        });
        this.receiveAble = false;
      } else {
        this.calcExpectAmount(distance);
        this.receiveAble = true;
      }
    },
    
};
</script>

<style scoped lang="scss">
$fColor_FBFF00: #FBFF00;
$fColor_5D5B5B: #5D5B5B;
$fColor_FFED4C: #FFED4C;
$fColor_3D3D3D: #3D3D3D; 
$fColor_FFE224: #FFE224;
$fColor_FFFFFF: #FFFFFF;
$fSize_24: 24px;
$fSize_18: 18px;
$fSize_14: 14px;

.fStyle14_FFFFFF_bold{
  color: $fColor_FFFFFF;
  font-size: $fSize_14;
  font-weight: bold;
}
.fStyle14_3D3D3D_bold{
  color: $fColor_3D3D3D;
  font-size: $fSize_14;
  font-weight: bold;
}
.fStyle14_FFED4C_bold{
  color: $fColor_FFED4C;
  font-size: $fSize_14;
  font-weight: bold;
}
.fStyle18_5D5B5B_bold{
  color: $fColor_5D5B5B;
  font-size: $fSize_18;
  font-weight: bold;
}
.fStyle18_3D3D3D_bold{
  color: $fColor_3D3D3D;
  font-size: $fSize_18;
  font-weight: bold;
}
.fStyle18_FFED4C_bold{
  color: $fColor_FFED4C;
  font-size: $fSize_18;
  font-weight: bold;
}
.fStyle18_FFFFFF_bold{
  color: $fColor_FFFFFF;
  font-size: $fSize_18;
  font-weight: bold;
}
.fStyle24_FBFF00_bold{
  color: $fColor_FBFF00;
  font-size: $fSize_24;
  font-weight: bold;
}
.fStyle24_3D3D3D_bold{
  color: $fColor_3D3D3D;
  font-size: $fSize_24;
  font-weight: bold;
}
.home_container{
  background-size: cover;
  background-position: center center;
  min-height: 100vh;
  background-image: url('../../assets/lucky/background.jpg');
  background-repeat: no-repeat;
  padding-bottom: 40px;
  .main_container{
    max-width: 1100px;
  }
  .border_btn{
    border: 1px solid #fffb03;
    border-radius: 10px;
    box-sizing: border-box;
    width: 203px;
    height: 35px;
    line-height: 35px;
    // font-size: 24px;
    // color: #fff;
    background: #FF9008;
  }
  .card1, .card2,.card3{
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../../assets/lucky/box1.jpg');
    border-radius: 10px;
  }
  .card2{
    background-image: url('../../assets/lucky/box2.jpg');
  }
  .card3{
    background-image: url('../../assets/lucky/box3.jpg');
  }
  .input_wrap{
    height: 51px;
    border-radius: 25px;
    background: rgba(62, 35, 6, 0.78);
    box-sizing: border-box;
    border: 2px solid #FFE224;
    color: #ECFF95;
    font-size: 18px;
    font-weight: bold;
    transition: .3s all;
    input{
      border: none;
      outline: none;
      background-color: transparent;
      text-align: center;
    }
    &.s_input_wrap{
      font-size: 14px;
      color: #fff;
      height: 32px;
    }
    &:hover{
      border:#FFE224;
    }
  }
  .button{
    height: 51px;
    border-radius: 25px;
    background: rgba(241, 132, 29, 0);
    box-sizing: border-box;
    border: 2px solid #FFE224;
    width: 100%;
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    transition: .3s all;
    &:hover{
        background: #FFE224
      }
    &.mini_button{
      height: 32px;
      font-size: 14px;
      width: auto;
      padding-left: 14px;
      padding-right: 14px;
      background: rgba(123, 79, 3, 0.78);
      &:hover{
        background: #FFE224
      }
    }
    &.midlle_button{
      height: 32px;
      font-size: 16px;
      width: auto;
      padding-left: 24px;
      padding-right: 24px;
      background: rgba(123, 79, 3, 0.78);
      &:hover{
        background: #FFE224
      }
    }
  }
  .h_dot_line{
    width: 100%;
    height: 1px;
    border-bottom: 1px dashed #d8d8d8;
    margin-top: 25px;
    margin-bottom: 25px;
  }
}
.scale_text{
  animation: scaleText 1s linear 2s;
}
@keyframes scaleText {
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.2);
    font-weight: 900;
    color: #fff;
  }
  100%{
    transform: scale(1);
  }
}
</style>
