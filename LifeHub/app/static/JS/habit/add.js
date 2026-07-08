// ==========================================
// CONFIG
// ==========================================

const API_URL = "http://127.0.0.1:5000";

const uid = localStorage.getItem("uid");

// ==========================================
// LOAD USER
// ==========================================

async function loadUser() {

    if (!uid) {

        window.location.href = "../login.html";

        return;
    }

    try {

        const response = await fetch(`${API_URL}/user/${uid}`);

        const result = await response.json();

        if (result.success) {

            if (result.avatar) {

                document.getElementById("topAvatar").src =
                    result.avatar;

            }

            document.querySelector(".user span").innerHTML =
                `Xin chào, ${result.firstname}`;

        }

    }

    catch (err) {

        console.log(err);

    }

}

loadUser();


// ==========================================
// DARK MODE
// ==========================================

const lightBtn = document.getElementById("lightBtn");

const darkBtn = document.getElementById("darkBtn");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

}

lightBtn.onclick = function () {

    document.body.classList.remove("dark");

    localStorage.setItem("theme", "light");

}

darkBtn.onclick = function () {

    document.body.classList.add("dark");

    localStorage.setItem("theme", "dark");

}


// ==========================================
// TODAY
// ==========================================

const today = new Date().toISOString().split("T")[0];

document.getElementById("startDate").value = today;


// ==========================================
// CHARACTER COUNT
// ==========================================

const habitName = document.getElementById("habitName");

const note = document.getElementById("note");

habitName.addEventListener("input", function () {

    document.getElementById("habitCount").innerHTML =
        this.value.length;

});

note.addEventListener("input", function () {

    document.getElementById("noteCount").innerHTML =
        this.value.length;

});


// ==========================================
// ICON UPLOAD
// ==========================================

const uploadBox = document.getElementById("uploadBox");

const fileInput = document.getElementById("icon");

uploadBox.onclick = function () {

    fileInput.click();

}

fileInput.onchange = function () {

    const file = this.files[0];

    if (!file) return;

    document.getElementById("fileName").innerHTML =
        file.name;

}









const category = document.getElementById("category");
const goal = document.getElementById("goal");
const unit = document.getElementById("unit");
const frequency = document.getElementById("frequency");
const startDate = document.getElementById("startDate");
const color = document.getElementById("color");

function updatePreview() {

    document.getElementById("previewName").innerHTML =
        habitName.value.trim() || "Tên thói quen";

    document.getElementById("previewGoal").innerHTML =
        (goal.value || "0") + " " + unit.value;

    document.getElementById("previewFrequency").innerHTML =
        frequency.value;

    document.getElementById("previewDate").innerHTML =
        startDate.value || "Chưa chọn";

    document.querySelector(".habit-icon").style.background =
        color.value + "30";

    document.querySelector(".habit-icon").style.color =
        color.value;

    const icon = category.value.substring(0, 2);

    document.querySelector(".habit-icon").innerHTML = icon;

}

habitName.addEventListener("input", updatePreview);
goal.addEventListener("input", updatePreview);
unit.addEventListener("change", updatePreview);
frequency.addEventListener("change", updatePreview);
startDate.addEventListener("change", updatePreview);
category.addEventListener("change", updatePreview);
color.addEventListener("input", updatePreview);

updatePreview();


// ==========================================
// SUBMIT
// ==========================================

const form = document.querySelector(".habit-form");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (habitName.value.trim() === "") {

        alert("Vui lòng nhập tên thói quen.");

        habitName.focus();

        return;

    }

    if (goal.value === "" || Number(goal.value) <= 0) {

        alert("Mục tiêu phải lớn hơn 0.");

        goal.focus();

        return;

    }

    const habit = {

        uid: Number(uid),

        habit_name: habitName.value.trim(),

        category: category.value,

        goal: Number(goal.value),

        unit: unit.value,

        frequency: frequency.value,

        start_date: startDate.value,

        color: color.value,

        note: note.value.trim()

    };

    console.log(habit);

    try {

        const response = await fetch(

            `${API_URL}/habit/add`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(habit)

            }

        );

        const result = await response.json();

        if (result.success) {

            alert("Đã thêm thói quen thành công.");

            window.location.href = "list.html";

        }

        else {

            alert(result.message);

        }

    }

    catch (err) {

        console.log(err);

        alert("Không thể kết nối tới máy chủ.");

    }

});


// ==========================================
// CANCEL
// ==========================================

document.querySelector(".cancel-btn").onclick = function () {

    if (confirm("Bạn có muốn hủy không?")) {

        window.location.href = "/LifeHub/app/templates/habit/list.html";

    }

};