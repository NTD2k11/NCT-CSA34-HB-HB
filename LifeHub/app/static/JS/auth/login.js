const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const username = document.getElementById("login").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {

            const response = await fetch("http://127.0.0.1:5000/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const result = await response.json();

            if (response.ok) {

                localStorage.setItem("uid", result.uid);
                localStorage.setItem("username", result.username);
                localStorage.setItem("email", result.email);

                window.location.href = "../dashboard.html";

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);
            alert("Không thể kết nối đến máy chủ.");

        }

    });

}


document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");

    if (!lightBtn || !darkBtn) {
        return;
    }

    darkBtn.addEventListener("click", () => {

        body.classList.add("dark");

        darkBtn.classList.add("active");
        lightBtn.classList.remove("active");

        localStorage.setItem("theme","dark");

    });

    lightBtn.addEventListener("click", () => {

        body.classList.remove("dark");

        lightBtn.classList.add("active");
        darkBtn.classList.remove("active");

        localStorage.setItem("theme","light");

    });

});



