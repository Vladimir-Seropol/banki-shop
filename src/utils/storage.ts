import { CartStates } from '@/types/product';

const STORAGE_KEY = 'banki-shop-cart';

export function loadCartStates(): CartStates {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as Record<string, 'inCart'>;
    const result: CartStates = {};

    Object.keys(parsed).forEach((key) => {
      if (parsed[key] === 'inCart') {
        result[Number(key)] = 'inCart';
      }
    });

    return result;
  } catch {
    return {};
  }
}

export function saveCartStates(states: CartStates): void {
  const inCartOnly: Record<number, 'inCart'> = {};

  Object.keys(states).forEach((key) => {
    const id = Number(key);
    if (states[id] === 'inCart') {
      inCartOnly[id] = 'inCart';
    }
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(inCartOnly));
}

export function countInCart(states: CartStates): number {
  return Object.values(states).filter((state) => state === 'inCart').length;
}
