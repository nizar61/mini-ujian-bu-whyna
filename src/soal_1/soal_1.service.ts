import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class BilanganService {
  cekBilangan(angkaRaw: string) {
    
    if (!angkaRaw || angkaRaw.trim() === '') {
      throw new BadRequestException('Parameter angka tidak boleh kosong');
    }

    const angka = Number(angkaRaw);

    if (Number.isNaN(angka) || !Number.isInteger(angka)) {
      throw new BadRequestException('Angka harus berupa bilangan bulat');
    }

    if (angka < 1 || angka > 100) {
      throw new BadRequestException('Angka harus berada di antara 1 sampai 100');
    }

    
    const jenis = angka % 2 === 0 ? 'genap' : 'ganjil';
    const kuadrat = angka * angka;
    const kelipatanLima = angka % 5 === 0;

    return {
      angka,
      jenis,
      kuadrat,
      kelipatanLima,
    };
  }
}