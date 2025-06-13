const api = "/api";

async function loadData() {
  const res = await fetch(`${api}/read`);
  const data = await res.json();
  const container = document.getElementById("hasil");
  container.innerHTML = "";
  data.forEach(item => {
    container.innerHTML += `
      <div>
        <h3>${item.judul}</h3>
        <small>${item.tanggal}</small>
        <p>${item.deskripsi}</p>
        <button onclick='edit(${JSON.stringify(item)})'>Edit</button>
        <button onclick='hapus(${item.id})'>Hapus</button>
      </div>`;
  });
}

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

function edit(item) {
  document.getElementById("id").value = item.id;
  document.getElementById("judul").value = item.judul;
  document.getElementById("tanggal").value = item.tanggal;
  document.getElementById("deskripsi").value = item.deskripsi;
}

async function hapus(id) {
  await fetch(`${api}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  loadData();
}

loadData();
