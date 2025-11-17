import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price?: number) {
  if (!price) return 'Prix sur demande';
  
  // M = 10 000 DZD
  if (price >= 10000) {
    const m = price / 10000;
    return `${m % 1 === 0 ? m.toString() : m.toFixed(1)} M`;
  } else {
    return `${new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price)} DA`;
  }
}
