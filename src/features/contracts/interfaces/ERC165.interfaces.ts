export interface IERC165 {
    supportsInterface(interfaceId: string): Promise<boolean>;
  }
  