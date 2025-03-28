import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, WalletService],
})
export class OrderModule {}
