-- Jalankan di Supabase: SQL Editor > New query
create table submissions (
  id bigint generated always as identity primary key,
  kode text not null check (char_length(kode) between 2 and 30),
  jenis text not null check (jenis in ('pretest','posttest','polya')),
  jawaban jsonb not null,
  created_at timestamptz default now()
);
-- pretest & posttest hanya boleh satu kali per kode
create unique index uniq_tes on submissions (kode, jenis) where jenis in ('pretest','posttest');

alter table submissions enable row level security;
-- siswa (anon) hanya boleh MENGIRIM, tidak boleh membaca data siapa pun
create policy "siswa kirim jawaban" on submissions for insert to anon with check (true);
-- Peneliti membaca/ekspor CSV lewat Supabase Dashboard > Table Editor.
