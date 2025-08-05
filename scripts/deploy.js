const hre = require("hardhat");

async function main() {
  const Drive = await hre.ethers.getContractFactory("Drive");
  const drive = await Drive.deploy();

  await drive.waitForDeployment();

  console.log("Contract deployed to:", drive.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
