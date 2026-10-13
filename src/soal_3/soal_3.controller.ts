import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './soal_3.service.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly deretService: DeretService) {}

  @Get(':jenis')
  generateDeret(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah: string,
    @Query('urutan') urutan?: string,
  ) {
    return this.deretService.generateDeret(jenis, jumlah, urutan);
  }
}