import { api } from "~/trpc/server";
import Database from "better-sqlite3"
import { NextResponse } from "next/server";
import { type File, type Sequence } from "@prisma/client";

export async function GET(_request: Request) {
  const sequences = await api.sequences.getActive();
  const files = await api.files.getAll();

  const db = new Database();
  db.exec('CREATE TABLE sequences (id STRING PRIMARY KEY, active BOOLEAN, category STRING, locations TEXT, aspects TEXT, slides TEXT, lastUpdated TEXT)');
  db.exec('CREATE TABLE files (id STRING PRIMARY KEY, bucket STRING, fileName STRING, fileType STRING, originalName STRING)');

  const sequences_insert = db.prepare('INSERT INTO sequences (id, active, category, locations, aspects, slides, lastUpdated) VALUES (@id, @active, @category, @locations, @aspects, @slides, @lastUpdated)');
  const sequences_insertMany = db.transaction((sequences: Sequence[]) => {
    for (const sequence of sequences) sequences_insert.run({ ...sequence, id: sequence.id, active: sequence.active ? "true" : "false", category: sequence.category, locations: JSON.stringify(sequence.locations), aspects: JSON.stringify(sequence.aspects), slides: JSON.stringify(sequence.slides), lastUpdated: sequence.lastUpdated.toISOString() });
  });
  sequences_insertMany(sequences);

  const files_insert = db.prepare('INSERT INTO files (id, bucket, fileName, fileType, originalName) VALUES (@id, @bucket, @fileName, @fileType, @originalName)');
  const files_insertMany = db.transaction((files: File[]) => {
    for (const file of files) files_insert.run({ ...file, id: file.id, bucket: file.bucket, fileName: file.fileName, fileType: file.fileType, originalName: file.originalName });
  });
  files_insertMany(files);


  const buffer = db.serialize();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="data.sqlite"' } });
}