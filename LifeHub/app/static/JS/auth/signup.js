
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



const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const firstnameInput = document.getElementById("firstname");
    const lastnameInput = document.getElementById("lastname");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const firstname = firstnameInput.value.trim();
        const lastname = lastnameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (
            firstname === "" ||
            lastname === "" ||
            username === "" ||
            email === "" ||
            password.length < 6
        ) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await updateProfile(user, {
                displayName: username
            });

            await set(ref(db, "users/" + user.uid), {

                uid: user.uid,

                username: username,

                email: email,

                created_at: new Date().toISOString()

            });

            alert("Đăng ký thành công!");

            window.location.href = "/LifeHub/app/templates/dashboard.html";

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





