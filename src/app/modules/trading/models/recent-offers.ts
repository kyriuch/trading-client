import { OfferInDto } from './offer-in.dto';

export interface RecentOffers {
    offers: OfferInDto[];
    totalCount: number;
}
