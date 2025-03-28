import { BadRequestException, Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { PrismaService } from 'src/prisma.service';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService, 
        private walletService: WalletService) {}

    async placeOrder(userId: number, param: any) {
        const { orderType, price, amount, currencySrcSym, currencyDestSym } = param
        
        let walletSrc = await this.prismaService.wallet.findUnique({
            where: {
                userId_currencySym: {
                    userId, 
                    currencySym: currencySrcSym
                }
            }
        })
        let walletDest = await this.prismaService.wallet.findUnique({
            where: {
                userId_currencySym: {
                    userId, 
                    currencySym: currencyDestSym
                }
            }
        })

        if(!walletSrc){
            walletSrc = await this.walletService.create(userId, currencySrcSym)
        }

        if(!walletDest){
            walletDest = await this.walletService.create(userId, currencyDestSym)
        }

        if(orderType === 'buy'){
            const total = Decimal(price).mul(Decimal(amount))
            if(walletSrc.balance.comparedTo(total) < 0){
                throw new BadRequestException('INSUFFICIENT_WALLET, PLEASE_DEPOSIT_FIRST')
            }
            const order = await this.prismaService.order.create({
                data: {
                    userId,
                    orderType,
                    price,
                    amount,
                    currencySrcSym,
                    currencyDestSym
                }
            })
            return order
        }else if(orderType === 'sell'){
            if(walletSrc.balance.comparedTo(Decimal(amount)) < 0){
                throw new BadRequestException('INSUFFICIENT_WALLET, PLEASE_DEPOSIT_FIRST')
            }
            const order = await this.prismaService.order.create({
                data: {
                    userId,
                    orderType,
                    price,
                    amount,
                    currencySrcSym,
                    currencyDestSym
                }
            })
            return order
        }
    }

    async cancelOrder(userId: number, orderId: number) {
        const order = await this.prismaService.order.findUnique({
            where: { id: orderId }
        })
        if(!order){
            throw new BadRequestException('ORDER_NOT_EXIST')
        }
        try{
            const cancelOrder = await this.prismaService.order.update({
                where: {
                    id: orderId
                },
                data: {
                    status: 'cancelled'
                }
            })
            return cancelOrder
        }catch(e){
            throw new BadRequestException('CANCEL_ORDER_FAILED')
        }
    }

    async getOrder(query: any) {
        const { orderType, src, dest, status } = query;
      
        let srcSym, destSym;
      
        if (src) {
          srcSym = (await this.prismaService.currency.findUnique({
            where: {
              symbol: src,
            },
          }))?.symbol;
      
          if (!srcSym) {
            throw new BadRequestException('UNSUPPORT_SOURCE_CURRENCY');
          }
        }
      
        if (dest) {
          destSym = (await this.prismaService.currency.findUnique({
            where: {
              symbol: dest,
            },
          }))?.symbol;
      
          if (!destSym) {
            throw new BadRequestException('UNSUPPORT_DESTINATION_CURRENCY');
          }
        }
      
        const whereClause: any = {};
      
        if (orderType) {
          whereClause.orderType = orderType;
        }
      
        if (srcSym) {
          whereClause.currencySrcSym = srcSym;
        }
      
        if (destSym) {
          whereClause.currencyDestSym = destSym;
        }
        
        if( status) {
            whereClause.status = status
        }
      
        const orders = await this.prismaService.order.findMany({
          where: whereClause,
        });
      
        return orders;
      }
      
}