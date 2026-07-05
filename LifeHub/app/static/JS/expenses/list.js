document.addEventListener("DOMContentLoaded", () => {

    loadExpense();

});

async function loadExpense(){

    const summaries = [
        {
            title: "Tổng chi tiêu tháng",
            value: "0đ",
            note: "",
            icon: "wallet",
            color: "#53b76c",
            square: true,
            positive: true
        },
        {
            title: "Ngân sách tháng",
            value: "0đ",
            note: "",
            icon: "$",
            color: "#58a6dc"
        },
        {
            title: "Đã sử dụng",
            value: "0%",
            note: "",
            icon: "◔",
            color: "#f4a40a",
            progress: true
        },
        {
            title: "Còn lại",
            value: "0đ",
            note: "",
            icon: "▣",
            color: "#8b5cf6",
            square: true
        }
    ];

    const uid = localStorage.getItem("uid");

    try{

        const response = await fetch(
            `http://127.0.0.1:5000/expense/list/${uid}`
        );

        const result = await response.json();

        const transactions = result.expenses;

        const state = {

            query:"",
            date:"all",
            category:"all",
            type:"all"

        };

        renderSummaries(summaries);

        renderTransactions(transactions,state);

        bindFilters(transactions,state);

        setupThemeToggle();

        refreshIcons();

    }
    catch(err){

        console.log(err);

    }

}

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
        const haystack = `${item.date} ${item.category} ${item.title} ${item.method}`.toLowerCase();
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
                <td>${item.title}</td>
                <td><span class="type-badge">${item.type}</span></td>
                <td><span class="amount">${Number(item.amount).toLocaleString("vi-VN")+"đ"}</span></td>
                <td><span class="method-cell">${item.method}</span></td>
                <td>
                    <div class="row-actions">
                        <button class="action-button" onclick="editExpense(${item.expense_id})">
                            <i data-lucide="pencil"></i>
                        </button>
                        <button class="action-button delete" onclick="deleteExpense(${item.expense_id})">
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

document.querySelector(".user-menu").addEventListener("click", () => {
    window.location.href = "/LifeHub/app/templates/setting/setting.html"
})


/* =====================================
        DELETE EXPENSE
===================================== */

async function deleteExpense(id){

    const ok = confirm("Bạn có chắc muốn xóa giao dịch này?");

    if(!ok) return;

    try{

        const response = await fetch(

            `http://127.0.0.1:5000/expense/delete/${id}`,

            {

                method:"DELETE"

            }

        );

        const result = await response.json();

        alert(result.message);

        if(result.success){

            loadExpense();

        }

    }

    catch(err){

        console.log(err);

    }

}

function editExpense(id){

    window.location.href =
        `edit.html?id=${id}`;

}
























const uid = localStorage.getItem("uid");

async function loadAvatar() {

    if (!uid) return;

    try {

        const response = await fetch(`http://127.0.0.1:5000/user/${uid}`);

        const result = await response.json();

        if (!response.ok) {

            console.log(result.message);
            return;

        }

        const avatar = result.avatar || "http://127.0.0.1:5000/static/IMG/avatar.png";

        const topAvatar = document.getElementById("topAvatar");

        if (topAvatar) topAvatar.src = avatar;

    }

    catch (err) {

        console.error(err);

    }

}

loadAvatar();