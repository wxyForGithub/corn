export function cacheResponseError (error) {
  console.log('==========', error)
  try {
    if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
      return 'ERROR:' + error.error.message
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      return 'INSUFFICIENT_FUNDS'
    } else if (error.code === 4001 || error === 'cancelled') {
      return 'cancelled'
    } else {
      if ((error.data.message || '').indexOf('gas') > 0) {
        return 'INSUFFICIENT_FUNDS'
      } else if ((error.data.message || '').indexOf('RPC') > 0) {
        return 'Node Error!'
      } else if ((error.data.message || '').indexOf('reverted') > 0) {
        return 'ERROR:' + error.data.message
      } else {
        return 'ERROR'
      }
    }
  } catch (e) {
    return 'ERROR'
  }
}
