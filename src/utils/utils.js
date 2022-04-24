import { Toast } from 'vant';
import {GLOBAL_CONFIGS} from '../utils/global';
import Big from 'big.js'
const h5Copy = {
  methods: {
    h5Copy(content) {
      if (!document.queryCommandSupported('copy')) {
        // 不支持
        return false
      }

      let textarea = document.createElement("textarea")
      textarea.value = content
      textarea.readOnly = "readOnly"
      document.body.appendChild(textarea)
      textarea.select() // 选择对象
      textarea.setSelectionRange(0, content.length) //核心
      document.execCommand("copy") // 执行浏览器复制命令
      textarea.remove()
      Toast('Success!');

    }
  }
}

const vertify = {
  methods: {
    // 验证电话号码
    isPhoneNumber(phone) {
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return false;
      }
      return true
    },
    // 验证正整数
    isAllNumber(number) {
      if ((/^\d{1,}$/.test(number))) {
        return false;
      }
      return true

    },
    // 验证身份证
    isIdCards(ids) {
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if (idcardReg.test(ids)) {
        return false;
      }
      return true;
    },
    // 验证英文和数字组合
    isEnAndNumber(str) {
      var reg = /^[a-zA-Z0-9]+$/;
      if (reg.test(str)) {
        return false;
      }
      return true;
    },
    // 验证带小数点的数字
    isFloatNumber(str) {
      var reg = /^([1-9]\d*\.?\d*)|(0\.\d*[1-9])$/;
      if (reg.test(str)) {
        return false;
      }
      return true;
    },
		/**
		 * 乘法函数，用来得到精确的乘法结果
		 * @param {Object} arg1
		 * @param {Object} arg2
		 */
    accMul(arg1, arg2) {
      var m = 0;
      m += this.deal(arg1);
      m += this.deal(arg2);
      var r1 = Number(arg1.toString().replace(".", ""));
      var r2 = Number(arg2.toString().replace(".", ""));
      return (r1 * r2) / Math.pow(10, m)
    },
		/**
		 * 求小数点后的数据长度
		 */
    deal(arg) {
      var t = 0;
      try {
        t = (arg.toString().split(".")[1] || '').length
      } catch (e) {
        console.log(e)
      }
      return t;
    }
  }
}

// 初始化智能合约
import { ethers } from "ethers";
const initEth = {
  data() {
    return {
      provider: {},
      signer: null,
      chainId: 0,
      myAddress: ''
    }
  },
  async created() {
    if (typeof window.getPrivateKey === 'undefined') {
      if (typeof ethereum == "undefined") {
        // Toast(GLOBAL_CONFIGS.openPluginToast)
        await this.waitInject()
      } else {
        window.ethereum.enable();
        let customHttpProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        if (window.ethereum.isMetaMask) {
          window.ethereum
            .request({
              method: 'net_version'
            })
            .then((chainId) => {
              //可以把
              if (chainId != GLOBAL_CONFIGS.chainId)
              {
                Toast(GLOBAL_CONFIGS.toggleToast)
                //小狐狸自动切换主网
                try {
                    window.ethereum.
                    request({
                      method: 'wallet_addEthereumChain',
                      params: [{ chainId: GLOBAL_CONFIGS.chainIdHex ,
                      chainName: GLOBAL_CONFIGS.chainName,
                      nativeCurrency: {
                        name: GLOBAL_CONFIGS.nativeCurrency,
                        symbol: GLOBAL_CONFIGS.nativeCurrency, // 2-6 characters long
                        decimals: 18
                      },
                      rpcUrls: GLOBAL_CONFIGS.rpcUrl,
                      blockExplorerUrls:GLOBAL_CONFIGS.blockExplorerUrls
                      }],
                    }).then((chainId) => {
                      console.log(chainId)
                    }).catch((error) => {
                      // If the request fails, the Promise will reject with an error.
                      console.log(error)
                    });
                  } catch (addError) {
                    // handle "add" error
                    console.error(addError);
                  }


              }
              this.chainId = chainId;
            })
            .catch((error) => {
              // If the request fails, the Promise will reject with an error.
              console.log(error)
            });
        }
        window.ethereum.on('chainChanged', (chainId) => {
          // Handle the new chain.
          // Correctly handling chain changes can be complicated.
          // We recommend reloading the page unless you have a very good reason not to.
          if (chainId != GLOBAL_CONFIGS.chainIdHex) {
            Toast(GLOBAL_CONFIGS.useToast)
          }
          setTimeout(function () {
            window.location.reload()
          }, 2500)
        });

        this.provider = customHttpProvider;
        this.signer = customHttpProvider.getSigner();
      }
    }
    await this.getAddress()
  },
  methods: {
    // 等待android注入结果
    async waitInject () {
      clearInterval(this.waitInjectTimer)
      if (typeof window.getPrivateKey === 'undefined') {
        this.waitInjectTimer = setTimeout(() => {
          this.waitInject()
        }, 1000)
      }
    },
    async isQKI() {
      let network = await this.provider.getNetwork();
      let networkVersion = network.chainId;
      if (networkVersion != GLOBAL_CONFIGS.chainId) {
        Toast(GLOBAL_CONFIGS.toggleToast2);
        return false
      }
      return true;
    },
    // 获取地址
    async getAddress() {
      let [error, address] = await this.to(this.signer.getAddress());
      if (error == null) {
        this.myAddress = address;
      } else {
        console.log(error);
      }
    },
    to(fnPromise){
      return fnPromise.then(res => [null, res]).catch(error => [error]);
    },
  }
}


const timeUtils = {
  data(){
    return {
      day: '0',
      hour:'00',
      minutes: '00',
      seconds: '00'
    }
  },
  methods: {
    // 时间戳转时间
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
    },
    // 倒计时
    countDown(maxtime, fnCallback) {
      let distance = maxtime;
      if (maxtime >= 0) {
        // 距离结束剩下多少天
        let day = Math.floor(maxtime / 86400);
        let hour = Math.floor(maxtime / 3600);
        // 得到剩下的分钟数
        maxtime -= hour * 3600;
        let minutes = Math.floor(maxtime / 60);
        let seconds = Math.floor(maxtime % 60);
        --distance;
        this.day = day.toString();
        if (hour < 10) {
          hour = "0" + hour;
        }
        this.hour = hour.toString();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        this.minutes = minutes.toString();
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        this.seconds = seconds.toString();
        this.timer = setTimeout(() => {
          this.countDown(distance, fnCallback);
        }, 1000);
        return {
          status: 'ing',
          day,
          hour,
          minutes,
          seconds
        }
      } else {
        clearInterval(this.timer);
        fnCallback && fnCallback();
      }
    },
  }
}

Big.DP = 18
Big.NE = -19

window.Big = Big

const Decimal = {
  add(a, b) {
    try {
      return Big(a).add(Big(b))
    } catch {
      console.log('')
    }
  },
  sub(a, b) {
    try {
      return Big(a).sub(Big(b))
    } catch {
      console.log('')
    }
  },
  mul(a, b) {
    try {
      return Big(a).mul(Big(b))
    } catch {
      console.log('')
    }
  },
  div(a, b) {
    try {
      return Big(a).div(Big(b))
    } catch {
      console.log('')
    }
  },
}

export {
	h5Copy,
  vertify,
  initEth,
  timeUtils,
  Decimal
}