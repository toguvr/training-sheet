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
  const { nameId, week, weekDate } = context.params;
  const result = await fauna.query<{ data: any }>(
    q.Let(
      {
        match_result: Match(Index('wods_by_nameId_and_weekNumber_day'), [
          nameId,
          week,
          weekDate,
        ]),
      },
      q.If(
        q.Exists(Var('match_result')),
        Get(Select('ref', Get(Var('match_result')))),
        null
      )
    )
  );

  return NextResponse.json(result?.data);
}
