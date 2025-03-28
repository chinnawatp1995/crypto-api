import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
        const res = await this.userService.createUser(createUserDto)
        return res
    }

    @Get(':username')
    @UseGuards(AuthGuard('jwt'))
    async getUserByUsername(@Param('username') username: string): Promise<{ id: number; username: string; email: string; salt: string; hashedPassword: string; createdAt: Date; } | null>{
        console.log(process.env.JWT_SECRET)
        const res = await this.userService.getUserByUsername(username)
        return res
    }

    @Get('list')
    @UseGuards(AuthGuard('jwt'))
    async list(){
        const res = await this.userService.getAll()
        return res
    }
}
