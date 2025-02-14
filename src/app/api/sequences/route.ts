import { api } from "~/trpc/server";
import Database from "better-sqlite3"
import { NextResponse } from "next/server";
import { type Sequence } from "@prisma/client";

export async function GET(_request: Request) {
  const sequences = await api.sequences.getActive();

  const db = new Database();
  db.exec('CREATE TABLE sequences (id STRING PRIMARY KEY, active BOOLEAN, category STRING, locations TEXT, aspects TEXT, slides TEXT, lastUpdated TEXT)');

  const insert = db.prepare('INSERT INTO sequences (id, active, category, locations, aspects, slides, lastUpdated) VALUES (@id, @active, @category, @locations, @aspects, @slides, @lastUpdated)');
  const insertMany = db.transaction((sequences: Sequence[]) => {
    for (const sequence of sequences) insert.run({ ...sequence, id: sequence.id, active: sequence.active ? "true" : "false", category: sequence.category, locations: JSON.stringify(sequence.locations), aspects: JSON.stringify(sequence.aspects), slides: JSON.stringify(sequence.slides), lastUpdated: sequence.lastUpdated.toISOString() });
  });
  insertMany(sequences);


  const buffer = db.serialize();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="data.sqlite"' } });
}