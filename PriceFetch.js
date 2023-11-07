const ethers = require('ethers');
const{
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
} = require("./Addresslist")

const {erc20ABI , factoryABI , pairABI , routerABI} = require("./Abiinfo")

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/")

const factoryInstance = new ethers.Contract(factoryAddress , factoryABI , provider)

//console.log(factoryInstance);

const routerInstance = new ethers.Contract(routerAddress , routerABI , provider)

const priceFetch = async(humanFormat)=>{
    const token1 = new ethers.Contract(
        fromAddress , erc20ABI , provider
    )
    const token2 = new ethers.Contract(
        toAddress , erc20ABI , provider
    )
    const decimal1 = await token1.decimals()
   // console.log(decimal1)
    const decimal2 = await token2.decimals()
    const amountIn = ethers.utils.parseUnits(humanFormat,decimal1).toString();
   // console.log(amountIn)
    const amountsOut = await routerInstance.getAmountsOut(amountIn,[
        fromAddress,
        toAddress
    ])
    const humanOutput = ethers.utils.formatUnits(
        amountsOut[1].toString(),
        decimal2
    )
    console.log(humanOutput)
}
humanFormat = "100"
priceFetch(humanFormat)