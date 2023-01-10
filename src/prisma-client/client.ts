import {PrismaClient} from "@prisma/client"

const DB_URL="mysql://064xdq3s60b4odtvy1bc:pscale_pw_hxMuKCOTD6ri3lBXqnylmkHNA0GkgmBDlp2jAn5hOOe@us-east.connect.psdb.cloud/agendamento-v2-database?sslaccept=strict"
const DB_URL_TEST = "file:./dev.db"

export const prisma = new PrismaClient({
    datasources: {
        db: { url: process.env.NODE_ENV === 'test' ? DB_URL_TEST : DB_URL },
    },
})
