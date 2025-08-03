import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { cookies } from 'next/headers';
import { UserStorage } from '@/lib/storage';

const allowedOrigin = 'https://celebration-tracker.vercel.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

// ✅ Preflight request handler
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: corsHeaders });
    }

    const user = UserStorage.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: corsHeaders });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: corsHeaders });
    }

    const token = createSession(user.email);
    const cookieStore = await cookies();

    // ✅ Fix cookie for cross-domain
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: true,          // Always true for cross-domain
      sameSite: 'none',      // Must be none for different domains
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    });

    return new Response(JSON.stringify({ success: true, user: { email: user.email } }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: corsHeaders });
  }
}
