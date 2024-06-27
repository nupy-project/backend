import { BigNumber, EventFilter } from "ethers";

export interface IPropertyToken {
  // Events
  Approval(owner?: string | null, approved?: string | null, tokenId?: BigNumber | null): EventFilter;
  ApprovalForAll(owner?: string | null, operator?: string | null, approved?: boolean | null): EventFilter;
  OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): EventFilter;
  TokenMinted(to?: string | null, tokenId?: BigNumber | null): EventFilter;
  Transfer(from?: string | null, to?: string | null, tokenId?: BigNumber | null): EventFilter;

  // Functions
  approve(to: string, tokenId: BigNumber): Promise<void>;

  balanceOf(owner: string): Promise<BigNumber>;

  getApproved(tokenId: BigNumber): Promise<string>;

  isApprovedForAll(owner: string, operator: string): Promise<boolean>;

  name(): Promise<string>;

  nextTokenId(): Promise<BigNumber>;

  owner(): Promise<string>;

  ownerOf(tokenId: BigNumber): Promise<string>;

  renounceOwnership(): Promise<void>;

  safeTransferFrom(from: string, to: string, tokenId: BigNumber): Promise<void>;

  safeTransferFrom(from: string, to: string, tokenId: BigNumber, data: string): Promise<void>;

  setApprovalForAll(operator: string, approved: boolean): Promise<void>;

  supportsInterface(interfaceId: string): Promise<boolean>;

  symbol(): Promise<string>;

  tokenURI(tokenId: BigNumber): Promise<string>;

  transferFrom(from: string, to: string, tokenId: BigNumber): Promise<void>;

  transferOwnership(newOwner: string): Promise<void>;

  mint(to: string): Promise<void>;
}
