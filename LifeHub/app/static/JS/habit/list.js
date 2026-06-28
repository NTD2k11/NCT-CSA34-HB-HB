document.addEventListener("DOMContentLoaded", () => {
    const habits = [
        {
            icon: "💧",
            title: "Uống 2L nước",
            desc: "Uống đủ nước tốt cho sức khỏe",
            streak: 12,
            progress: 100,
            tone: "#d8ecfb",
            complete: true
        },
        {
            icon: "🏃",
            title: "Chạy bộ 30 phút",
            desc: "Tăng cường sức khỏe tim mạch",
            streak: 5,
            progress: 60,
            tone: "#fff0c7",
            complete: false
        },
        {
            icon: "📖",
            title: "Đọc sách 20 phút",
            desc: "Mở rộng kiến thức mỗi ngày",
            streak: 8,
            progress: 80,
            tone: "#e9ddff",
            complete: false
        },
        {
            icon: "🧘",
            title: "Thiền 10 phút",
            desc: "Giảm căng thẳng, tập trung hơn",
            streak: 3,
            progress: 40,
            tone: "#dff3df",
            complete: false
        },
        {
            icon: "🥦",
            title: "Ăn rau xanh",
            desc: "Ít nhất 1 bữa có rau xanh",
            streak: 1,
            progress: 20,
            tone: "#ffd9df",
            complete: false
        }
    ];

    const stats = [
        { icon: "🔥", title: "Streak hiện tại", value: "12 ngày", note: "Tuyệt vời! 🔥" },
        { icon: "🎯", title: "Hoàn thành hôm nay", value: "4 / 5", note: "80%" },
        { icon: "🗓️", title: "Tổng habits", value: "5", note: "Đang theo dõi" },
        { icon: "📈", title: "Tỷ lệ hoàn thành tuần", value: "76%", note: "Cao hơn tuần trước 12% ↗", positive: true }
    ];

    const state = {
        query: "",
        filter: "all"
    };

    renderStats(stats);
    renderHabits(habits, state);
    bindFilters(habits, state);
    setupThemeToggle();
    refreshIcons();
});

function renderStats(stats) {
    const grid = document.getElementById("statsGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = stats.map(item => `
        <article class="stat-card">
            <div class="stat-icon" aria-hidden="true">${item.icon}</div>
            <div>
                <h2>${item.title}</h2>
                <strong class="stat-value">${item.value}</strong>
                <span class="stat-note ${item.positive ? "positive" : ""}">${item.note}</span>
            </div>
        </article>
    `).join("");
}

function bindFilters(habits, state) {
    const search = document.getElementById("habitSearch");
    const filter = document.getElementById("habitFilter");

    search?.addEventListener("input", event => {
        state.query = event.target.value.trim().toLowerCase();
        renderHabits(habits, state);
        refreshIcons();
    });

    filter?.addEventListener("change", event => {
        state.filter = event.target.value;
        renderHabits(habits, state);
        refreshIcons();
    });
}

function renderHabits(habits, state) {
    const list = document.getElementById("habitList");
    const count = document.getElementById("habitCount");

    if (!list) {
        return;
    }

    const filteredHabits = habits.filter(habit => {
        const matchesQuery = `${habit.title} ${habit.desc}`.toLowerCase().includes(state.query);
        const matchesFilter = state.filter === "all"
            || (state.filter === "complete" && habit.complete)
            || (state.filter === "progress" && !habit.complete);

        return matchesQuery && matchesFilter;
    });

    if (!filteredHabits.length) {
        list.innerHTML = '<div class="empty-state">Không tìm thấy habit phù hợp.</div>';
    } else {
        list.innerHTML = filteredHabits.map(habit => `
            <article class="habit-row">
                <div class="habit-info">
                    <span class="habit-emoji" style="--tone:${habit.tone}" aria-hidden="true">${habit.icon}</span>
                    <div>
                        <div class="habit-title">
                            <h3>${habit.title}</h3>
                            <span class="tag">Daily</span>
                        </div>
                        <p>${habit.desc}</p>
                    </div>
                </div>

                <div class="progress-area">
                    <div class="progress-wrap">
                        <div class="progress-track">
                            <div class="progress-fill" style="--progress:${habit.progress}%"></div>
                        </div>
                        <span class="progress-value">${habit.progress}%</span>
                    </div>
                    <div class="streak">Streak: ${habit.streak} ngày ${habit.streak > 3 ? "🔥" : ""}</div>
                </div>

                <button class="check-button" type="button">Check-in</button>
                <button class="action-button" type="button" aria-label="Sửa ${habit.title}">
                    <i data-lucide="pencil"></i>
                </button>
                <button class="action-button delete" type="button" aria-label="Xóa ${habit.title}">
                    <i data-lucide="trash-2"></i>
                </button>
            </article>
        `).join("");
    }

    if (count) {
        const total = habits.length;
        const shown = filteredHabits.length;
        count.textContent = shown
            ? `Hiển thị 1 - ${shown} trong ${total} habit`
            : `Hiển thị 0 trong ${total} habit`;
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
