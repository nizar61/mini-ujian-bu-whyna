import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SuhuService {
  konversi(nilaiRaw: string, dariRaw: string, keRaw: string) {

    if (!nilaiRaw || !dariRaw || !keRaw) {
      throw new BadRequestException('Query nilai, dari, dan ke wajib diisi');
    }

    const nilai = Number(nilaiRaw);
    if (Number.isNaN(nilai)) {
      throw new BadRequestException('Nilai harus berupa angka');
    }

    const dari = dariRaw.toLowerCase().trim();
    const ke = keRaw.toLowerCase().trim();
    const satuanDiizinkan = ['celsius', 'fahrenheit', 'kelvin'];

    if (!satuanDiizinkan.includes(dari) || !satuanDiizinkan.includes(ke)) {
      throw new BadRequestException(
        'Satuan dari/ke hanya boleh: celsius, fahrenheit, atau kelvin',
      );
    }

    if (dari === ke) {
      throw new BadRequestException('Satuan dari dan ke tidak boleh sama');
    }

    if (dari === 'kelvin' && nilai < 0) {
      throw new BadRequestException('Suhu dalam Kelvin tidak boleh kurang dari 0');
    }

    let celsius: number;
    if (dari === 'celsius') {
      celsius = nilai;
    } else if (dari === 'fahrenheit') {
      celsius = ((nilai - 32) * 5) / 9;
    } else {
      // kelvin
      celsius = nilai - 273.15;
    }

    let hasil: number;
    if (ke === 'celsius') {
      hasil = celsius;
    } else if (ke === 'fahrenheit') {
      hasil = (celsius * 9) / 5 + 32;
    } else {
      // kelvin
      hasil = celsius + 273.15;
    }

    const hasilBulat = Math.round(hasil * 100) / 100;

    return {
      nilaiAsal: nilai,
      satuanAsal: dari,
      hasil: hasilBulat,
      satuanHasil: ke,
    };
  }
}