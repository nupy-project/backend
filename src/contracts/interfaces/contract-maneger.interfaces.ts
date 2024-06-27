export interface IContractManager {
    new(
      propertyMarketplaceAddress: string,
      tokenFactoryAddress: string,
      transactionHandlerAddress: string,
      platformCommission: number,
      promoterCommission: number,
      platformAddress: string,
      promoterAddress: string
    ): void;
    accessControl(): Promise<string>;
    commissionManager(): Promise<string>;
    marketplace(): Promise<string>;
    tokenFactory(): Promise<string>;
    transactionHandler(): Promise<string>;
  }
  