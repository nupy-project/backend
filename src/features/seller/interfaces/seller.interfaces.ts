export interface ISeller {
    id?: string;
    name: string;
    email: string;
    phone: string;
    walletAddress: string;
    listedProperties: string[]; // Array of property IDs
    salesHistory: string[]; // Array of sale IDs
    totalPropertiesListed: number;
    totalPropertiesSold: number;
    totalEarnings: number;
  }
  