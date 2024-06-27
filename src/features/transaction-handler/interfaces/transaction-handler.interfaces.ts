import { BigNumber } from "ethers";

/* eslint-disable @typescript-eslint/no-misused-new */
export interface ITransactionHandler {
    // Constructor
    new(_commissionManager: string): ITransactionHandler;
  
    // Functions
    commissionManager(): Promise<string>;
  
    handleTransaction(amount: BigNumber): Promise<void>;
  }
  