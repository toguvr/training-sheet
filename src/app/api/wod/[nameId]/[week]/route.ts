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
  const { nameId, week } = context.params;
  const result = await fauna.query<{ data: any }>(
    Distinct(
      Map(
        Paginate(Match(Index('wods_by_nameId_and_weekNumber'), [nameId, week])),
        Lambda('wod', Select(['data', 'weekDay'], Get(Var('wod'))))
      )
    )
  );
  return NextResponse.json(result?.data.sort());
}
