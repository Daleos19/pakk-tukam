let userName = ""; // Variabel global untuk menyimpan nama

function askBirthDate() {
    userName = document.getElementById("nameInput").value.trim(); // Simpan nama pengguna
    let nameInput = document.getElementById("nameInput");
    let button = document.querySelector("button");
    let birthDateInput = document.getElementById("birthDateInput");
    let submitBirthDate = document.getElementById("submitBirthDate");

    if (userName !== "") {
        nameInput.style.display = "none";
        button.style.display = "none";

        birthDateInput.style.display = "block";
        submitBirthDate.style.display = "block";
    }
}

function sayHello() {
    let birthDate = document.getElementById("birthDateInput").value;
    let birthDateInput = document.getElementById("birthDateInput");
    let submitBirthDate = document.getElementById("submitBirthDate");
    let greetingText = document.getElementById("greetingText");
    let title = document.getElementById("title");

    if (birthDate !== "") {
        birthDateInput.style.display = "none";
        submitBirthDate.style.display = "none";
        title.style.display = "none";

        let messages = [
            `Hallo ${userName}, apa kabar hari ini?`,
            "Kamu imut banget sih, pengen nonjok dehh rasanya",
            "Eh tapi bercanda kok, jangan marah ya!",
            "Ngomong-ngomong, ulang tahunmu tinggal "
        ];

        let messageIndex = 0;
        greetingText.innerHTML = "";

        function typeWriter(message, callback) {
            let i = 0;
            greetingText.innerHTML = "";

            function write() {
                if (i < message.length) {
                    greetingText.innerHTML += message.charAt(i);
                    i++;
                    setTimeout(write, 100);
                } else if (callback) {
                    callback();
                }
            }
            write();
        }

        function changeText() {
            messageIndex++;

            if (messageIndex < messages.length) {
                typeWriter(messages[messageIndex], () => {
                    greetingText.addEventListener("click", changeText, { once: true });

                    // Jika ini adalah pesan terakhir, tambahkan hitungan mundur
                    if (messageIndex === messages.length - 1) {
    let countdownSpan = document.createElement("span");
    countdownSpan.id = "countdown";
    greetingText.appendChild(countdownSpan);
    
    let extraText = document.createTextNode("");
    greetingText.appendChild(extraText); // Tambahkan teks tanpa menimpa elemen

    document.getElementById("countdownContainer").style.display = "block"; // Pastikan muncul
    startCountdown(birthDate);
}
                });
            }
        }

        typeWriter(messages[messageIndex], () => {
            greetingText.addEventListener("click", changeText, { once: true });
        });
    }
}

function startCountdown(birthDate) {
    let greetingText = document.getElementById("greetingText");

    // Buat container countdown jika belum ada
    let countdownContainer = document.getElementById("countdownContainer");
    if (!countdownContainer) {
        countdownContainer = document.createElement("div");
        countdownContainer.id = "countdownContainer";
        greetingText.appendChild(countdownContainer);
    }

    function updateCountdown() {
        let today = new Date();
        let nextBirthday = new Date(birthDate);
        nextBirthday.setFullYear(today.getFullYear());

        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        let timeDiff = nextBirthday - today;
        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Update tampilan countdown dengan elemen-elemen terpisah
        countdownContainer.innerHTML = `
            <div class="countdown-item">
                ${days}<span class="countdown-label">Hari</span>
            </div>
            <div class="countdown-item">
                ${hours}<span class="countdown-label">Jam</span>
            </div>
            <div class="countdown-item">
                ${minutes}<span class="countdown-label">Menit</span>
            </div>
            <div class="countdown-item">
                ${seconds}<span class="countdown-label">Detik</span>
            </div>
        `;
    }

    updateCountdown(); // Jalankan pertama kali agar tidak ada delay
    setInterval(updateCountdown, 1000); // Perbarui setiap detik
}