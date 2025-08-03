// Simple session management for custom authentication
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export function createSession(userEmail) {
  return jwt.sign({ email: userEmail }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getServerSession(req) {
  let token;

  if (req.cookies) {
    // For API routes
    token = req.cookies.get('auth-token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  } else {
    // For server components - use cookies() from next/headers
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    token = cookieStore.get('auth-token')?.value;
  }

  if (!token) return null;

  const decoded = verifySession(token);
  if (!decoded) return null;

  return { user: { email: decoded.email } };
}
