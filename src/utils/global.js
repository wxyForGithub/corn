const QKI_CONFIG = {
  chainId: '20181205',
  chainIdHex: '0x133f0d5',
  chainName:"qki",
  nativeCurrency:"QKI",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用QKI主网,请切换到QKI主网',
  useToast: '请使用qki主网',
  toggleToast2: '你当前没有使用QKI主网，请切换主网为QKI',
  rpcUrl:['https://sg.node.quarkblockchain.org'],
  blockExplorerUrls:['https://qkiscan.io/']
}

const HECO_CONFIG = {
  chainId: '128',
  chainIdHex: '0x80',
  chainName:"heco",
  nativeCurrency:"HT",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io/',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用HECO主网,请切换到HECO主网',
  useToast: '请使用HECO主网',
  toggleToast2: '你当前没有使用HECO主网，请切换主网为HECO',
  rpcUrl:['https://http-mainnet.hecochain.com'],
  blockExplorerUrls:['https://hecoinfo.com/']
}

const BSC_CONFIG = {
  chainId: '56',
  chainIdHex: '0x38',
  chainName:"bsc",
  nativeCurrency:"bnb",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io/',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用BSC主网,请切换到BSC主网',
  useToast: '请使用BSC主网',
  toggleToast2: '你当前没有使用BSC主网，请切换主网为BSC',
  rpcUrl:['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls:['https://bscscan.com']
}


const BSCTEST_CONFIG = {
  chainId: '97',
  chainIdHex: '0x61',
  chainName:"bsc",
  nativeCurrency:"bnb",
  tipsDesc: '推荐使用 qkswap 交易，避免被骗。点击进入',
  tipsUrl: 'https://app.qkswap.io/',
  openPluginToast : '请安装metamask插件、或者使用qkpay打开',
  toggleToast : '请使用BSC主网,请切换到BSC主网',
  useToast: '请使用BSC主网',
  toggleToast2: '你当前没有使用BSC主网，请切换主网为BSC',
  rpcUrl:['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls:['https://bscscan.com']
}

let app_cofing = QKI_CONFIG

if(process.env.VUE_APP_PLATFORM ==  "QKI")
{
  app_cofing = QKI_CONFIG
}
else if(process.env.VUE_APP_PLATFORM ==  "HECO")
{
  app_cofing = HECO_CONFIG
}
else
{
  app_cofing = BSC_CONFIG
}
const GLOBAL_CONFIGS = app_cofing
export {
  GLOBAL_CONFIGS,
  QKI_CONFIG,
  HECO_CONFIG,
  BSCTEST_CONFIG,
  BSC_CONFIG
};
