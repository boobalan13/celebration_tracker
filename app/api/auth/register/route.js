import bcrypt from 'bcryptjs';
import { UserStorage } from '@/lib/storage';

const allowedOrigin = 'https://celebration-tracker.vercel.app';  // ✅ your Vercel frontend

export async function OPTIONS() {
  // Handle preflight requests
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req) {
  try {
    // ✅ Add CORS headers to response
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    console.log('Registration attempt started');
    const { email, password } = await req.json();
    console.log('Received data:', { email, passwordLength: password?.length });
    
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400, headers: corsHeaders });
    }
    
    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters' }), { status: 400, headers: corsHeaders });
    }
    
    const exists = UserStorage.findOne({ email });
    if (exists) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400, headers: corsHeaders });
    }
    
    const hash = await bcrypt.hash(password, 10);
    const newUser = UserStorage.create({ email, password: hash });
    console.log('User created successfully:', newUser._id);

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error: ' + error.message }), { status: 500, headers: corsHeaders });
  }
}
