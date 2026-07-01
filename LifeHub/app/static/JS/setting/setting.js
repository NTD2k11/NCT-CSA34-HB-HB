/* =====================================
            CHECK LOGIN
===================================== */

const uid = localStorage.getItem("uid");

if (!uid) {

    window.location.href = "../auth/login.html";

}


/* =====================================
            LOAD USER
===================================== */

async function loadUser() {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/setting/${uid}`
        );

        const result = await response.json();
        console.log(result);
        console.log(result.avatar);

        if (!result.success) {

            alert(result.message);

            return;

        }

        // ================= PROFILE =================

        document.getElementById("fullname").value =
            result.firstname + " " + result.lastname;

        document.getElementById("username").value =
            result.username;

        document.getElementById("email").value =
            result.email;

        document.getElementById("topUsername").innerHTML =
            "Xin chào, " + result.username;

        // Avatar

        if (result.avatar && result.avatar !== "") {

            document.getElementById("avatarImg").src =
                result.avatar;

            document.getElementById("topAvatar").src =
                result.avatar;

        }

        // ================= ACCOUNT =================

        document.getElementById("createdAt").innerHTML =
            result.created_at;

        document.getElementById("habitCount").innerHTML =
            result.habit;

        document.getElementById("mealCount").innerHTML =
            result.meal;

        document.getElementById("expenseCount").innerHTML =
            result.expense;

    }

    catch (err) {

        console.log(err);

        alert("Không thể kết nối tới server.");

    }

}

loadUser();


/* =====================================
        UPDATE PROFILE
===================================== */

const saveBtn = document.getElementById("saveBtn");

if (saveBtn) {

    saveBtn.onclick = async function () {

        const fullname =
            document.getElementById("fullname").value.trim();

        const username =
            document.getElementById("username").value.trim();

        const arr = fullname.split(" ");

        const lastname = arr[0];

        const firstname = arr.slice(1).join(" ");

        try {

            const response = await fetch(
                "http://127.0.0.1:5000/update-profile",
                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        uid,

                        firstname,

                        lastname,

                        username

                    })

                }

            );

            const result = await response.json();

            alert(result.message);

            if (result.success) {

                loadUser();

            }

        }

        catch (err) {

            console.log(err);

        }

    }

}


/* =====================================
        CHANGE AVATAR
===================================== */

const avatarBtn =
    document.getElementById("changeAvatarBtn");

if (avatarBtn) {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = "image/*";

    input.hidden = true;

    document.body.appendChild(input);

    avatarBtn.onclick = function () {

        input.click();

    }

    input.onchange = async function () {

        const file = input.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("uid", uid);

        formData.append("avatar", file);

        try {

            const response = await fetch(

                "http://127.0.0.1:5000/upload-avatar",

                {

                    method: "POST",

                    body: formData

                }

            );

            const result = await response.json();

            if (result.success) {

                document.getElementById("avatarImg").src =
                    result.avatar;

                document.getElementById("topAvatar").src =
                    result.avatar;

                alert(result.message);

            }

            else {

                alert(result.message);

            }

        }

        catch (err) {

            console.log(err);

        }

    }

}


/* =====================================
        DARK / LIGHT MODE
===================================== */

const body = document.body;

const lightBtn = document.getElementById("lightBtn");

const darkBtn = document.getElementById("darkBtn");

function setTheme(theme) {

    if (theme === "dark") {

        body.classList.add("dark");

        darkBtn.classList.add("active");

        lightBtn.classList.remove("active");

    }

    else {

        body.classList.remove("dark");

        lightBtn.classList.add("active");

        darkBtn.classList.remove("active");

    }

    localStorage.setItem("theme", theme);

}

setTheme(localStorage.getItem("theme") || "light");

lightBtn.onclick = () => setTheme("light");

darkBtn.onclick = () => setTheme("dark");

document.getElementById("lightMode").onclick =
() => setTheme("light");

document.getElementById("darkMode").onclick =
() => setTheme("dark");


/* =====================================
        FONT SIZE
===================================== */

document
.querySelectorAll(".font-size button")
.forEach(btn => {

    btn.onclick = function () {

        document
        .querySelectorAll(".font-size button")
        .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

    }

});


/* =====================================
        SWITCH
===================================== */

document
.querySelectorAll(".switch input")
.forEach(sw => {

    sw.onchange = function () {

        console.log(sw.checked);

    }

});


/* =====================================
        LOGOUT
===================================== */

const logout = document.querySelector(".logout-btn");

logout.onclick = function () {

    if (confirm("Bạn có muốn đăng xuất không?")) {

        localStorage.removeItem("uid");

        window.location.href =
            "../auth/login.html";

    }

}


/* =====================================
        HELP
===================================== */

document.querySelector(".help-btn").onclick =
function () {

    alert("support@lifehub.com");

};


/* =====================================
        CARD EFFECT
===================================== */

document
.querySelectorAll(".card")
.forEach(card => {

    card.onmouseenter = () => {

        card.style.transform =
            "translateY(-5px)";

    };

    card.onmouseleave = () => {

        card.style.transform =
            "translateY(0px)";

    };

});