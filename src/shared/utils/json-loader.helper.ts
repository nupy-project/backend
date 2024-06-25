import * as contract from '../../contracts/abi/PropertyMarketplace.json';

export const loadJSON = (): any => {
  // console.log('=========',contract)
  console.log('ABI cargado:', contract.abi); // Imprimir el ABI para verificar

  return contract;
};
