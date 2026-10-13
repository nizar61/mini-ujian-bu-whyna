import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NilaiService } from './soal_4.service.js';
import { HitungNilaiDto } from './dto/hitung-nilai.dto.js';

@Controller('nilai')
export class NilaiController {
  constructor(private readonly nilaiService: NilaiService) {}

  @Post('hitung')
  @HttpCode(200)
  hitungRapor(@Body() dto: HitungNilaiDto) {
    return this.nilaiService.hitungRapor(dto);
  }
}