import { Injectable, BadRequestException } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto.js';

@Injectable()
export class KasirService {
  checkout(memberRaw: string, metodeRaw: string, dto: CheckoutDto) {
    // 1. Validasi member
    const member = memberRaw?.toLowerCase().trim();
    const diskonMemberMap: Record<string, number> = {
      reguler: 0,
      silver: 5,
      gold: 10,
    };

    if (!(member in diskonMemberMap)) {
      throw new BadRequestException('Member hanya boleh reguler, silver, atau gold');
    }

    if (!metodeRaw) {
      throw new BadRequestException('Metode pembayaran wajib diisi');
    }
    const metode = metodeRaw.toLowerCase().trim();
    if (!['tunai', 'qris'].includes(metode)) {
      throw new BadRequestException('Metode pembayaran hanya boleh tunai atau qris');
    }

    const { items } = dto;
    if (!Array.isArray(items) || items.length === 0) {
      throw new BadRequestException('Items harus berupa array dan tidak boleh kosong');
    }
    if (items.length > 10) {
      throw new BadRequestException('Items tidak boleh lebih dari 10 item');
    }

    const rincian = [];
    let totalItem = 0;
    let subtotal = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const ke = i + 1;

      if (!item || typeof item !== 'object') {
        throw new BadRequestException(`Item ke-${ke}: data item tidak valid`);
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(`Item ke-${ke}: nama harus berupa string tidak kosong`);
      }

      if (typeof item.harga !== 'number' || Number.isNaN(item.harga) || item.harga <= 0) {
        throw new BadRequestException(`Item ke-${ke}: harga harus angka lebih dari 0`);
      }

      if (
        typeof item.qty !== 'number' ||
        Number.isNaN(item.qty) ||
        !Number.isInteger(item.qty) ||
        item.qty <= 0
      ) {
        throw new BadRequestException(`Item ke-${ke}: qty harus bilangan bulat lebih dari 0`);
      }

      const itemSubtotal = item.harga * item.qty;
      subtotal += itemSubtotal;
      totalItem += item.qty;

      rincian.push({
        nama: item.nama.trim(),
        harga: item.harga,
        qty: item.qty,
        subtotal: itemSubtotal,
      });
    }

    const persenDiskon = diskonMemberMap[member];
    const diskon = (subtotal * persenDiskon) / 100;
    
    const setelahDiskon = subtotal - diskon;
    const biayaAdmin = metode === 'qris' ? (setelahDiskon * 1) / 100 : 0;
    const total = setelahDiskon + biayaAdmin;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal,
      diskon,
      biayaAdmin,
      total,
    };
  }
}