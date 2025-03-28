import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Post('deposit')
    @UseGuards(AuthGuard('jwt'))
    async deposit(@Body() param: any){
        const res = await this.walletService.deposit(param.userId, param)
        return res
    }

    @Post('withdraw')
    @UseGuards(AuthGuard('jwt'))
    async withdraw(@Body() param: any){
        const res = await this.walletService.withdraw(param.userId, param)
        return res
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getWalletById(@Param('id') id: any){
        const res = await this.walletService.getWallet(id)
        return res
    }
}
