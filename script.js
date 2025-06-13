const api = "/api"; // dialihkan via netlify.toml

// Generate kartu catatan dengan Tailwind
function cardTemplate(item) {
  return `
    <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 relative group transition hover:shadow-lg">
      <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        ${item.judul}
      </h3>
      <p class="text-sm text-gray-500 mb-2">${item.tanggal}</p>
      <p class="text-gray-700">${item.deskripsi}</p>
      <div class="mt-4 flex gap-2">
        <button onclick='edit(${JSON.stringify(item)})'
          class="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded text-sm transition">
          ✏️ Edit
        </button>
        <button onclick='confirmHapus(${item.id})'
          class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition">
          🗑️ Hapus
        </button>
      </div>
    </div>`;
}

async function loadData() {
  const res = await fetch(`${api}/read`);
  const data = await res.json();
  const container = document.getElementById("hasil");
  container.innerHTML = data.length ? "" : `<p class="text-gray-500 text-center">Belum ada catatan.</p>`;
  data.forEach(item => container.innerHTML += cardTemplate(item));
}

// Submit form (create / update)
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  const payload = {
    id,
    judul: document.getElementById("judul").value,
    tanggal: document.getElementById("tanggal").value,
    deskripsi: document.getElementById("deskripsi").value,
  };
  const url = id ? `${api}/update` : `${api}/create`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  e.target.reset();
  loadData();
});

// Prefill form untuk edit
function edit(item) {
  document.getElementById("id").value = item.id;
  document.getElementById("judul").value = item.judul;
  document.getElementById("tanggal").value = item.tanggal;
  document.getElementById("deskripsi").value = item.deskripsi;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal konfirmasi hapus sederhana (native confirm)
function confirmHapus(id) {
  if (confirm('Yakin ingin menghapus catatan ini?')) {
    hapus(id);
  }
}

// Hapus catatan
async function hapus(id) {
  await fetch(`${api}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  loadData();
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', loadData);