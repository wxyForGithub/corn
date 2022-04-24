import { ethers } from 'ethers'
import Big from 'big.js'
// import { Toast } from 'vant';
const MIN_GASPRICE = 3
class EthersUtils {
  provider;
  signer;
  address = '';
  gasPrice = MIN_GASPRICE
  constructor () {
    // TODO: 可以在构造函数中需要抛出错误
    if (typeof (window).ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider((window).ethereum)
      const signer = provider.getSigner()
      this.provider = provider
      this.signer = signer
      // 为了满足构造函数中可使用async/await
      const getAddr = (async () => {
        if(window.ethereum.isMetaMask) {
          await (window).ethereum.send('eth_requestAccounts')
        }
        const address = await this.getAddress()
        this.address = address
        let _gasPrice = await this.getGasPrice()
        console.log('gasprice', _gasPrice)
        // if (_gasPrice > MIN_GASPRICE)
        this.gasPrice = _gasPrice;//如果网络当前矿工费高于预设最小值，使用当前值
        delete this.then
        return this
      })()
      this.then = getAddr.then.bind(getAddr)
    }
  }

  // 事件监听"metamsk"
  // TODO: 这里的callback怎么定义
  // eventName: accountsChanged
  addEventListener (eventName, callback) {
    (window).ethereum.on(eventName, callback)
  }

  async getAddress () {
    return await this.signer.getAddress().then((res) => res).catch((error) => {
      console.log('catch=====', error)
    })
  }

  async getGasPrice () {
    return this.calcAmount(await this.signer.getGasPrice(), 9)
  }

  // 获取链id
  async getChainId () {
    const network = await this.provider.getNetwork()
    console.log(network, this.provider)
    return network.chainId
  }

  // 提供给人看的数字
  calcAmount (num, decimal) {
    return Big(num).div(Big(ethers.BigNumber.from(10).pow(decimal))).toFixed()
  }
}

export default EthersUtils
