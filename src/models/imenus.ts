export interface IMenus {
    id: number;
    nama: string;
    route: string;
    parent_id: number | null;
    urut: number;
    isactive: boolean;
    icon?: string|null;
    iconname?: string |null;
}