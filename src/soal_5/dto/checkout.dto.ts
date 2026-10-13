export class ItemKasirDto {
  nama: string;
  harga: number;
  qty: number;
}

export class CheckoutDto {
  items: ItemKasirDto[];
}