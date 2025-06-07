import { api } from "~/trpc/server";
import Database from "better-sqlite3"
import { NextResponse } from "next/server";
import { type File, type Sequence } from "@prisma/client";

export async function GET(_request: Request) {
  const sequences = await api.sequences.getActive();
  const tagesschau = await api.services.getSequence("tagesschau");
  const weather = await api.services.getSequence("weather");
  const wikipedia = await api.services.getSequence("wikipedia");
  const files = await api.files.getAll();

  const db = new Database();
  db.exec('CREATE TABLE sequences (id STRING PRIMARY KEY, active BOOLEAN, category STRING, locations TEXT, aspects TEXT, slides TEXT, createdAt TEXT, lastUpdated TEXT)');
  db.exec('CREATE TABLE files (id STRING PRIMARY KEY, bucket STRING, fileName STRING, fileType STRING, originalName STRING)');

  const sequences_insert = db.prepare('INSERT INTO sequences (id, active, category, locations, aspects, slides, createdAt, lastUpdated) VALUES (@id, @active, @category, @locations, @aspects, @slides, @createdAt, @lastUpdated)');
  const sequences_insertMany = db.transaction((sequences: Sequence[]) => {
    for (const sequence of sequences) {
      const item = { ...sequence, id: sequence.id, active: sequence.active ? "true" : "false", category: sequence.category, locations: JSON.stringify(sequence.locations), aspects: JSON.stringify(sequence.aspects), slides: JSON.stringify(sequence.slides), createdAt: sequence.createdAt.toISOString(), lastUpdated: sequence.lastUpdated.toISOString() };
      sequences_insert.run(item);
    }
  });
  sequences_insertMany(sequences);
  sequences_insertMany(tagesschau);
  sequences_insertMany(weather);
  sequences_insertMany(wikipedia);

  const files_insert = db.prepare('INSERT INTO files (id, bucket, fileName, fileType, originalName) VALUES (@id, @bucket, @fileName, @fileType, @originalName)');
  const files_insertMany = db.transaction((files: File[]) => {
    for (const file of files) files_insert.run({ ...file, id: file.id, bucket: file.bucket, fileName: file.fileName, fileType: file.fileType, originalName: file.originalName });
  });
  files_insertMany(files);


  const buffer = db.serialize();
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; filename="data.sqlite"' } });
}