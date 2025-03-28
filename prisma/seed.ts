import { PrismaClient } from "@prisma/client";
import { createHmac, randomBytes } from "crypto";

const prisma: PrismaClient = new PrismaClient()

async function main() {
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = createHmac('sha256', salt).update('admin').digest('hex');
    console.log('seeding database ')
    await prisma.$transaction([
        prisma.currency.createMany({
            data: [
                {
                    symbol: 'USD',
                    name: 'us dolla',
                    type: 'fiat'
                },
                {
                    symbol: 'THB',
                    name: 'thai baht',
                    type: 'fiat'
                },
                {
                    symbol: 'BTC',
                    name: 'bitcoin',
                    type: 'crypto'
                },
                {
                    symbol: 'ETH',
                    name: 'etherium',
                    type: 'crypto'
                },
                {
                    symbol: 'XRP',
                    name: 'xrp',
                    type: 'crypto'
                },
                {
                    symbol: 'DOGE',
                    name: 'dogecoin',
                    type: 'crypto'
                }
            ]
        }),
        prisma.user.create({
            data: {
                username: 'admin',
                email: 'admin@admin.com',
                salt,
                hashedPassword
            }
        })
    ])
}

main();