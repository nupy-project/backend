export interface IOwnable {
    owner(): Promise<string>;
  
    renounceOwnership(): Promise<void>;
  
    transferOwnership(newOwner: string): Promise<void>;
  }
  