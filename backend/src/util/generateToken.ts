import jwt from "jsonwebtoken"
import config from "../config"

export default function generateToken(userId: number, username: string) {
    return jwt.sign({ userId, username }, config.jwt.secretKey, { expiresIn: config.jwt.expiresIn})
}