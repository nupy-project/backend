// import * as contractAccessControl from '../../features/contracts/abi/AccessControl.json';

import * as contractPaymentProcessor from '../../features/contracts/abi/PaymentProcessor.json';

export const loadJSON = (): any => {
  const contracts = {

    paymentProcessor: contractPaymentProcessor,
  };

  const printAbiNames = (contract:any) => {
    contract.abi.forEach((item: { name: any; }) => {
      if (item.name) {
        // console.log(`Nombre: ${item.name}`);
      }
    });
  };


  console.log('ABI paymentProcessor:');
  printAbiNames(contracts.paymentProcessor);


  return contracts;
};
