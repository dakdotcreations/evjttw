import { formatCurrency } from './currency';

export interface PriceableItem {
	fixedPrice: number | null;
	pricePerPerson: number | null;
	currency: string;
}

export function formatPrice(item: PriceableItem): string {
	const { fixedPrice, pricePerPerson, currency } = item;
	if (fixedPrice != null) {
		return formatCurrency(fixedPrice, currency);
	}
	if (pricePerPerson != null) {
		return `From ${formatCurrency(pricePerPerson, currency)} / person`;
	}
	return 'Price on request';
}
