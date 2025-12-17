import { ElseOfferInterface } from '@/components/Common/types';

export interface ElseOfferInfoProps {
	mirror?: boolean;
	data: ElseOfferInterface;
	onDetailsClick?: () => void;
}

