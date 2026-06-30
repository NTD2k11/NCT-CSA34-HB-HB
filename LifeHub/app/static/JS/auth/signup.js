const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const firstname = document.getElementById("firstname").value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (
            firstname === "" ||
            lastname === "" ||
            username === "" ||
            email === "" ||
            password === ""
        ) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {

            const response = await fetch("http://127.0.0.1:5000/signup", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    firstname,
                    lastname,
                    username,
                    email,
                    password

                })

            });

            const result = await response.json();

            console.log(response.status);
            console.log(result);
            if (response.ok) {

                alert(result.message);

                window.location.href = "/LifeHub/app/templates/dashboard.html";

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error(error);

            alert("Không thể kết nối tới server.");

        }

    });

}



document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const lightBtn = document.getElementById("lightBtn");
    const darkBtn = document.getElementById("darkBtn");

    if (!lightBtn || !darkBtn) return;

    darkBtn.addEventListener("click", () => {

        body.classList.add("dark");

        localStorage.setItem("theme", "dark");

    });

    lightBtn.addEventListener("click", () => {

        body.classList.remove("dark");

        localStorage.setItem("theme", "light");

    });

});