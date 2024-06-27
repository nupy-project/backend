import * as contractAccessControl from '../../features/contracts/abi/AccessControl.json';
import * as contractBuildingToken from '../../features/contracts/abi/BuildingToken.json';
import * as contractCommissionManager from '../../features/contracts/abi/CommissionManager.json';
import * as contractContractManager from '../../features/contracts/abi/ContractManager.json';
import * as contractMarketplace from '../../features/contracts/abi/Marketplace.json';
import * as contractPropertyMarketplace from '../../features/contracts/abi/PropertyMarketplace.json';
import * as contractTokenFactory from '../../features/contracts/abi/TokenFactory.json';
import * as contractTransactionHandler from '../../features/contracts/abi/TransactionHandler.json';

export const loadJSON = (): any => {
  const contracts = {
    AccessControl: contractAccessControl, // 0xCF458Ef2723Cb10e2983743b4ff1BD32d805fc9F
    BuildingToken: contractBuildingToken, //0xE0AD37BAAFA703D81010E7325D5E560941D4f05F
    CommissionManager: contractCommissionManager, //0x796F200C13353ED8B752D013215AaD37AB41aDF2
    ContractManager: contractContractManager, //0x0DE5e830d09bD55088512F057f858c2cFE192968
    Marketplace: contractMarketplace, //0xdC7044C2fF69a9d587f90A759eE47787Ebdd590a
    PropertyMarketplace: contractPropertyMarketplace, //0x565822dE72504E4d215cFA68E680570c85c3f9A2
    TokenFactory: contractTokenFactory, //0xfF8E4d08f3bf5265849d4648275cc4A8981C9007
    TransactionHandler: contractTransactionHandler, //0x76Df94ce9C33314314d737640CFdeaf617D63935
  };

  const printAbiNames = (contract) => {
    contract.abi.forEach(item => {
      if (item.name) {
        console.log(`Nombre: ${item.name}`);
      }
    });
  };

  // console.log('ABI AccessControl:');
  // printAbiNames(contracts.AccessControl);

  // console.log('ABI BuildingToken:');
  // printAbiNames(contracts.BuildingToken);

  // console.log('ABI CommissionManager:');
  // printAbiNames(contracts.CommissionManager);

  // // console.log('ABI ContractManager:');
  // // printAbiNames(contracts.ContractManager);

  // console.log('ABI Marketplace:');
  // printAbiNames(contracts.Marketplace);

  // console.log('ABI PropertyMarketplace:');
  // printAbiNames(contracts.PropertyMarketplace);

  // console.log('ABI TokenFactory:');
  // printAbiNames(contracts.TokenFactory);

  console.log('ABI TransactionHandler:');
  printAbiNames(contracts.TransactionHandler);

  return contracts;
};
