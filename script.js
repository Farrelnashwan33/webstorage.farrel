// Ambil elemen-elemen DOM
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const linkInput = document.getElementById("linkInput");
const taskList = document.getElementById("taskList");
const clearAllTasksBtn = document.getElementById("clearAllTasks");

// Fungsi untuk menampilkan daftar tugas dari Local Storage
function displayTasks() {
    taskList.innerHTML = ""; // Kosongkan taskList sebelum menambahkan
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        taskItem.innerHTML = `
            <span>${task.name}</span>
            ${task.link ? `<a href="${task.link}" target="_blank" class="task-link">Link</a>` : ""}
            <button onclick="deleteTask(${index})">Hapus</button>
        `;
        
        taskList.appendChild(taskItem);
    });
}

// Fungsi untuk menambahkan tugas baru
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = taskInput.value;
    const taskLink = linkInput.value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({ name: taskName, link: taskLink });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
    taskInput.value = ""; // Bersihkan input setelah menambahkan tugas
    linkInput.value = ""; // Bersihkan input link
});

// Fungsi untuk menghapus tugas berdasarkan indeks
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Hapus tugas pada indeks tertentu
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Event Listener untuk menghapus semua tugas
clearAllTasksBtn.addEventListener("click", () => {
    localStorage.removeItem("tasks");
    displayTasks();
});

// Tampilkan daftar tugas saat halaman pertama kali dimuat
displayTasks();
