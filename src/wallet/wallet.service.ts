import { BadRequestException, Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { PrismaService } from 'src/prisma.service';
import { DepositWithdrawDto } from './dto/wallet.dto';

@Injectable()
export class WalletService {
  constructor(private prismaService: PrismaService) {}

  async create(userId: number, currencySym: string) {
    const wallet = await this.prismaService.wallet.create({
      data: {
        userId,
        currencySym,
      },
    });

    return wallet;
  }

  async deposit(param: DepositWithdrawDto) {
    const { userId, currencySym, amount } = param;
    let wallet = await this.prismaService.wallet.findUnique({
      where: {
        userId_currencySym: {
          userId,
          currencySym,
        },
      },
    });

    if (!wallet) {
      wallet = await this.create(userId, currencySym);
    }

    const updatedWallet = await this.prismaService.wallet.update({
      where: { userId_currencySym: { userId, currencySym } },
      data: { balance: Decimal(wallet.balance).add(Decimal(amount)) },
    });

    return updatedWallet;
  }

  async withdraw(param: DepositWithdrawDto) {
    const { userId, currencySym, amount } = param;
    let wallet = await this.prismaService.wallet.findUnique({
      where: {
        userId_currencySym: {
          userId,
          currencySym,
        },
      },
    });

    if (!wallet) {
      wallet = await this.create(userId, currencySym);
    }

    if (Decimal(wallet.balance).comparedTo(Decimal(amount)) < 0) {
      throw new BadRequestException('INVALID_AMOUNT');
    }

    const updatedWallet = await this.prismaService.wallet.update({
      where: { userId_currencySym: { userId, currencySym } },
      data: { balance: Decimal(wallet.balance).sub(Decimal(amount)) },
    });

    return updatedWallet;
  }

  async getWallet(userId: number) {
    const wallets = await this.prismaService.wallet.findMany({
      where: { userId: Number(userId) },
    });
    return wallets;
  }
}
