import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price?: number) {
  if (!price) return 'Prix sur demande';
  
  // Md = 10 000 000 DZD (Milliards)
  if (price >= 10000000) {
    const md = price / 10000000;
    return `${md % 1 === 0 ? md.toString() : md.toFixed(1)} Md`;
  }
  // M = 10 000 DZD (Millions)
  else if (price >= 10000) {
    const m = price / 10000;
    return `${m % 1 === 0 ? m.toString() : m.toFixed(1)} M`;
  } else {
    return `${new Intl.NumberFormat('fr-TN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price)} DA`;
  }
}
