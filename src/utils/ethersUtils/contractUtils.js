import { ethers } from 'ethers'
import { doAsync } from './helper/promise'
import { cacheResponseError } from './helper/error'
import { hex2int } from './helper/number'
import Big from 'big.js'
// import EthersUtils from './index'

class ContractUtils {
  contract;
  gasPrice = '3';
  address = '';
  decimal = 0;
  balanceOf = 0;
  provider;
  constructor (token, abi, signer, address, gasPrice, provider, hasDecimal = true) {
    this.address = address
    this.gasPrice = gasPrice
    this.provider = provider
    if (token === '') {
      this.contract = null
    } else {
      this.contract = new ethers.Contract(token, abi, signer)
    }
    if (hasDecimal) {
      if (token === '') {
        this.decimal = 18
        const getAddr = (async () => {
          await this.getBalance()
          delete this.then
          return this
        })()
        this.then = getAddr.then.bind(getAddr)
      } else {
        const getAddr = (async () => {
          const decimal = await this.method('decimals')
          this.decimal = decimal[1]
          const balanceOf = await this.methodWithDecimal('balanceOf', this.decimal, [this.address])
          this.balanceOf = balanceOf[1]
          delete this.then
          return this
        })()
        this.then = getAddr.then.bind(getAddr)
      }
    }
  }

  async setAddress (address) {
    this.address = address
  }

  async getBalance () {
    if (this.contract == null) {
      const balanceOf = await doAsync(this.provider.getBalance(this.address))
      if (balanceOf[0] == null) {
        const pow = Math.pow(10, this.decimal)
        const Value = Big(hex2int(balanceOf[1])).div(Big(pow)).toFixed()
        this.balanceOf = Value
      }
    } else {
      const balanceOf = await this.methodWithDecimal('balanceOf', this.decimal, [this.address])
      this.balanceOf = balanceOf[1]
    }
  }

  // 普通方法， 直接返回
  async method (methodName, params = [], msg) {
    let res
    if (msg) {
      if (methodName.indexOf('estimateGas') > -1) {
        methodName = methodName.split('.')[1]
        res = await doAsync(this.contract.estimateGas[methodName](...params, msg))
      } else {
        res = await doAsync(this.contract[methodName](...params, msg))
      }
    } else {
      res = await doAsync(this.contract[methodName](...params))
    }
    if (res[0] != null) {
      res[0] = cacheResponseError(res[0])
    }
    return res
  }

  // 转精度方法
  async methodWithDecimal (methodName, decimal, params = [], msg) {
    let res
    if (msg) {
      res = await this.method(methodName, params, msg)
    } else {
      res = await this.method(methodName, params)
    }
    if (res[0] == null) {
      const pow = Math.pow(10, decimal)
      const Value = Big(hex2int(res[1])).div(Big(pow)).toFixed()
      res[1] = Value
    }
    return res
  }

  // 预估并调用合约方法
  async estimateMethod (methodName, callback, params = [], msgValue = 0) {
    let msg = { gasPrice: ethers.utils.parseUnits(String(this.gasPrice), 'gwei') }
    if (msgValue !== 0) {
      msg = Object.assign({}, msg, { value: msgValue })
    }
    const estRes = await this.methodWithDecimal(`estimateGas.${methodName}`, 0, params, msg)
    if (estRes[0] != null) {
      return estRes
    }
    msg = Object.assign({}, msg, { gasLimit: Number(estRes[1]) })
    const res = await this.method(methodName, params, msg)
    if (res[0] == null && callback) {
      const wftRes = await this.queryTransation(res[1].hash)
      if (wftRes[0] != null) {
        return wftRes
      }
      return callback()
    } else {
      return res
    }
  }

  async queryTransation (hash) {
    return await doAsync(this.provider.waitForTransaction(hash))
  }

  // 授权合约
  async approveMethod (approveAddr, approveDecimal, dealAmount, callback) {
    const params = [this.address, approveAddr]
    const allowanceRes = await this.methodWithDecimal('allowance', approveDecimal, params)
    console.log('approveMethod====', allowanceRes)
    if (allowanceRes[0] == null) {
      if (Big(allowanceRes[1]).gt(Big(dealAmount))) {
        return callback()
      } else {
        const estRes = await this.estimateMethod('approve', () => {
          return callback()
        }, [approveAddr, '1000000000000000000000000000000000000000000000000000000000000000000000000000'])
        return estRes
      }
    } else {
      return allowanceRes
    }
  }
}

export default ContractUtils
