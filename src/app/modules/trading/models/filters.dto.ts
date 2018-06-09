import { PaintDto } from './paint.dto';
import { FiltersItemDto } from './filters-item.dto';
import { CertificateDto } from './certificate.dto';

export enum SearchType {
    wantItem,
    haveItem
}

export interface FiltersDto {
    items: FiltersItemDto[];
    certificates: CertificateDto[];
    paints: PaintDto[];
    searchTypes: SearchType[];
}
