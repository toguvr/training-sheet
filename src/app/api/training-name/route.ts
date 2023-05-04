import { fauna } from '@/services/fauna';
import { randomUUID } from 'crypto';
import { query as q } from 'faunadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const trainingData = {
    id: randomUUID(),
    name: body.name,
  };

  await fauna.query(
    q.Create(q.Collection('training-names'), { data: trainingData })
  );

  return new Response('Treino cadastrado!');
}

export async function GET() {
  try {
    const result = await fauna.query<{ data: any }>(
      q.Map(
        q.Paginate(q.Documents(q.Collection('training-names'))),
        q.Lambda((x) => q.Get(x))
      )
    );

    return NextResponse.json(result?.data);
  } catch {}
}
