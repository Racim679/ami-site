import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price?: number) {
  if (!price) return 'Prix sur demande';
  
  if (price >= 10000000) {
    const md = price / 10000000;
    return `${md % 1 === 0 ? md.toString() : md.toFixed(1)} Md`;
  } else if (price >= 1000000) {
    const m = price / 1000000;
    return `${m % 1 === 0 ? m.toString() : m.toFixed(1)} M`;
  } else if (price >= 10000) {
    const mil = price / 10000;
    return `${mil % 1 === 0 ? mil.toString() : mil.toFixed(1)} m`;
  } else {
    return `${new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price)} DA`;
  }
}
