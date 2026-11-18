import { SUPABASE_URL, SUPABASE_KEY } from './config.js';
import { KASUS, POLYA, SOAL } from './soal.js';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = s => document.querySelector(s);
const app = $('#app');
let kode = localStorage.getItem('kode') || '';

async function simpan(jenis, jawaban) {
  const { error } = await sb.from('submissions').insert({ kode, jenis, jawaban });
  return error;
}

function beranda() {
  app.innerHTML = `<div class="card"><h2>FERTILEICA MathLab</h2>
  <p>Belajar SPLDV kelas VIII lewat masalah nyata pupuk cair FERTILEICA, dengan tahapan Polya: memahami, merencanakan, melaksanakan, memeriksa kembali.</p>
  <p class="muted">Alur: Pretest → Materi → Problem-Solving → Posttest.</p>
  <a class="btn" href="#pretest">Mulai belajar</a></div>`;
}

function materi() {
  app.innerHTML = `<div class="card"><h2>Materi SPLDV</h2>
  <p><b>Bentuk umum:</b> ax + by = c dan dx + ey = f, dengan x dan y variabel.</p>
  <p><b>Eliminasi:</b> samakan koefisien salah satu variabel, lalu kurangkan/jumlahkan persamaan.</p>
  <p><b>Substitusi:</b> nyatakan satu variabel dalam variabel lain, lalu masukkan ke persamaan kedua.</p>
  <p><b>Grafik:</b> gambar kedua garis; titik potongnya adalah penyelesaian.</p>
  <p class="hint">Tambahkan contoh soal kontekstual FERTILEICA di sini.</p></div>`;
}

function gate(fn) {
  if (kode) return fn();
  app.innerHTML = `<div class="card"><h2>Masuk</h2><p>Masukkan kode peserta dari gurumu.</p>
  <form id="k"><input name="kode" required minlength="2" maxlength="30" placeholder="Contoh: S01"><br><br><button>Lanjut</button></form></div>`;
  $('#k').onsubmit = e => {
    e.preventDefault();
    kode = new FormData(e.target).get('kode').trim();
    localStorage.setItem('kode', kode);
    route();
  };
}

function form(judul, info, fields, jenis) {
  app.innerHTML = `<h2>${judul}</h2><p class="muted">Kode peserta: ${kode} · ${info}</p>
  <form id="f">${fields}<button>Kirim jawaban</button><p id="msg"></p></form>`;
  $('#f').onsubmit = async e => {
    e.preventDefault();
    const err = await simpan(jenis, Object.fromEntries(new FormData(e.target)));
    $('#msg').textContent = !err ? '✅ Jawaban tersimpan. Terima kasih!'
      : err.code === '23505' ? 'Kamu sudah mengirim tes ini.' : 'Gagal menyimpan: ' + err.message;
    if (!err) e.target.querySelector('button').disabled = true;
  };
}

const ta = (name, ph) => `<textarea name="${name}" rows="5" required placeholder="${ph}"></textarea>`;

function tes(jenis) {
  const fields = SOAL[jenis].map((s, i) =>
    `<div class="card"><b>${i + 1}. [${s.level}]</b><p>${s.teks}</p>${ta(s.id, 'Tuliskan jawaban beserta langkahmu...')}</div>`).join('');
  form(jenis === 'pretest' ? 'Pretest HOTS' : 'Posttest HOTS', 'dapat dikirim satu kali', fields, jenis);
}

function polya() {
  const fields = `<div class="card"><b>Kasus</b><p>${KASUS}</p></div>` +
    POLYA.map(([t, p], i) => `<div class="card"><b>Tahap ${i + 1} — ${t}</b><p class="hint">${p}</p>${ta('tahap' + (i + 1), 'Jawabanmu...')}</div>`).join('');
  form('Problem-Solving FERTILEICA', 'empat tahap Polya', fields, 'polya');
}

const views = {
  beranda, materi,
  polya: () => gate(polya),
  pretest: () => gate(() => tes('pretest')),
  posttest: () => gate(() => tes('posttest'))
};

function route() {
  const h = (location.hash || '#beranda').slice(1);
  (views[h] || beranda)();
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.hash === '#' + h));
}
addEventListener('hashchange', route);
route();
