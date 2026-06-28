document.addEventListener("DOMContentLoaded", () => {
    const summaries = [
        { title: "Tổng chi tiêu tháng 6", value: "5.400.000đ", note: "↓ 12% so với tháng trước", icon: "wallet", color: "#53b76c", square: true, positive: true },
        { title: "Ngân sách tháng", value: "8.000.000đ", note: "Cập nhật: 01/06/2025", icon: "$", color: "#58a6dc" },
        { title: "Đã sử dụng", value: "67%", note: "5.400.000đ / 8.000.000đ", icon: "◔", color: "#f4a40a", progress: true },
        { title: "Còn lại", value: "2.600.000đ", note: "", icon: "▣", color: "#8b5cf6", square: true }
    ];

    const transactions = [
        { date: "20/06/2025", time: "12:30", category: "Ăn uống", icon: "🍴", color: "#f59e0b", desc: "Bữa trưa với bạn bè", type: "Chi tiêu", amount: "250.000đ", method: "💵 Tiền mặt" },
        { date: "20/06/2025", time: "08:15", category: "Đi lại", icon: "🚗", color: "#58a6dc", desc: "Xăng xe", type: "Chi tiêu", amount: "150.000đ", method: "💳 Thẻ ATM" },
        { date: "19/06/2025", time: "19:45", category: "Mua sắm", icon: "🛒", color: "#61bd50", desc: "Mua quần áo", type: "Chi tiêu", amount: "1.250.000đ", method: "💳 Thẻ tín dụng" },
        { date: "19/06/2025", time: "07:30", category: "Học tập", icon: "🎓", color: "#8b5cf6", desc: "Sách tham khảo", type: "Chi tiêu", amount: "300.000đ", method: "💵 Tiền mặt" },
        { date: "18/06/2025", time: "18:20", category: "Nhà ở", icon: "🏠", color: "#ef5b78", desc: "Tiền điện", type: "Chi tiêu", amount: "850.000đ", method: "🏦 Chuyển khoản" },
        { date: "18/06/2025", time: "12:10", category: "Giải trí", icon: "🌟", color: "#f7bf3d", desc: "Xem phim", type: "Chi tiêu", amount: "120.000đ", method: "💵 Tiền mặt" },
        { date: "17/06/2025", time: "09:00", category: "Sức khỏe", icon: "✚", color: "#2bb7a1", desc: "Mua thuốc", type: "Chi tiêu", amount: "200.000đ", method: "💳 Thẻ ATM" }
    ];

    const state = {
        query: "",
        date: "all",
        category: "all",
        type: "all"
    };

    renderSummaries(summaries);
    renderTransactions(transactions, state);
    bindFilters(transactions, state);
    setupThemeToggle();
    refreshIcons();
});

function renderSummaries(summaries) {
    const grid = document.getElementById("summaryGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = summaries.map(item => `
        <article class="summary-card">
            <span class="summary-icon ${item.square ? "square" : ""}" style="--icon:${item.color}" aria-hidden="true">${item.icon}</span>
            <h2>${item.title}</h2>
            <strong>${item.value}</strong>
            ${item.progress ? '<div class="budget-progress"><span></span></div>' : ""}
            ${item.note ? `<p><span class="${item.positive ? "positive" : ""}">${item.note.split(" ")[0]}</span>${item.positive ? item.note.replace(item.note.split(" ")[0], "") : item.note}</p>` : ""}
        </article>
    `).join("");
}

function bindFilters(transactions, state) {
    const search = document.getElementById("expenseSearch");
    const month = document.getElementById("monthFilter");
    const category = document.getElementById("categoryFilter");
    const type = document.getElementById("typeFilter");

    search?.addEventListener("input", event => {
        state.query = event.target.value.trim().toLowerCase();
        renderTransactions(transactions, state);
        refreshIcons();
    });

    month?.addEventListener("change", event => {
        state.date = event.target.value;
        renderTransactions(transactions, state);
        refreshIcons();
    });

    category?.addEventListener("change", event => {
        state.category = event.target.value;
        renderTransactions(transactions, state);
        refreshIcons();
    });

    type?.addEventListener("change", event => {
        state.type = event.target.value;
        renderTransactions(transactions, state);
        refreshIcons();
    });
}

function renderTransactions(transactions, state) {
    const table = document.getElementById("transactionTable");
    const count = document.getElementById("transactionCount");

    if (!table) {
        return;
    }

    const filtered = transactions.filter(item => {
        const haystack = `${item.date} ${item.category} ${item.desc} ${item.method}`.toLowerCase();
        const matchesQuery = haystack.includes(state.query);
        const matchesDate = state.date === "all" || item.date === state.date;
        const matchesCategory = state.category === "all" || item.category === state.category;
        const matchesType = state.type === "all" || item.type === state.type;

        return matchesQuery && matchesDate && matchesCategory && matchesType;
    });

    if (!filtered.length) {
        table.innerHTML = '<tr><td class="empty-row" colspan="7">Không tìm thấy giao dịch phù hợp.</td></tr>';
    } else {
        table.innerHTML = filtered.map(item => `
            <tr>
                <td class="date-cell">
                    <strong>${item.date}</strong>
                    <span>${item.time}</span>
                </td>
                <td>
                    <div class="category-cell">
                        <span class="category-icon" style="--color:${item.color}" aria-hidden="true">${item.icon}</span>
                        <span>${item.category}</span>
                    </div>
                </td>
                <td>${item.desc}</td>
                <td><span class="type-badge">${item.type}</span></td>
                <td><span class="amount">${item.amount}</span></td>
                <td><span class="method-cell">${item.method}</span></td>
                <td>
                    <div class="row-actions">
                        <button class="action-button" type="button" aria-label="Sửa ${item.desc}">
                            <i data-lucide="pencil"></i>
                        </button>
                        <button class="action-button delete" type="button" aria-label="Xóa ${item.desc}">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join("");
    }

    if (count) {
        count.textContent = filtered.length
            ? `Hiển thị 1 - ${filtered.length} trong 24 giao dịch`
            : "Hiển thị 0 trong 24 giao dịch";
    }
}

function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("lifehubExpenseTheme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.body.classList.toggle("dark-mode", shouldUseDark);
    toggle?.setAttribute("aria-pressed", String(shouldUseDark));

    toggle?.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("lifehubExpenseTheme", isDark ? "dark" : "light");
        toggle.setAttribute("aria-pressed", String(isDark));
        refreshIcons();
    });
}

function refreshIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
