import db from "../db/index"
import * as t from "../db/schema"
import bcrypt from 'bcrypt'
import config from '../config/index'
import logger from "../util/logger"

export async function signupService(username: string, email: string, password: string,) {
    const passwordHash = await bcrypt.hash(password, config.saltRounds)
    await db.insert(t.users).values({username, email, passwordHash})
}

export function loginService() {}
