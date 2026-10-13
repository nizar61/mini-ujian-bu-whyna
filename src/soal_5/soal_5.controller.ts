import { Controller, Post, Param, Query, Body } from '@nestjs/common';
import { KasirService } from './soal_5.service.js';
import { CheckoutDto } from './dto/checkout.dto.js';

@Controller('kasir')
export class KasirController {
  constructor(private readonly kasirService: KasirService) {}

  @Post('checkout/:member')
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string,
    @Body() dto: CheckoutDto,
  ) {
    return this.kasirService.checkout(member, metode, dto);
  }
}