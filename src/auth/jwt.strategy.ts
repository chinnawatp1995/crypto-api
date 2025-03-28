import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET || 'topsecret',
		});
	}

	async validate(payload: { username: string, iat: number}): Promise<any> {
		// Note : For sensitive operation , the payload should be checked whether the username is actually exist
		// const user = await this.systemUserService.getSystemUserByUsername(
		// 	payload.username,
		// );
		// if (!user) {
		// 	throw new AppError('USER_NOT_EXIST');
		// }
		return payload;
	}
}
