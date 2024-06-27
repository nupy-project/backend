export interface IERC721 {
    supportsInterface(interfaceId: string): Promise<boolean>;
  
    balanceOf(owner: string): Promise<number>;
  
    ownerOf(tokenId: number): Promise<string>;
  
    name(): Promise<string>;
  
    symbol(): Promise<string>;
  
    tokenURI(tokenId: number): Promise<string>;
  
    approve(to: string, tokenId: number): Promise<void>;
  
    getApproved(tokenId: number): Promise<string>;
  
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
  
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
  
    transferFrom(from: string, to: string, tokenId: number): Promise<void>;
  
    safeTransferFrom(from: string, to: string, tokenId: number): Promise<void>;
  
    safeTransferFrom(
      from: string,
      to: string,
      tokenId: number,
      _data: string
    ): Promise<void>;
  }
  