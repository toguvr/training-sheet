import { fauna } from '@/services/fauna';
import { randomUUID } from 'crypto';
import { query as q } from 'faunadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const wodData = {
    id: randomUUID(),
    ...body,
  };

  await fauna.query(q.Create(q.Collection('wods'), { data: wodData }));

  return new Response('Treino cadastrado!');
}

export async function GET(request: Request) {
  const result = await fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('wods'))),
      q.Lambda((x) => q.Get(x))
    )
  );

  return NextResponse.json(result.data);
}
