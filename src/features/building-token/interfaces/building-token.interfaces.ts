export interface IBuildingToken {
    new(): void;
    admin(): Promise<string>;
    approve(to: string, tokenId: number): Promise<void>;
    balanceOf(owner: string): Promise<number>;
    getApproved(tokenId: number): Promise<string>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
    name(): Promise<string>;
    nextTokenId(): Promise<number>;
    ownerOf(tokenId: number): Promise<string>;
    safeTransferFrom(from: string, to: string, tokenId: number): Promise<void>;
    safeTransferFrom(from: string, to: string, tokenId: number, data: string): Promise<void>;
    setApprovalForAll(operator: string, approved: boolean): Promise<void>;
    supportsInterface(interfaceId: string): Promise<boolean>;
    symbol(): Promise<string>;
    tokenURI(tokenId: number): Promise<string>;
    transferFrom(from: string, to: string, tokenId: number): Promise<void>;
    mint(to: string): Promise<void>;
  }
  