import { ethers } from "hardhat";

const UniswapV2Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const deadWallet = "0x000000000000000000000000000000000000dEaD"

async function main() {
  const [deployer] = await ethers.getSigners();
  const FrogeFactory = await ethers.getContractFactory("FrogeToken");
  console.log('DEPLOYING');
  const froge = await FrogeFactory.deploy(UniswapV2Router);
  await froge.deployed();
  console.log('DEPLOYED');

  console.log("Froge deployed to:", froge.address);

  const router = await ethers.getContractAt("IUniswapV2Router02", UniswapV2Router);
  const tokenAmount = (await froge.totalSupply()).mul(90).div(100); //90% of total supply
  const ethAmount = ethers.utils.parseEther("1");
  console.log('approving', tokenAmount.toString());

  await froge.connect(deployer).approve(router.address, tokenAmount);
  console.log('approved');
  console.log('adding liquidity');
  
  await router.connect(deployer).addLiquidityETH(froge.address, tokenAmount, tokenAmount, ethAmount, deadWallet, Math.floor(new Date().getTime()/1000)+1200, { value: ethAmount })
  console.log('liquidity added and burned');

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});