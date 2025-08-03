import bcrypt from 'bcryptjs';
import { UserStorage } from '@/lib/storage';

export async function POST(req) {
  try {
    console.log('Registration attempt started');
    const { email, password } = await req.json();
    console.log('Received data:', { email, passwordLength: password?.length });
    
    if (!email || !password) {
      console.log('Missing fields');
      return Response.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    if (password.length < 6) {
      console.log('Password too short');
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    
    console.log('Checking if user exists');
    const exists = UserStorage.findOne({ email });
    if (exists) {
      console.log('User already exists');
      return Response.json({ error: 'Email already registered' }, { status: 400 });
    }
    
    console.log('Hashing password');
    const hash = await bcrypt.hash(password, 10);
    
    console.log('Creating user');
    const newUser = UserStorage.create({ email, password: hash });
    console.log('User created successfully:', newUser._id);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ error: 'Internal server error: ' + error.message }, { status: 500 });
  }
}
