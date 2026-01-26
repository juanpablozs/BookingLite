import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { email, password, businessName } = req.body;
  const user = await authService.registerUser({ email, password, businessName });
  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  await authService.saveRefreshToken(user.id, refreshToken);
  // Don't return password
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _p, ...safeUser } = user as any;
  res.json({ user: safeUser, tokens: { accessToken, refreshToken } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await authService.validateUserCredentials(email, password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = generateAccessToken({ userId: user.id });
  const refreshToken = generateRefreshToken({ userId: user.id });
  await authService.saveRefreshToken(user.id, refreshToken);
  const { password: _p, ...safeUser } = user as any;
  res.json({ user: safeUser, tokens: { accessToken, refreshToken } });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
  try {
    const payload: any = verifyRefreshToken(refreshToken);
    const stored = await authService.findRefreshToken(refreshToken);
    if (!stored) return res.status(401).json({ message: 'Invalid refresh token' });
    const accessToken = generateAccessToken({ userId: payload.userId });
    const newRefresh = generateRefreshToken({ userId: payload.userId });
    await authService.revokeRefreshToken(refreshToken);
    await authService.saveRefreshToken(payload.userId, newRefresh);
    res.json({ tokens: { accessToken, refreshToken: newRefresh } });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
}

export async function logout(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
  await authService.revokeRefreshToken(refreshToken);
  res.json({ message: 'Logged out' });
}
