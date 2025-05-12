// Data Atlet dalam format JSON
const athletes = [
    {
        nama: "John Doe",
        gender: "Laki-laki",
        asal: "Jakarta",
        tahun_lahir: 1995,
        tingkat_sabuk: "Hitam",
        kelas: "Under 68kg",
        event_grade_b: "Emas",
        event_grade_a: "Tidak Ada Medali",
        poin: 120,
        foto: "https://via.placeholder.com/150",
        events: ["Kejuaraan Nasional 2025", "Turnamen Asia"]
    },
    {
        nama: "Jane Smith",
        gender: "Perempuan",
        asal: "Bandung",
        tahun_lahir: 2000,
        tingkat_sabuk: "Merah",
        kelas: "Under 57kg",
        event_grade_b: "Perunggu",
        event_grade_a: "Perak",
        poin: 85,
        foto: "https://via.placeholder.com/150",
        events: ["Kejuaraan Dunia 2025"]
    }
];

// Fungsi untuk mengonversi medali menjadi poin
function medalToPoints(medal) {
    switch (medal) {
        case "Emas":
            return 5;
        case "Perak":
            return 2;
        case "Perunggu":
            return 1;
        case "Tidak Ada Medali":
            return -5;
        default:
            return 0;
    }
}

// Fungsi untuk menghitung total poin berdasarkan medali
function calculateTotalPoints(athlete) {
    let totalPoints = athlete.poin;
    totalPoints += medalToPoints(athlete.event_grade_a);
    totalPoints += medalToPoints(athlete.event_grade_b);
    return totalPoints;
}

// Fungsi untuk menampilkan data atlet ke dalam tabel
function renderTable() {
    const tableBody = document.querySelector("#athlete-table tbody");
    tableBody.innerHTML = ""; // Kosongkan isi tabel

    athletes.forEach((athlete, index) => {
        const gradeBPoints = medalToPoints(athlete.event_grade_b);
        const gradeAPoints = medalToPoints(athlete.event_grade_a);
        const totalPoints = calculateTotalPoints(athlete);

        const row = `
            <tr>
                <td class="athlete-name" data-index="${index}">${athlete.nama}</td>
                <td>${athlete.gender}</td>
                <td>${athlete.asal}</td>
                <td>${athlete.tahun_lahir}</td>
                <td>${athlete.tingkat_sabuk}</td>
                <td>${athlete.kelas}</td>
                <td>${athlete.event_grade_b}</td>
                <td>${gradeBPoints} Poin</td>
                <td>${athlete.event_grade_a}</td>
                <td>${gradeAPoints} Poin</td>
                <td>${totalPoints}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });

    // Tambahkan event listener untuk setiap nama atlet
    document.querySelectorAll(".athlete-name").forEach((element) => {
        element.addEventListener("click", showAthleteDetails);
    });
}

// Fungsi untuk menampilkan detail atlet dalam modal
function showAthleteDetails(event) {
    const index = event.target.getAttribute("data-index");
    const athlete = athletes[index];

    document.getElementById("athlete-photo").src = athlete.foto;
    document.getElementById("athlete-name").textContent = athlete.nama;
    document.getElementById("athlete-events").textContent = athlete.events.join(", ");
    document.getElementById("athlete-total-points").textContent = calculateTotalPoints(athlete);

    const modal = document.getElementById("athlete-modal");
    modal.style.display = "block";

    // Close modal functionality
    const closeModal = document.querySelector(".close");
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    // Close modal when clicking outside content
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderTable);