import { getServerSession } from '@/lib/auth';
import { CelebrationStorage } from '@/lib/storage';

export async function GET(req) {
  try {
    const session = await getServerSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const celebrations = CelebrationStorage.find({ userEmail: session.user.email });
    return Response.json(celebrations);
  } catch (error) {
    console.error('Error fetching celebrations:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();

    // Validate required fields
    if (!data.title || !data.date || !data.type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const celebration = CelebrationStorage.create({
      ...data,
      userEmail: session.user.email
    });
    return Response.json(celebration);
  } catch (error) {
    console.error('Error creating celebration:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
