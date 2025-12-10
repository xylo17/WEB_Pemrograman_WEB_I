let timeline = JSON.parse(localStorage.getItem("timelineData")) || weekData;

document.getElementById("menuBtn").onclick = function() {
    document.getElementById("sidebar").classList.toggle("active");
};

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function updateTime() {
    document.getElementById("currentTime").innerText = new Date().toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

function loadWeek() {
    const table = document.getElementById("weekTable");

    table.innerHTML = `
        <tr>
            <th>Kegiatan</th>
            <th>Hari</th>
            <th>Tanggal</th>
            <th>Waktu</th>
            <th>Aksi</th>
        </tr>
    `;

    timeline.forEach((i, index) => {
        table.innerHTML += `
            <tr>
                <td>${i.kegiatan}</td>
                <td>${i.tanggal}</td>
                <td>${i.tanggal_asli}</td>
                <td>${i.waktu}</td>
                <td><button class="delete-btn" onclick="deleteTimeline(${index})">Hapus</button></td>
            </tr>
        `;
    });
}



function loadMeetings() {
    const box = document.getElementById("meetingList");
    meetingData.forEach(i => {
        box.innerHTML += `
            <div class="card">
                <h3>${i.judul}</h3>
                <small>${i.waktu}</small>
                <p>${i.catatan}</p>
            </div>
        `;
    });
}

function loadTasks() {
    const box = document.getElementById("taskList");
    taskData.forEach(i => {
        const pr =
            i.prioritas === 3 ? "p-high" :
            i.prioritas === 2 ? "p-med" : "p-low";

        const text =
            i.prioritas === 3 ? "Tinggi" :
            i.prioritas === 2 ? "Sedang" : "Rendah";

        box.innerHTML += `
            <div class="card">
                <h3>${i.nama}</h3>
                <p>Deadline: ${i.deadline}</p>
                <span class="priority ${pr}">${text}</span>
            </div>
        `;
    });
}

function loadContacts() {
    const box = document.getElementById("contactList");
    contactData.forEach(i => {
        box.innerHTML += `
            <div class="card">
                <h3>${i.nama}</h3>
                <p>WA: <a href="https://wa.me/${i.wa}" target="_blank">${i.wa}</a></p>
                <p>Email: <a href="mailto:${i.email}">${i.email}</a></p>
            </div>
        `;
    });
}

function loadGeneral() {
    const box = document.getElementById("generalList");
    generalInfo.forEach(i => {
        box.innerHTML += `
            <div class="card">
                <h3>${i.judul}</h3>
                <small>${i.tgl}</small>
                <p>${i.isi}</p>
            </div>
        `;
    });
}

function openTimelineForm() {
    document.getElementById("timelineForm").style.display = "block";
}

function closeTimelineForm() {
    document.getElementById("timelineForm").style.display = "none";
}

function saveTimeline() {
    const kegiatan = document.getElementById("inputKegiatan").value;
    const tanggalInput = document.getElementById("inputTanggal").value;
    const waktu = document.getElementById("inputWaktu").value;

    if (!kegiatan || !tanggalInput || !waktu) {
        alert("Semua field wajib diisi!");
        return;
    }

    // ubah tanggal jadi hari otomatis
    const hari = getDayName(tanggalInput);

    timeline.push({
        kegiatan,
        tanggal: hari, // Senin, Selasa, dll.
        tanggal_asli: tanggalInput, // yyyy-mm-dd untuk ditampilkan jika perlu
        waktu
    });

    localStorage.setItem("timelineData", JSON.stringify(timeline));

    closeTimelineForm();
    loadWeek();
    loadTasks();
}


function getDayName(dateString) {
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const date = new Date(dateString);
    return days[date.getDay()];
}


function deleteTimeline(index) {
    timeline.splice(index, 1);
    localStorage.setItem("timelineData", JSON.stringify(timeline));
    loadWeek();
}



loadWeek();
loadMeetings();
loadTasks();
loadContacts();
loadGeneral();