export interface IAccessControl {
    new(): void;
    admins(address: string): Promise<boolean>;
    addAdmin(account: string): Promise<void>;
    removeAdmin(account: string): Promise<void>;
  }
  