import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { DepositWithdrawDto } from './dto/wallet.dto';
import { CurrentUser } from 'src/decorator/currentUser';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('deposit')
  @UseGuards(AuthGuard('jwt'))
  async deposit(@Body() param: DepositWithdrawDto, @CurrentUser('id') userId: number) {
    const res = await this.walletService.deposit(userId, param);
    return res;
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(@Body() param: DepositWithdrawDto, @CurrentUser('id') userId: number) {
    const res = await this.walletService.withdraw(userId, param);
    return res;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getWalletById(@Param('id') id: number) {
    const res = await this.walletService.getWallet(id);
    return res;
  }
}
