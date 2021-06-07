const { WETH } = require("@sushiswap/sdk")

module.exports = async function ({ ethers: { getNamedSigner }, getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  const chainId = await getChainId()

  const factory = await ethers.getContract("UniswapV2Factory")
  const bar = await ethers.getContract("SushiBar")
  const sushi = await ethers.getContract("SushiToken")
  
  let wethAddress = "0x86aa4e9127972a825167b79F0411F7B324957DdA";

  await deploy("SushiMaker", {
    from: deployer,
    args: [factory.address, bar.address, sushi.address, wethAddress],
    log: true,
    deterministicDeployment: false
  })

  const maker = await ethers.getContract("SushiMaker")
  if (await maker.owner() !== dev) {
    console.log("Setting maker owner")
    await (await maker.transferOwnership(dev, true, false)).wait()
  }
}

module.exports.tags = ["SushiMaker"]
module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "SushiBar", "SushiToken"]