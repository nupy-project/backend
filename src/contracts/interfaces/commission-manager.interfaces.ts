export interface ICommissionManager {
    new(
      _platformCommission: number,
      _promoterCommission: number,
      _platformAddress: string,
      _promoterAddress: string
    ): void;
    admin(): Promise<string>;
    platformAddress(): Promise<string>;
    platformCommission(): Promise<number>;
    promoterAddress(): Promise<string>;
    promoterCommission(): Promise<number>;
    setPlatformCommission(newCommission: number): Promise<void>;
    setPromoterCommission(newCommission: number): Promise<void>;
    setPlatformAddress(newAddress: string): Promise<void>;
    setPromoterAddress(newAddress: string): Promise<void>;
    getPlatformCommission(): Promise<number>;
    getPromoterCommission(): Promise<number>;
  }
  