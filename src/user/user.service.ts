import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async createUser(param: any) {
		console.log(param)
		const { username, password, email } = param
		const user = await this.getUserByUsername(param.username);

		if (user) {
			throw new Error('USERNAME_ALREADY_EXIST');
		}
		const salt = randomBytes(16).toString("hex");
		const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
		const createResult = await this.prismaService.user.create({
			data: {
				username,
				email,
				hashedPassword,
				salt,
			},
		});

		if (!createResult) {
			throw new Error('CREATE_USER_FAILED');
		}

		const userInfo = {
			username: createResult.username,
			hashedPassword: hashedPassword,
		};
		return { result: { data: userInfo } };
	}

	async getUserByUsername(username: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				username
			},
		});
		if (!user) {
			return null;
		}
		return user;
	}

	async getAll(){
		const users = await this.prismaService.user.findMany({})
		return users
	}
}
