import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [ 
	PassportModule.register({ defaultStrategy: 'jwt' }),
	JwtModule.register({
		secret: process.env.JWT_SECRET || 'topsecret',
		signOptions: { expiresIn: '1h' },
	  }),
	],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtStrategy, JwtService]
})
export class AuthModule {
}
