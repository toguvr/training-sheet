import { NextResponse } from 'next/server';
import { fauna } from '@/services/fauna';
import {
  Distinct,
  Get,
  Index,
  Lambda,
  Map,
  Match,
  Paginate,
  Select,
  Var,
  query as q,
} from 'faunadb';

export async function GET(_request: Request, context: any) {
  const { nameId } = context.params;
  const result = await fauna.query<{ data: any }>(
    Distinct(
      Map(
        Paginate(Match(Index('wods_by_nameId'), nameId)),
        Lambda('wods', Select(['data', 'weekNumber'], Get(Var('wods'))))
      )
    )
  );
  return NextResponse.json(result?.data.sort());
}
