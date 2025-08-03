import { getServerSession } from '@/lib/auth';
import { CelebrationStorage } from '@/lib/storage';

const allowedOrigin = 'https://celebration-tracker.vercel.app';

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

// ✅ Handle preflight requests
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(req) {
  try {
    const session = await getServerSession(req);
    if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const celebrations = CelebrationStorage.find({ userEmail: session.user.email });
    return new Response(JSON.stringify(celebrations), { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching celebrations:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: corsHeaders });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(req);
    if (!session) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const data = await req.json();
    if (!data.title || !data.date || !data.type) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: corsHeaders });
    }

    const celebration = CelebrationStorage.create({
      ...data,
      userEmail: session.user.email
    });
    return new Response(JSON.stringify(celebration), { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error creating celebration:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: corsHeaders });
  }
}
