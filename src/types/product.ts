export type BuyState = 'idle' | 'processing' | 'inCart';

export interface Product {
  id: number;
  images: string[];
  title: string;
  description: string;
  oldPrice: string | null;
  newPrice: string;
  isSold: boolean;
}

export type CartStates = Record<number, BuyState>;
