import Big from 'big.js'
import { ethers } from 'ethers'
// 十六进制转10进制
export function hex2int (hex) {
  hex = ethers.utils.hexValue(hex)
  if (hex.indexOf('0x') >= 0) {
    hex = hex.substring(2)
  }
  const len = hex.length
  let total = Big(0)
  let code
  for (let i = 0; i < len; i++) {
    code = hex.charCodeAt(i)
    if (code >= 48 && code < 58) {
      code -= 48
    } else {
      code = (code & 0xdf) - 65 + 10
    }
    total = total.mul(Big(16)).add(Big(code))
  }
  return total.toFixed()
}
// 展示几位小数
export function calcShowAmount (num, len) {
  const pow = Math.pow(10, len)
  const numStr = Big(num).mul(pow).toFixed().split('.')[0]
  return Big(numStr).div(pow).toFixed()
}

// 提供给合约使用的最小位数
export function amount2Wei (num, decimal) {
  const pow = Math.pow(10, decimal)
  return Big(num).mul(pow).toFixed().split('.')[0]
}

// 提供给合约使用的最小位数
export function wei2Amount (num, decimal) {
  const pow = Math.pow(10, decimal)
  return Big(num).div(pow).toFixed()
  // const pow = Math.pow(10, decimal)
  // return Big(num).mul(pow).toFixed().split('.')[0]
}

// 提供给人看的数字
export function calcAmount (num, decimal) {
  const pow = Math.pow(10, decimal)
  return Big(num).div(pow).toFixed()
}
