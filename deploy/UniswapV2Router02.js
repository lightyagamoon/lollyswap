const { WETH } = require("@sushiswap/sdk")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const chainId = await getChainId()

  let wethAddress = "0x86aa4e9127972a825167b79F0411F7B324957DdA";
  
  const factoryAddress = (await deployments.get("UniswapV2Factory")).address

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["UniswapV2Router02", "AMM"]
module.exports.dependencies = ["UniswapV2Factory", "Mocks"]