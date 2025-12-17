import { ElseOfferInterface } from '@/components/Common/types';

export interface ElseOffersItemProps {
	mirror?: boolean;
	data: ElseOfferInterface;
	onDetailsClick?: () => void;
}

