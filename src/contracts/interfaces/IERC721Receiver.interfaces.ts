export interface IIERC721Receiver {
    onERC721Received(
      operator: string,
      from: string,
      tokenId: number,
      data: string
    ): Promise<string>;
  }
  