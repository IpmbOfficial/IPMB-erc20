const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")
const fixturesDeployment = require("../scripts/fixturesDeployment.js")

let signers
let contracts

describe("IPMBToken Tests", function () {
  before(async function () {
    ;({ signers, contracts } = await loadFixture(fixturesDeployment))
  })

  context("Verify Fixture", () => {
    it("Contracts are deployed", async function () {
      expect(await contracts.IPMB.getAddress()).to.not.equal(
        ethers.ZeroAddress,
      )
    })
  })

  context("Check Info", () => {
    // check name of erc20
    it("#name", async function () {
      const name = await contracts.IPMB.name()
      expect(name).to.equal("IPMBToken"); // if other fails
    })

    // check symbol of erc20
    it("#symbol", async function () {
      const symbol = await contracts.IPMB.symbol()
      expect(symbol).to.equal("IPMB"); // if other fails
    })
    
    // check decimals of erc20
    it("#decimals", async function () {
      const decimals = await contracts.IPMB.decimals()
      expect(parseInt(decimals)).to.equal(18); // if other fails
    })
  })

  context("Check Deployer balance", () => {
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.owner.address, // _address
      )
      expect(parseInt(balance)).to.equal(200000000000000000000000000); // if other fails
    })
  })

  context("Transfer 50 tokens", () => {
    // transfer 50 tokens to addr1
    it("#transfer", async function () {
      await contracts.IPMB.transfer(
        signers.addr1.address, // _address
        BigInt(50000000000000000000)
      )
    })

    // check the balance of addr1
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.addr1.address, // _address
      )
      expect(parseInt(balance)).to.equal(50000000000000000000); // if other fails
    })

    // check the balance of owner 
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.owner.address, // _address
      )
      expect(parseInt(balance)).to.equal(199999950000000000000000000); // if other fails
    })
  })

  context("Burn 100 tokens", () => {
    // burn 100 tokens
    it("#burn", async function () {
      await contracts.IPMB.burn(
        BigInt(100000000000000000000)
      )
    })

    // check the balance of owner after burn
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.owner.address, // _address
      )
      expect(parseInt(balance)).to.equal(199999850000000000000000000); // if other fails
    })
  })

  context("Approve spender", () => {
    // approve addr for 500 tokens
    it("#approve", async function () {
      await contracts.IPMB.approve(
        signers.addr2.address,
        BigInt(500000000000000000000)
      )
    })

    // check allowance
    it("#allowance", async function () {
      const allowance = await contracts.IPMB.allowance(
        signers.owner.address, // _address
        signers.addr2.address
      )
      expect(parseInt(allowance)).to.equal(500000000000000000000); // if other fails
    })
  })

  context("Increase & decrease allowance spender", () => {
    // increase allowance by 100 tokens
    it("#increaseAllowance", async function () {
      await contracts.IPMB.increaseAllowance(
        signers.addr2.address,
        BigInt(100000000000000000000)
      )
    })

    // check allowance
    it("#allowance", async function () {
      const allowance = await contracts.IPMB.allowance(
        signers.owner.address, // _address
        signers.addr2.address
      )
      expect(parseInt(allowance)).to.equal(600000000000000000000); // if other fails
    })

    // decrease allowance by 300 tokens
    it("#decreaseAllowance", async function () {
      await contracts.IPMB.decreaseAllowance(
        signers.addr2.address,
        BigInt(300000000000000000000)
      )
    })

    // check allowance
    it("#allowance", async function () {
      const allowance = await contracts.IPMB.allowance(
        signers.owner.address, // _address
        signers.addr2.address
      )
      expect(parseInt(allowance)).to.equal(300000000000000000000); // if other fails
    })
  })

  context("Transfer on behalf of owner", () => {
    // transfer 100 tokens from spender wallet (addr2) to addr3 on behalf of owner wallet
    it("#transferFrom", async function () {
      await contracts.IPMB.connect(signers.addr2).transferFrom(
        signers.owner.address,
        signers.addr3.address,
        BigInt(100000000000000000000)
      )
    })

    // check allowance
    it("#allowance", async function () {
      const allowance = await contracts.IPMB.allowance(
        signers.owner.address, // _address
        signers.addr2.address
      )
      expect(parseInt(allowance)).to.equal(200000000000000000000); // if other fails
    })

    // check balance of addr3
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.addr3.address, // _address
      )
      expect(parseInt(balance)).to.equal(100000000000000000000); // if other fails
    })
  })

  context("Burn on behalf of owner", () => {
    // burn 100 tokens from spender wallet (addr2) on behalf of owner wallet
    it("#burnFrom", async function () {
      await contracts.IPMB.connect(signers.addr2).burnFrom(
        signers.owner.address,
        BigInt(100000000000000000000)
      )
    })

    // check allowance
    it("#allowance", async function () {
      const allowance = await contracts.IPMB.allowance(
        signers.owner.address, // _address
        signers.addr2.address
      )
      expect(parseInt(allowance)).to.equal(100000000000000000000); // if other fails
    })

    // check balance of owner
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.owner.address, // _address
      )
      expect(parseInt(balance)).to.equal(199999650000000000000000000); // if other fails
    })
  })

  context("Batch transfer of 100 tokens", () => {
    // transfer 50 tokens to addr1 and addr3
    it("#batchTransfers", async function () {
      await contracts.IPMB.batchTransfers(
        [signers.addr1.address, signers.addr4.address], // _address
        [BigInt(100000000000000000000),BigInt(100000000000000000000)]
      )
    })

    // check the balance of addr1
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.addr1.address, // _address
      )
      expect(parseInt(balance)).to.equal(150000000000000000000); // if other fails
    })

    // check the balance of addr4
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.addr4.address, // _address
      )
      expect(parseInt(balance)).to.equal(100000000000000000000); // if other fails
    })

    // check the balance of owner 
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        signers.owner.address, // _address
      )
      expect(parseInt(balance)).to.equal(199999450000000000000000000); // if other fails
    })
  })

  context("Transfer Ownership", () => {
    // transfer contract ownership
    it("#transferOwnership", async function () {
      await contracts.IPMB.transferOwnership(
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", // _address
      )
    })

    // check new owner address
    it("#owner", async function () {
      const owner = await contracts.IPMB.owner(
      )
      expect(owner).to.equal("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"); // if other fails
    })

    // check the balance of new owner 
    it("#balanceOf", async function () {
      const balance = await contracts.IPMB.balanceOf(
        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", // _address
      )
      expect(parseInt(balance)).to.equal(0); // if other fails
    })
  })


})