import jwt from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET || 'access_secret_dev';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh_secret_dev';

export function generateAccessToken(payload: object) {
  return jwt.sign(payload, accessSecret, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: object) {
  return jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret) as any;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret) as any;
}
