const hre = require("hardhat");

async function main() {
  const Drive = await hre.ethers.getContractFactory("Drive");
  const drive = await Drive.deploy();

  await drive.waitForDeployment();

  const address = await drive.getAddress();
  console.log("Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
