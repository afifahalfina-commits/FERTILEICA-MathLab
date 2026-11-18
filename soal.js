// CONTOH SOAL — ganti dengan soal yang sudah divalidasi. Pastikan data angka konsisten.
export const KASUS = `Sebuah usaha membuat dua paket pupuk cair FERTILEICA. Paket A memerlukan 2 liter bahan X dan 1 liter bahan Y. Paket B memerlukan 1 liter bahan X dan 3 liter bahan Y. Persediaan: 100 liter bahan X dan 150 liter bahan Y, dan seluruhnya habis dipakai. Berapa paket A dan paket B yang diproduksi?`;

export const POLYA = [
  ['Memahami masalah', 'Tuliskan yang diketahui, yang ditanyakan, dan variabel yang kamu pilih.'],
  ['Merencanakan penyelesaian', 'Susun dua persamaan linear dan pilih metode (eliminasi/substitusi/grafik) beserta alasannya.'],
  ['Melaksanakan rencana', 'Selesaikan sistem persamaan secara runtut.'],
  ['Memeriksa kembali', 'Substitusikan hasil ke kedua persamaan. Apakah jawaban masuk akal dalam konteks?']
];

export const SOAL = {
  pretest: [
    { id: 'p1', level: 'C4', teks: 'Contoh C4: Analisislah informasi pada soal produksi pupuk berikut dan tentukan model SPLDV-nya...' },
    { id: 'p2', level: 'C5', teks: 'Contoh C5: Seorang siswa menyelesaikan ... dengan hasil ... Evaluasi apakah strateginya tepat dan berikan alasan matematis.' },
    { id: 'p3', level: 'C6', teks: 'Contoh C6: Susunlah masalah SPLDV baru dengan konteks FERTILEICA yang memenuhi batasan berikut...' }
  ],
  posttest: [
    { id: 'q1', level: 'C4', teks: 'Soal paralel C4 (isi sendiri)...' },
    { id: 'q2', level: 'C5', teks: 'Soal paralel C5 (isi sendiri)...' },
    { id: 'q3', level: 'C6', teks: 'Soal paralel C6 (isi sendiri)...' }
  ]
};
