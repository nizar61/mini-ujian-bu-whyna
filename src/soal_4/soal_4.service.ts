import { Injectable, BadRequestException } from '@nestjs/common';
import { HitungNilaiDto } from './dto/hitung-nilai.dto.js';

@Injectable()
export class NilaiService {
    hitungRapor(dto: HitungNilaiDto) {
        const {nama, tugas, uts, uas } = dto

        if (typeof nama !== 'string' || nama.trim() == ''){
            throw new BadRequestException('nama harus string, tidak boleh kosong')
        }

        if (!Array.isArray(tugas) || tugas.length === 0){
            throw new BadRequestException('tugas harus berupa array yang berisi minimal 1 angka')
        }

        for (const nilai of tugas) {
            if(typeof nilai !== 'number' || Number.isNaN(nilai) || nilai < 0 || nilai > 100 ){
                throw new BadRequestException('setiap nilai tugas harus berupa angka antara 1 sampai 100')
            }
        }

        if(typeof uts !== 'number' || Number.isNaN(uts) || uts < 0 || uts > 100 ){
                throw new BadRequestException('setiap nilai uts harus berupa angka antara 1 sampai 100')
            }

        if(typeof uas !== 'number' || Number.isNaN(uas) || uas < 0 || uas > 100 ){
                throw new BadRequestException('setiap nilai uas harus berupa angka antara 1 sampai 100')
            }

        const totalTugas = tugas.reduce((acc, curr) => acc + curr, 0)
        const rataTugas = totalTugas / tugas.length;

    const nilaiAkhirUnrounded = 0.3 * rataTugas + 0.3 * uts + 0.4 * uas;
    const nilaiAkhir = Math.round(nilaiAkhirUnrounded * 100) / 100;

    let predikat = 'D';
    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';

    const status = nilaiAkhir >= 75 ? 'Lulus' : 'Remedial';

    return {
      nama: nama.trim(),
      rataTugas: Math.round(rataTugas * 100) / 100,
      nilaiAkhir,
      predikat,
      status,
    };
    }
}