import { Offer } from '@/store/slices/Offers/types';

export interface CarouselSlideProps {
	offer: Offer;
	onDetailsClick?: () => void;
	isActive?: boolean;
}
