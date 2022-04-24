# burn-token-web
燃烧

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 配置合约
该模板需配置：
- **contractAddress**: 当前合约地址
- **oldContractAddress**: 之前版本的合约地址
- **funcNameArgs**: 请求质押币种的合约方法名；token为获取address的方法名，minAmount为获取最小质押数量的方法名

### 配置.env
- VUE_APP_PLATFORM =                主网 HECO、QKI
- VUE_APP_title=                    页面title
- VUE_APP_contractAddress=          dapp合约
- VUE_APP_oldContractAddress=       如要升级，就填写老合约
- UE_APP_usdtContractAddress=       质押资产的合约地址
- VUE_APP_poolAddress=              流动池地址合约
- VUE_APP_burnAmount=               已经销毁的数量
- VUE_APP_tokenSymbol=              资产符号
- VUE_APP_burnTokenSymbol=          质押资产的符号
- VUE_APP_usdtDecimals=             质押资产的精度
- VUE_APP_maxDay=                   最大天数
