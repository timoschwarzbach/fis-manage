import { api } from "~/trpc/server";
import Database from "better-sqlite3"
import { NextResponse } from "next/server";
import { Sequence } from "@prisma/client";

export async function GET(_request: Request) {
  const sequences = await api.sequences.getActive();
  console.log(sequences.length);

  const db = new Database();
  db.exec('CREATE TABLE sequences (id STRING PRIMARY KEY, active BOOLEAN, category STRING, locations TEXT, displayJSON TEXT, lastUpdated TEXT)');

  const insert = db.prepare('INSERT INTO sequences (id, active, category, locations, displayJSON, lastUpdated) VALUES (@id, @active, @category, @locations, @displayJSON, @lastUpdated)');
  const insertMany = db.transaction((sequences: Sequence[]) => {
    for (const sequence of sequences) insert.run({ ...sequence, id: sequence.id, active: sequence.active, category: sequence.category, locations: sequence.locations?.join('-'), displayJSON: sequence.displayJSON, lastUpdated: sequence.lastUpdated });
  });
  insertMany(sequences);


  const buffer = db.serialize();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="data.sqlite"' } });
}