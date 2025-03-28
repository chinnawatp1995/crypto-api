import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		const user = await this.userService.getUserByUsername(username);
		if (!user) {
			return null;
		}
		const hashedPassword = createHmac('sha256', user.salt).update(password).digest('hex')

		if (user && user.hashedPassword === hashedPassword) {
			return user;
		}
		return null;
	}

	async login(username: any, password: any) {
		const user = await this.validateUser(username, password);
		if (!user) {
			throw new BadRequestException('INCORRECT_PASSWORD_OR_USERNAME');
		}
		const payload = { username: user.username };
		return { token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET || 'topsecret'}) };
	}
}
