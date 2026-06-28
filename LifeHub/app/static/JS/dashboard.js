document.addEventListener("DOMContentLoaded", () => {
    const metrics = [
        {
            title: "Current Streak",
            value: "12",
            suffix: "days",
            note: "Keep it up!",
            icon: "flame",
            tone: "green",
            sparkline: true
        },
        {
            title: "Habits Completed",
            value: "4 / 6",
            note: "Today",
            icon: "check",
            tone: "hot",
            progress: 67
        },
        {
            title: "Meals Logged",
            value: "2 / 3",
            note: "Today",
            icon: "utensils",
            tone: "orange",
            progress: 72
        },
        {
            title: "Expenses Today",
            value: "120,000d",
            note: "Under budget",
            icon: "wallet-cards",
            tone: "green",
            progress: 70
        }
    ];

    const meals = [
        { time: "07:30 AM", type: "Breakfast", name: "Oatmeal with Fruits", calories: "350 kcal", done: true },
        { time: "12:30 PM", type: "Lunch", name: "Grilled Chicken Salad", calories: "450 kcal", done: true },
        { time: "06:30 PM", type: "Dinner", name: "Salmon with Quinoa", calories: "550 kcal", done: false },
        { time: "09:00 PM", type: "Snack", name: "Greek Yogurt with Nuts", calories: "200 kcal", done: false }
    ];

    const habits = [
        { icon: "droplet", name: "Drink 2L of Water", streak: 12, done: 6, color: "green" },
        { icon: "dumbbell", name: "Workout 30 Minutes", streak: 7, done: 5, color: "green" },
        { icon: "book-open", name: "Read 10 Pages", streak: 4, done: 4, color: "green" },
        { icon: "flower-2", name: "Meditate 10 Minutes", streak: 3, done: 5, color: "hot" },
        { icon: "moon", name: "Go to Bed Before 11PM", streak: 6, done: 6, color: "orange" },
        { icon: "pill", name: "Take Vitamins", streak: 9, done: 4, color: "green" }
    ];

    const expenses = [
        { label: "Food & Drink", value: "1,200,000d", percent: 49, color: "#237a49" },
        { label: "Transport", value: "600,000d", percent: 24, color: "#ff5825" },
        { label: "Shopping", value: "400,000d", percent: 16, color: "#ff9f16" },
        { label: "Entertainment", value: "250,000d", percent: 11, color: "#c7c8c5" }
    ];

    const upcoming = [
        { icon: "calendar-days", title: "Meal Prep", time: "May 18, 2025 - 10:00 AM", tag: "Meal", tone: "green" },
        { icon: "circle-check", title: "Weekly Review", time: "May 19, 2025 - 08:00 PM", tag: "Habit", tone: "green" },
        { icon: "wallet-cards", title: "Budget Planning", time: "May 20, 2025 - 09:00 AM", tag: "Expense", tone: "orange" }
    ];

    const quickActions = [
        { icon: "utensils", label: "Log Meal", tone: "green" },
        { icon: "circle-plus", label: "Add Habit", tone: "green" },
        { icon: "wallet-cards", label: "Add Expense", tone: "orange" },
        { icon: "notebook-text", label: "Add Note", tone: "dark" }
    ];

    renderMetrics(metrics);
    renderMeals(meals);
    renderHabits(habits);
    renderExpenseLegend(expenses);
    renderUpcoming(upcoming);
    renderQuickActions(quickActions);
    drawExpenseChart(expenses);
    drawWeeklyChart();

    if (window.lucide) {
        window.lucide.createIcons();
    }
});

function renderMetrics(metrics) {
    const grid = document.getElementById("metricsGrid");

    grid.innerHTML = metrics.map((metric, index) => {
        const toneClass = metric.tone === "green" ? "" : metric.tone;
        const sparkline = metric.sparkline
            ? '<canvas class="sparkline" id="streakSparkline" width="360" height="70"></canvas>'
            : `<div class="progress-track"><div class="progress-fill ${toneClass}" style="--value:${metric.progress}%"></div></div>`;

        return `
            <article class="metric-card ${index === 0 ? "wide" : ""}">
                <div class="metric-icon ${toneClass}">
                    <i data-lucide="${metric.icon}"></i>
                </div>
                <div>
                    <h2>${metric.title}</h2>
                    <div class="metric-value">${metric.value}${metric.suffix ? ` <span>${metric.suffix}</span>` : ""}</div>
                    <span class="metric-note">${metric.note}</span>
                    ${sparkline}
                </div>
            </article>
        `;
    }).join("");

    requestAnimationFrame(drawSparkline);
}

function renderMeals(meals) {
    const list = document.getElementById("mealList");

    list.innerHTML = meals.map(meal => `
        <div class="meal-item">
            <span class="meal-time">${meal.time}</span>
            <div class="meal-thumb"></div>
            <div class="meal-info">
                <span>${meal.type}</span>
                <strong>${meal.name}</strong>
                <small>${meal.calories}</small>
            </div>
            <span class="meal-status ${meal.done ? "done" : ""}">
                ${meal.done ? '<i data-lucide="check"></i>' : ""}
            </span>
        </div>
    `).join("");
}

