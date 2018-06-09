import { FiltersItemDto } from './filters-item.dto';

export enum SearchType {
    wantItem,
    haveItem
}

export interface FiltersDto {
    items: FiltersItemDto[];
    searchTypes: SearchType[];
}
