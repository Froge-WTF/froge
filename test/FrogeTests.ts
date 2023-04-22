import { expect } from "chai";
import  hre, { ethers } from 'hardhat';
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";

const UniswapV2Router = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

describe("FROGE", () => {

  const setup = async () => {
    const [owner, marketingWallet, user1, user2, user3] = await ethers.getSigners();
    const Froge = await ethers.getContractFactory("FrogeToken", owner);
    const froge = await Froge.deploy(UniswapV2Router);
    await froge.deployed();
    return { froge, owner, marketingWallet, user1, user2, user3 };
  }
  const liquiditySetup = async () => {
    const [owner, marketingWallet, user1, user2, user3] = await ethers.getSigners();
    const Froge = await ethers.getContractFactory("FrogeToken", owner);
    const froge = await Froge.deploy(UniswapV2Router);
    await froge.deployed();

    const tokenAmount = (await froge.totalSupply()).mul(90).div(100); //83% of total supply
    const ethAmount = ethers.utils.parseEther("1");

    const router = await ethers.getContractAt("IUniswapV2Router02", UniswapV2Router);
    const pair = await froge.pair();
    const pairContract = await ethers.getContractAt("IUniswapV2Pair", pair);
    const WETH = await router.WETH();
    await froge.connect(owner).approve(router.address, tokenAmount);

    await router.connect(owner).addLiquidityETH(froge.address, tokenAmount, tokenAmount, ethAmount, owner.address, await time.latest() + 3600, { value: ethAmount })
    return { froge, owner, marketingWallet, user1, user2, user3, router, pairContract, WETH };
  }

  describe("Deployment", () => {

    describe("Metadata", ()=>{
      it("Should return the correct name", async()=>{
        const { froge } = await loadFixture(setup);
        expect(await froge.name()).to.equal("Froge");
      });
      it("Should return the correct symbol", async()=>{
        const { froge } = await loadFixture(setup);
        expect(await froge.symbol()).to.equal("FROGE");
      });
      it("Should return the correct decimals", async() =>{
        const { froge } = await loadFixture(setup);
        expect(await froge.decimals()).to.equal(18);
      });
    })

    describe("Initial values",  ()=>{
      it("Should return the correct owner", async ()=> {
        const { froge, owner } = await loadFixture(setup);
        expect(await froge.owner()).to.equal(owner.address);
      });
      it("Should return the correct total supply", async() => {
        const { froge, owner } = await loadFixture(setup);
        const maxSupply = ethers.utils.parseEther("8008580085")
        expect(await froge.totalSupply()).to.equal(maxSupply);
        expect(await froge.balanceOf(owner.address)).to.equal(maxSupply);
      });
      it("Should have created the initial pair", async () => {
        const { froge } = await loadFixture(setup);
        const pair = await ethers.getContractAt("IUniswapV2Pair", await froge.pair());
        const token0 = await pair.token0();
        const token1 = await pair.token1();
        if(token0 !== froge.address && token1 !== froge.address){
          throw new Error("Pair was not created correctly");
        }
      })
    });
    
  })

  describe("ERC20 functionalities", () => {


    describe("Allowance Tests", ()=>{
      it("Should approve allowance", async () => {
        const { froge, owner, user1 } = await loadFixture(setup);
        
        expect(await froge.allowance(owner.address, user1.address)).to.equal(0);
        
        const allowedAmount = ethers.utils.parseEther("100");
        await froge.connect(owner).approve(user1.address, allowedAmount);

        expect(await froge.allowance(owner.address, user1.address)).to.equal(allowedAmount);
        expect(await froge.allowance(user1.address, owner.address)).to.equal(0);
      });
      it("Should increase allowance",  async () => {
        const { froge, owner, user1 } = await loadFixture(setup);
        expect(await froge.allowance(owner.address, user1.address)).to.equal(0);
        
        const allowedAmount = ethers.utils.parseEther("100");
        
        await froge.connect(owner).increaseAllowance(user1.address, allowedAmount);
        
        expect(await froge.allowance(owner.address, user1.address)).to.equal(allowedAmount);
        expect(await froge.allowance(user1.address, owner.address)).to.equal(0);
      
      });
      it("Should decrease allowance",  async () => {
        const { froge, owner, user1 } = await loadFixture(setup);
        expect(await froge.allowance(owner.address, user1.address)).to.equal(0);
        const allowedAmount = ethers.utils.parseEther("100");
        await froge.connect(owner).increaseAllowance(user1.address, allowedAmount);
        const decreaseAmount = ethers.utils.parseEther("50");

        await froge.connect(owner).decreaseAllowance(user1.address, decreaseAmount);

        expect(await froge.allowance(owner.address, user1.address)).to.equal(allowedAmount.sub(decreaseAmount));
        expect(await froge.allowance(user1.address, owner.address)).to.equal(0);
      
      });
    })

    describe("Burn tests", () => {
      it("Should burn tokens", async() => {
        const {froge, owner} = await loadFixture(setup);

        const burnAmount = ethers.utils.parseEther("100");
        const totalSupply = await froge.totalSupply();

        await froge.connect(owner).burn(burnAmount);

        expect(await froge.totalSupply()).to.equal(totalSupply.sub(burnAmount));
        expect(await froge.balanceOf(owner.address)).to.equal(totalSupply.sub(burnAmount));
        
      });
      it("Should fail if not enough tokens",async ()=> {
        const {froge, owner} = await loadFixture(setup);
  
        const totalSupply = await froge.totalSupply();
        const burnAmount = totalSupply.add(1);
  
        await expect(froge.connect(owner).burn(burnAmount)).to.be.revertedWith("ERC20: burn amount exceeds balance");
      });

      
    })

    describe("Transfer Tests", ()=>{
      it("Should allow transfer", async () =>{
        const { froge, owner, user1, user2 } = await loadFixture(setup);
        const transferAmount = ethers.utils.parseEther("100");
        const transferAmount2 = (await froge.totalSupply()).div(10000); // minimum for divideds to be allocated
        const currentOwnerBalance = await froge.balanceOf(owner.address)
        console.log({
          transferAmount,
          transferAmount2,
          currentOwnerBalance,
          finalBalance: currentOwnerBalance.sub(transferAmount).sub(transferAmount2)
        })
        await froge.connect(owner).transfer(user1.address, transferAmount);
        await froge.connect(owner).transfer(user2.address, transferAmount2);
        expect(await froge.balanceOf(user1.address)).to.equal(transferAmount);
        expect(await froge.balanceOf(user2.address)).to.equal(transferAmount2);
      });
      it("Should allow transfer from", async () => {

        const {froge, owner, user1, user2,user3} = await loadFixture(setup);
        const transferAmount = ethers.utils.parseEther("100")
        const transferAmount2 = (await froge.totalSupply()).div(10000); // minimum for divideds to be allocated
        const transferAmount3 = transferAmount2.mul(4); // minimum for divideds to be allocated

        // Approve user1 to spend owner tokens
        await froge.connect(owner).approve(user1.address, transferAmount3);

        // Transfer from user1 to user2
        await froge.connect(user1).transferFrom(owner.address, user2.address, transferAmount3);

        expect(await froge.balanceOf(user1.address)).to.equal(0);
        expect(await froge.balanceOf(user2.address)).to.equal(transferAmount3);

        // Approve user1 to spend transferAmount3 tokens
        await froge.connect(user2).approve(user1.address, transferAmount2);
        await hre.network.provider.send("hardhat_mine", ["0xB"]);

        await froge.connect(user1).transferFrom(user2.address, user3.address, transferAmount2);
        expect(await froge.balanceOf(user2.address)).to.equal(transferAmount3.sub(transferAmount2));
        expect(await froge.balanceOf(user3.address)).to.equal(transferAmount2);
      });

      it("Should have a cooldown if not whitelisted", async () => {
        const { froge, owner, user1 } = await loadFixture(setup);
        
        const transferAmount = ethers.utils.parseEther("100")
        const transferAmount2 = transferAmount.div(2);
        // Owner is fine since he's whitelisted but user1 is not
        await froge.connect(owner).transfer(user1.address, transferAmount);
        await hre.network.provider.send("hardhat_mine", ["0xB"]);

        await froge.connect(user1).transfer(owner.address, transferAmount2);
        await expect(froge.connect(user1).transfer(owner.address, transferAmount2)).to.be.revertedWith("Cooldown");
        // advance 3 blocks and try again
        await hre.network.provider.send("hardhat_mine", ["0xB"]);
        await froge.connect(user1).transfer(owner.address, transferAmount2);
        expect(await froge.balanceOf(user1.address)).to.equal(0);
        expect(await froge.balanceOf(owner.address)).to.equal(await froge.totalSupply());
      });
      
    })
  })

  describe("Liquidity add/remove tests", () => {
    it("Should add liquidity", async () => {
      const { froge, owner } = await loadFixture(setup);
      const tokenAmount = (await froge.totalSupply()).mul(90).div(100); //83% of total supply
      const ethAmount = ethers.utils.parseEther("2");

      const router = await ethers.getContractAt("IUniswapV2Router02", UniswapV2Router);
      const pair = await froge.pair();
      const pairContract = await ethers.getContractAt("IUniswapV2Pair", pair);
      await froge.connect(owner).approve(router.address, tokenAmount);

      await router.connect(owner).addLiquidityETH(froge.address, tokenAmount, tokenAmount, ethAmount, owner.address, await time.latest() + 3600, { value: ethAmount })

      expect(await froge.balanceOf(pair)).to.equal(tokenAmount);
      const token0 = await pairContract.token0();
      const token1 = await pairContract.token1();
      
      const baseToken = await ethers.getContractAt("IERC20", token0 === froge.address ? token1 : token0);
      expect(await baseToken.balanceOf(pair)).to.equal(ethAmount);

      expect(await pairContract.totalSupply()).to.be.gt(ethers.utils.parseEther("1"));
    });
    
    it("Should remove liquidity", async () => {
      const { froge, owner } = await loadFixture(setup);
      const tokenAmount = (await froge.totalSupply()).mul(83).div(100); //83% of total supply
      const ethAmount = ethers.utils.parseEther("2");

      const router = await ethers.getContractAt("IUniswapV2Router02", UniswapV2Router);
      const pair = await froge.pair();
      const pairContract = await ethers.getContractAt("IUniswapV2Pair", pair);
      await froge.connect(owner).approve(router.address, tokenAmount);

      await router.connect(owner).addLiquidityETH(froge.address, tokenAmount, tokenAmount, ethAmount, owner.address, await time.latest() + 3600, { value: ethAmount })

      const ownerLiquidity = await pairContract.balanceOf(owner.address);
      
      await pairContract.connect(owner).approve(router.address, ownerLiquidity);
      // THIS SHOULD WORK SINCE OWNER IS FEE EXEMPT
      await router.connect(owner).removeLiquidityETH(froge.address, ownerLiquidity, 0, 0, owner.address, await time.latest() + 3600 )
      // await router.connect(owner).removeLiquidityETHSupportingFeeOnTransferTokens(froge.address, ownerLiquidity, 0, 0, owner.address, await time.latest() + 3600 )
      expect(await pairContract.balanceOf(owner.address)).to.equal(0);
      expect(await pairContract.totalSupply()).to.be.lt(ethers.utils.parseEther("1"));
    })

    it("Should allow consecutive buys", async() => {
      const { froge, user1, router, WETH } = await loadFixture(liquiditySetup);

      const amountToBUY = ethers.utils.parseEther("1");

      const amounts = await router.getAmountsOut(amountToBUY, [WETH, froge.address]);
      
      await router.connect(user1).swapExactETHForTokens(0,[WETH, froge.address], user1.address, await time.latest() + 3600, { value: amountToBUY })
      
      const amounts2 = await router.getAmountsOut(amountToBUY, [WETH, froge.address]);
      await router.connect(user1).swapExactETHForTokens(0,[WETH, froge.address], user1.address, await time.latest() + 3600, { value: amountToBUY })

      expect((await froge.balanceOf(user1.address)).sub(amounts[1].add(amounts2[1]))).to.be.lt(1000);
    });
    it("Should allow sells only after cooldown time", async () => {
      const { froge, user1, router, WETH } = await loadFixture(liquiditySetup);

      const amountToSell = ethers.utils.parseEther("1");
      await froge.transfer(user1.address, amountToSell.mul(3));
      await froge.connect(user1).approve(router.address, amountToSell.mul(3));
      // Fucking UNISWAP does not say the token said COOLDOWN
      await expect(router.connect(user1).swapExactTokensForETH(amountToSell, 0, [ froge.address, WETH], user1.address, await time.latest() + 3600)).to.be.revertedWith("TransferHelper: TRANSFER_FROM_FAILED")
      
      await hre.network.provider.send("hardhat_mine", ["0xB"]);
      await router.connect(user1).swapExactTokensForETH(amountToSell, 0, [ froge.address, WETH], user1.address, await time.latest() + 3600)
      // Fucking UNISWAP does not say the token said COOLDOWN
      await expect(router.connect(user1).swapExactTokensForETH(amountToSell, 0, [ froge.address, WETH], user1.address, await time.latest() + 3600)).to.be.revertedWith("TransferHelper: TRANSFER_FROM_FAILED")
      await hre.network.provider.send("hardhat_mine", ["0xB"]);
      await router.connect(user1).swapExactTokensForETH(amountToSell, 0, [ froge.address, WETH], user1.address, await time.latest() + 3600)
    });

  })
})