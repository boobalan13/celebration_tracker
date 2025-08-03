import { getServerSession } from '@/lib/auth';
import { CelebrationStorage } from '@/lib/storage';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params; // ✅ Await params before using
    const celebration = CelebrationStorage.findOne({ _id: id, userEmail: session.user.email });
    if (!celebration) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(celebration);
  } catch (error) {
    console.error('Error fetching celebration:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    if (!data.title || !data.date || !data.type) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { id } = await params; // ✅ Await params
    const updated = CelebrationStorage.findOneAndUpdate(
      { _id: id, userEmail: session.user.email },
      data
    );
    if (!updated) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(updated);
  } catch (error) {
    console.error('Error updating celebration:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(req);
    if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params; // ✅ Await params
    const deleted = CelebrationStorage.findOneAndDelete({ _id: id, userEmail: session.user.email });
    if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Error deleting celebration:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
