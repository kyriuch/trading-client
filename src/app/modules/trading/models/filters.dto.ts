import { PaintDto } from './paint.dto';

export enum SearchType {
    wantItem,
    haveItem
}

export interface FiltersDto {
    items: {
        id: number,
        itemName: string
    }[];
    certificates: {
        id: number,
        certificateName: string
    }[];
    paints: PaintDto[];
    searchType: SearchType[];
}
