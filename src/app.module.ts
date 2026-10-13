import { Module } from '@nestjs/common';
import { BilanganController } from './soal_1/soal_1.controller.js';
import { BilanganService } from './soal_1/soal_1.service.js';
import { SuhuController } from './soal_2/soal_2.controller.js';
import { SuhuService } from './soal_2/soal_2.service.js';
import { DeretController } from './soal_3/soal_3.controller.js';
import { DeretService } from './soal_3/soal_3.service.js';
import { NilaiController } from './soal_4/saol_4.controller.js';
import { NilaiService } from './soal_4/soal_4.service.js';
import { KasirController } from './soal_5/soal_5.controller.js';
import { KasirService } from './soal_5/soal_5.service.js';

@Module({
  imports: [],
  controllers: [
    BilanganController,
    SuhuController,
    DeretController,
    NilaiController,
    KasirController,
  ],
  providers: [
    BilanganService,
    SuhuService,
    DeretService,
    NilaiService,
    KasirService,
  ],
})
export class AppModule {}
