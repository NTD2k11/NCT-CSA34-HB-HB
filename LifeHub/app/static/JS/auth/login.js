
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXfosrg54KjZFuq-RJKBMECeyI-eBZd_U",
  authDomain: "spck-hb-hb.firebaseapp.com",
  databaseURL: "https://spck-hb-hb-default-rtdb.firebaseio.com",
  projectId: "spck-hb-hb",
  storageBucket: "spck-hb-hb.firebasestorage.app",
  messagingSenderId: "246875656236",
  appId: "1:246875656236:web:c0e09630b7a33e96444189",
  measurementId: "G-MXJ4N1T1W6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);





const loginForm = document.getElementById("loginForm");

if (loginForm) {

    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        let login = loginInput.value.trim();
        const password = passwordInput.value;

        if (login === "" || password === "") {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {

            // Nếu người dùng nhập username
            if (!login.includes("@")) {

                const snapshot = await get(ref(db, "users"));

                if (!snapshot.exists()) {
                    throw new Error("Không tìm thấy người dùng!");
                }

                let foundEmail = null;

                snapshot.forEach((child) => {

                    if (child.val().username === login) {
                        foundEmail = child.val().email;
                    }

                });

                if (!foundEmail) {
                    throw new Error("Username không tồn tại!");
                }

                login = foundEmail;
            }

            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    login,
                    password
                );

            alert("Đăng nhập thành công!");

            window.location.href =
                "/LifeHub/app/templates/dashboard.html";

        }

        catch (error) {

            alert(error.message);

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



onAuthStateChanged(auth, (user) => {

    if (user) {

        if (
            window.location.pathname.includes("login.html") ||
            window.location.pathname.includes("signup.html")
        ) {

            window.location.href = "/LifeHub/app/templates/dashboard.html";

        }

    }

});