import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { UserStorage } from '@/lib/storage';

export async function POST(req) {
  try {
    console.log('Login attempt started');
    const { email, password } = await req.json();
    console.log('Login data:', { email, passwordLength: password?.length });
    
    if (!email || !password) {
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const user = UserStorage.findOne({ email });
    console.log('User found:', !!user);
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', valid);
    if (!valid) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create JWT session
    const token = createSession(user.email);
    
    // Set HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    console.log('Login successful');
    return Response.json({ success: true, user: { email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
