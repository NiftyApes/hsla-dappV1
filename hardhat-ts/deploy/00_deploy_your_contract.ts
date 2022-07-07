import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const compContractAddress = 0xbbeb7c67fa3cfb40069d19e598713239497a3ca5;

  const liquidityDeployResult = await deploy('NiftyApesLiquidity', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });
  const offersDeployResult = await deploy('NiftyApesOffers', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });
  const sigLendingDeployResult = await deploy('NiftyApesSigLending', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });
  const lendingDeployResult = await deploy('NiftyApesLending', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  const { address: liquidityAddress } = liquidityDeployResult;
  const { address: offersAddress } = offersDeployResult;
  const { address: sigLendingAddress } = sigLendingDeployResult;
  const { address: lendingAddress } = lendingDeployResult;

  const liquidityContract = await hre.ethers.getContractAt('NiftyApesLiquidity', liquidityAddress);
  await liquidityContract.initialize(compContractAddress);
  const offersContract = await hre.ethers.getContractAt('NiftyApesOffers', offersAddress);
  await offersContract.initialize(liquidityAddress);
  const sigLendingContract = await hre.ethers.getContractAt('NiftyApesSigLending', sigLendingAddress);
  await sigLendingContract.initialize(offersAddress);
  const lendingContract = await hre.ethers.getContractAt('NiftyApesLending', lendingAddress);
  await lendingContract.initialize(liquidityAddress, offersAddress, sigLendingAddress);

  const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
  const CETH_ADDRESS = '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5';
  const USDC_ADDRESS = '0xeb8f08a975Ab53E34D8a0330E0D34de942C95926';
  const CUSDC_ADDRESS = '0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1';
  const liquidityXLendingTx = await liquidityContract.updateLendingContractAddress(lendingAddress);
  await liquidityXLendingTx.wait();
  const offersXLendingTx = await offersContract.updateLendingContractAddress(lendingAddress);
  await offersXLendingTx.wait();
  const offersXSigLendingTx = await offersContract.updateSigLendingContractAddress(lendingAddress);
  await offersXSigLendingTx.wait();
  const sigLendingXLendingTx = await sigLendingContract.updateLendingContractAddress(lendingAddress);
  await sigLendingXLendingTx.wait();

  const ethSetAddressTx = await liquidityContract.setCAssetAddress(ETH_ADDRESS, CETH_ADDRESS);
  await ethSetAddressTx.wait();

  const ethGetAmountTx = await liquidityContract.assetAmountToCAssetAmount(ETH_ADDRESS, 500);
  await ethGetAmountTx.wait();

  const ethSetAmountTx = await liquidityContract.setMaxCAssetBalance(CETH_ADDRESS, ethGetAmountTx);
  await ethSetAmountTx.wait();

  const USDCSetAddressTx = await liquidityContract.setCAssetAddress(USDC_ADDRESS, CUSDC_ADDRESS);
  await USDCSetAddressTx.wait();

  const USDCGetAmountTx = await liquidityContract.assetAmountToCAssetAmount(USDC_ADDRESS, 500000);
  await USDCGetAmountTx.wait();

  const USDCSetAmountTx = await liquidityContract.setMaxCAssetBalance(CUSDC_ADDRESS, USDCGetAmountTx);
  await USDCSetAmountTx.wait();

  const liquidityPauseSanctionsTx = await liquidityContract.pauseSanctions();
  await liquidityPauseSanctionsTx.wait();

  const lendingPauseSanctionsTx = await lendingContract.pauseSanctions();
  await lendingPauseSanctionsTx.wait();

  await deploy('YourCollectible', {
    from: deployer,
    log: true,
  });
  /*
    // Getting a previously deployed contract
    const YourContract = await ethers.getContract("YourContract", deployer);
    await YourContract.setPurpose("Hello");
    
    //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */
};
export default func;
func.tags = ['NiftyApesLiquidity', 'NiftyApesOffers', 'NiftyApesSigLending', 'NiftyApesLending'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