function renderHabits(habits) {
    const list = document.getElementById("habitList");

    list.innerHTML = habits.map(habit => {
        const dots = Array.from({ length: 7 }, (_, index) => {
            const filled = index < habit.done;
            return `<span class="dot ${filled ? `fill ${habit.color}` : ""}"></span>`;
        }).join("");

        const iconTone = habit.color === "green" ? "" : habit.color;

        return `
            <div class="habit-item">
                <div class="habit-name">
                    <span class="habit-icon ${iconTone}"><i data-lucide="${habit.icon}"></i></span>
                    <span>${habit.name}</span>
                </div>
                <div class="habit-dots">${dots}</div>
                <div class="habit-streak"><span>${habit.streak}</span><i data-lucide="flame"></i></div>
            </div>
        `;
    }).join("");
}

function renderExpenseLegend(expenses) {
    const legend = document.getElementById("expenseLegend");

    legend.innerHTML = expenses.map(item => `
        <div class="legend-row">
            <span class="legend-dot" style="background:${item.color}"></span>
            <div class="legend-label">
                <strong>${item.label}</strong>
                <span>${item.value}</span>
            </div>
            <span>${item.percent}%</span>
        </div>
    `).join("");
}

function renderUpcoming(items) {
    const list = document.getElementById("upcomingList");

    list.innerHTML = items.map(item => `
        <div class="upcoming-item">
            <span class="upcoming-icon ${item.tone === "orange" ? "orange" : ""}">
                <i data-lucide="${item.icon}"></i>
            </span>
            <div class="upcoming-body">
                <strong>${item.title}</strong>
                <span>${item.time}</span>
            </div>
            <span class="tag ${item.tone === "orange" ? "orange" : ""}">${item.tag}</span>
        </div>
    `).join("");
}

function renderQuickActions(actions) {
    const grid = document.getElementById("quickGrid");

    grid.innerHTML = actions.map(action => `
        <button class="quick-action ${action.tone}" type="button">
            <i data-lucide="${action.icon}"></i>
            <span>${action.label}</span>
        </button>
    `).join("");
}

function drawSparkline() {
    const canvas = document.getElementById("streakSparkline");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");
    const values = [20,22,18,24,38,40,52,61,54,46,55,58,72];
    drawLine(ctx, canvas.width, canvas.height, values, {
        color: "#237a49",
        fill: "rgba(35,122,73,.08)",
        padding: 8,
        points: false
    });
}

function drawWeeklyChart() {
    const canvas = document.getElementById("weeklyChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    const height = canvas.height = 170 * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const cssWidth = width / window.devicePixelRatio;
    const cssHeight = height / window.devicePixelRatio;
    const padding = { top: 12, right: 12, bottom: 24, left: 32 };
    const values = [4200, 8200, 6100, 11800, 8200, 6800, 10600];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const max = 15000;
    const plotWidth = cssWidth - padding.left - padding.right;
    const plotHeight = cssHeight - padding.top - padding.bottom;

    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.strokeStyle = "#e4e7e2";
    ctx.lineWidth = 1;
    ctx.font = "11px Inter, Arial";
    ctx.fillStyle = "#68737d";

    [0, 5000, 10000, 15000].forEach(value => {
        const y = padding.top + plotHeight - (value / max) * plotHeight;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(cssWidth - padding.right, y);
        ctx.stroke();
        ctx.fillText(value === 0 ? "0" : `${value / 1000}k`, 2, y + 4);
    });

    const points = values.map((value, index) => ({
        x: padding.left + (plotWidth / (values.length - 1)) * index,
        y: padding.top + plotHeight - (value / max) * plotHeight
    }));

    ctx.strokeStyle = "#237a49";
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();

    points.forEach((point, index) => {
        ctx.fillStyle = "#237a49";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#68737d";
        ctx.fillText(labels[index], point.x - 10, cssHeight - 5);
    });
}

function drawExpenseChart(expenses) {
    const canvas = document.getElementById("expenseChart");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const center = width / 2;
    const radius = 96;
    const innerRadius = 54;
    let start = -Math.PI / 2;

    ctx.clearRect(0, 0, width, height);

    expenses.forEach(item => {
        const angle = Math.PI * 2 * (item.percent / 100);
        ctx.beginPath();
        ctx.arc(center, center, radius, start, start + angle);
        ctx.arc(center, center, innerRadius, start + angle, start, true);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        start += angle;
    });

    ctx.beginPath();
    ctx.arc(center, center, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
}

function drawLine(ctx, width, height, values, options) {
    const padding = options.padding || 0;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const points = values.map((value, index) => ({
        x: padding + ((width - padding * 2) / (values.length - 1)) * index,
        y: padding + (height - padding * 2) - ((value - min) / range) * (height - padding * 2)
    }));

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.strokeStyle = options.color;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
}
