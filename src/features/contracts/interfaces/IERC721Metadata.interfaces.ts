export interface IIERC721Metadata {
    approve(to: string, tokenId: number): Promise<void>;
  
    balanceOf(owner: string): Promise<number>;
  
    getApproved(tokenId: number): Promise<string>;
  
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
  
    ownerOf(tokenId: number): Promise<string>;
  
    safeTransferFrom(from: string, to: string, tokenId: number): Promise<void>;
  
    safeTransferFrom(
      from: string,
      to: string,
      tokenId: number,
      data: string
    ): Promise<void>;
  
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
  
    supportsInterface(interfaceId: string): Promise<boolean>;
  
    transferFrom(from: string, to: string, tokenId: number): Promise<void>;
  
    name(): Promise<string>;
  
    symbol(): Promise<string>;
  
    tokenURI(tokenId: number): Promise<string>;
  }
  