document.addEventListener("DOMContentLoaded", () => {
    const habits = [
        { id: 1, icon: "💧", title: "Uống 2L nước", desc: "Uống đủ nước tốt cho sức khỏe", note: "Ví dụ: Uống đều trong ngày", tone: "#d8ecfb", done: true },
        { id: 2, icon: "🏃", title: "Chạy bộ 30 phút", desc: "Tăng cường sức khỏe tim mạch", note: "Hôm nay thời tiết hơi nóng 😅", tone: "#fff0c7", done: false },
        { id: 3, icon: "📖", title: "Đọc sách 20 phút", desc: "Mở rộng kiến thức mỗi ngày", note: "Cuốn sách đang đọc rất hay!", tone: "#e9ddff", done: false },
        { id: 4, icon: "🧘", title: "Thiền 10 phút", desc: "Giảm căng thẳng, tập trung hơn", note: "Thiền giúp tâm trí bình tĩnh hơn.", tone: "#dff3df", done: false },
        { id: 5, icon: "🥦", title: "Ăn rau xanh", desc: "Ít nhất 1 bữa có rau xanh", note: "Cần ăn nhiều rau hơn!", tone: "#ffd9df", done: false }
    ];

    const week = [
        { label: "T2", status: "done" },
        { label: "T3", status: "done" },
        { label: "T4", status: "done" },
        { label: "T5", status: "done" },
        { label: "T6", status: "done" },
        { label: "T7", status: "partial" },
        { label: "CN", status: "none" }
    ];

    renderWeek(week);
    renderHabits(habits);
    renderCalendar();
    bindSaveButton(habits);
    setupThemeToggle();
    updateSummary(habits);
    refreshIcons();
});

function renderWeek(days) {
    const weekStatus = document.getElementById("weekStatus");

    if (!weekStatus) {
        return;
    }

    weekStatus.innerHTML = days.map(day => `
        <div class="day-status">
            <span>${day.label}</span>
            <span class="day-dot ${day.status}">
                ${day.status === "done" ? '<i data-lucide="check"></i>' : ""}
            </span>
        </div>
    `).join("");
}

function renderHabits(habits) {
    const list = document.getElementById("checkinList");

    if (!list) {
        return;
    }

    list.innerHTML = habits.map(habit => `
        <article class="checkin-row ${habit.done ? "done" : ""}" data-id="${habit.id}">
            <div class="habit-info">
                <span class="habit-emoji" style="--tone:${habit.tone}" aria-hidden="true">${habit.icon}</span>
                <div>
                    <h3>${habit.title}</h3>
                    <p>${habit.desc}</p>
                </div>
            </div>

            <button class="status-control" type="button" aria-pressed="${habit.done}">
                <span class="check-box">${habit.done ? '<i data-lucide="check"></i>' : ""}</span>
                <span>${habit.done ? "Đã hoàn thành" : "Chưa hoàn thành"}</span>
            </button>

            <div class="note-field">
                <label for="note-${habit.id}">Ghi chú (tùy chọn)</label>
                <input id="note-${habit.id}" type="text" value="${habit.note}" aria-label="Ghi chú cho ${habit.title}">
            </div>
        </article>
    `).join("");

    list.querySelectorAll(".status-control").forEach(button => {
        button.addEventListener("click", () => {
            const row = button.closest(".checkin-row");
            const habit = habits.find(item => item.id === Number(row.dataset.id));

            habit.done = !habit.done;
            renderHabits(habits);
            updateSummary(habits);
            refreshIcons();
        });
    });
}

function renderCalendar() {
    const calendar = document.getElementById("calendarGrid");

    if (!calendar) {
        return;
    }

    const heads = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const days = [
        { value: 28, muted: true }, { value: 29, muted: true }, { value: 30, muted: true },
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 },
        { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 },
        { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }, { value: 16 }, { value: 17 }, { value: 18 },
        { value: 19 }, { value: 20 }, { value: 21 }, { value: 22 }, { value: 23, status: "done" }, { value: 24 }, { value: 25 },
        { value: 26 }, { value: 27 }, { value: 28 }, { value: 29 }, { value: 30 }, { value: 31 }, { value: 1, muted: true }
    ];

    calendar.innerHTML = [
        ...heads.map(head => `<span class="calendar-head">${head}</span>`),
        ...days.map(day => `<span class="calendar-day ${day.muted ? "muted" : ""} ${day.status || ""}">${day.value}</span>`)
    ].join("");
}

function bindSaveButton(habits) {
    const saveButton = document.getElementById("saveCheckin");

    saveButton?.addEventListener("click", () => {
        document.querySelectorAll(".checkin-row").forEach(row => {
            const habit = habits.find(item => item.id === Number(row.dataset.id));
            const input = row.querySelector("input");

            if (habit && input) {
                habit.note = input.value;
            }
        });

        saveButton.classList.add("saved");
        saveButton.querySelector("span").textContent = "Đã lưu check-in";

        window.setTimeout(() => {
            saveButton.classList.remove("saved");
            saveButton.querySelector("span").textContent = "Lưu check-in hôm nay";
        }, 1600);
    });
}

function updateSummary(habits) {
    const completeText = document.getElementById("todayComplete");
    const completeRing = document.getElementById("completeRing");
    const done = habits.filter(habit => habit.done).length;
    const percent = Math.round((done / habits.length) * 100);

    if (completeText) {
        completeText.textContent = `${done} / ${habits.length} habit`;
    }

    if (completeRing) {
        completeRing.textContent = `${percent}%`;
        completeRing.style.setProperty("--value", `${percent}%`);
    }
}

function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("lifehubHabitTheme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.body.classList.toggle("dark-mode", shouldUseDark);
    toggle?.setAttribute("aria-pressed", String(shouldUseDark));

    toggle?.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("lifehubHabitTheme", isDark ? "dark" : "light");
        toggle.setAttribute("aria-pressed", String(isDark));
        refreshIcons();
    });
}

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
