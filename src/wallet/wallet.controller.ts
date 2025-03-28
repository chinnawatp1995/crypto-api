import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { DepositWithdrawDto } from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('deposit')
  @UseGuards(AuthGuard('jwt'))
  async deposit(@Body() param: DepositWithdrawDto) {
    const res = await this.walletService.deposit(param);
    return res;
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(@Body() param: DepositWithdrawDto) {
    const res = await this.walletService.withdraw(param);
    return res;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getWalletById(@Param('id') id: number) {
    const res = await this.walletService.getWallet(id);
    return res;
  }
}
