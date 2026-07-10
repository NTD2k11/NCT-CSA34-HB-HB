// =====================================================
// CONFIG
// =====================================================

const API = "http://127.0.0.1:5000";

const uid = localStorage.getItem("uid");

const habitList = document.getElementById("habitList");

const habitCount = document.getElementById("habitCount");

const totalHabit = document.getElementById("totalHabit");

const completedToday = document.getElementById("completedToday");

const bestStreak = document.getElementById("bestStreak");

const successRate = document.getElementById("successRate");

const searchInput = document.getElementById("habitSearch");

const filterSelect = document.getElementById("habitFilter");

let habits = [];

let currentHabit = null;



// =====================================================
// TODAY
// =====================================================

const today = new Date();

document.getElementById("todayDate").innerHTML =
today.toLocaleDateString("vi-VN",{

    weekday:"long",

    day:"2-digit",

    month:"long",

    year:"numeric"

});






// =====================================================
// LOAD USER
// =====================================================

async function loadUser(){

    if(!uid) return;

    const response = await fetch(`${API}/user/${uid}`);

    const result = await response.json();

    if(result.success){

        document.getElementById("topAvatar").src=result.avatar;

        document.getElementById("username").innerHTML=result.firstname;

    }

}

loadUser();




// =====================================================
// LOAD HABIT
// =====================================================

async function loadHabit(){

    const response=await fetch(

        `${API}/habit/list/${uid}`

    );

    const result=await response.json();

    if(result.success){

        habits=result.habits;

        renderHabit(habits);

    }

}

loadHabit();








function renderHabit(data){

    habitList.innerHTML="";

    if(data.length===0){

        habitList.innerHTML=`

        <div class="empty-state">

            <i data-lucide="sprout"></i>

            <h3>

                Chưa có Habit

            </h3>

            <p>

                Hãy thêm Habit đầu tiên.

            </p>

        </div>

        `;

        lucide.createIcons();

        return;

    }

    data.forEach(habit=>{

        const progress = Number(habit.progress || 0);

        const goal = Number(habit.goal || 1);

        let percent = Math.round(progress*100/goal);

        if(percent>100) percent=100;

        habitList.innerHTML+=`

<div class="habit-card">

<div class="habit-top">

<div class="habit-left">

<div

class="habit-icon"

style="background:${habit.color}20"

>

${habit.icon}

</div>

<div>

<h3>

${habit.habit_name}

</h3>

<span class="habit-category">

${habit.category}

</span>

</div>

</div>

<div class="habit-right">

🔥 ${habit.streak}

</div>

</div>

<div class="habit-info">

<div>

<i data-lucide="target"></i>

${habit.goal} ${habit.unit}

</div>

<div>

<i data-lucide="repeat"></i>

${habit.frequency}

</div>

<div>

<i data-lucide="calendar-days"></i>

${habit.start_date}

</div>

</div>

<div class="progress-box">

<div class="progress-header">

<span>

Tiến độ

</span>

<span>

${habit.progress}/${habit.goal}

${habit.unit}

</span>

</div>

<div class="progress-bar">

<div

class="progress-fill"

style="width:${percent}%"

>

</div>

</div>

</div>

<div class="habit-status

${habit.completed?'success':'pending'}">

<i

data-lucide="${
habit.completed
?

'circle-check-big'

:

'clock-3'

}">

</i>

${habit.completed

?

'Đã hoàn thành'

:

'Chưa hoàn thành'

}

</div>

<div class="habit-actions">

<button

class="check-btn"

onclick="openCheckin(${habit.habit_id})"

>

<i data-lucide="check"></i>

Check In

</button>

<button

class="edit-btn"

onclick="editHabit(${habit.habit_id})"

>

<i data-lucide="square-pen"></i>

Edit

</button>

<button

class="delete-btn"

onclick="deleteHabit(${habit.habit_id})"

>

<i data-lucide="trash-2"></i>

Delete

</button>

</div>

</div>

`;

    });

    lucide.createIcons();

    updateStats(data);

}






// =====================================================
// UPDATE STATS
// =====================================================

function updateStats(data){

    totalHabit.innerHTML = data.length;

    let completed = 0;

    let streak = 0;

    let rate = 0;

    data.forEach(habit=>{

        if(habit.completed){

            completed++;

        }

        if(habit.streak > streak){

            streak = habit.streak;

        }

        rate += habit.goal == 0

            ? 0

            : (habit.progress / habit.goal);

    });

    completedToday.innerHTML = completed;

    bestStreak.innerHTML = streak + " 🔥";

    successRate.innerHTML =

        data.length

        ?

        Math.round(rate / data.length *100) + "%"

        :

        "0%";

    habitCount.innerHTML=

        "Tổng cộng " +

        data.length +

        " Habit";

}






// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener("input",()=>{

    const keyword =

    searchInput.value

    .toLowerCase()

    .trim();

    const result = habits.filter(habit=>{

        return habit.habit_name

        .toLowerCase()

        .includes(keyword);

    });

    renderHabit(result);

});






// =====================================================
// FILTER
// =====================================================

filterSelect.addEventListener(

"change",

()=>{

    const value = filterSelect.value;

    let result=[...habits];

    if(value==="daily"){

        result=result.filter(

        h=>h.frequency==="Daily"

        );

    }

    if(value==="weekly"){

        result=result.filter(

        h=>h.frequency==="Weekly"

        );

    }

    if(value==="monthly"){

        result=result.filter(

        h=>h.frequency==="Monthly"

        );

    }

    if(value==="complete"){

        result=result.filter(

        h=>h.completed

        );

    }

    if(value==="progress"){

        result=result.filter(

        h=>!h.completed

        );

    }

    renderHabit(result);

});








// =====================================================
// ADD
// =====================================================

document

.getElementById("addHabit")

.onclick=function(){

    location.href="add.html";

};






// =====================================================
// EDIT
// =====================================================

function editHabit(id){

    location.href=

    "edit.html?id="+id;

}










// =====================================================
// DELETE
// =====================================================

let deleteID = null;

function deleteHabit(id){

    deleteID = id;

    document

    .getElementById("deleteModal")

    .classList

    .add("active");

}



document.querySelectorAll(".cancel-btn").forEach(btn=>{

    btn.onclick=function(){

        document

        .querySelectorAll(".modal")

        .forEach(modal=>{

            modal.classList.remove("active");

        });

    };

});






document

.querySelector(".delete-confirm")

.onclick = async function(){

    const response = await fetch(

        API+"/habit/delete/"+deleteID,

        {

            method:"DELETE"

        }

    );

    const result=await response.json();

    if(result.success){

        showToast(

            "Đã xóa Habit"

        );

        loadHabit();

    }

    document

    .getElementById("deleteModal")

    .classList

    .remove("active");

};





// =====================================================
// CHECK IN
// =====================================================

const checkinModal =
document.getElementById("checkinModal");

const progressInput =
document.getElementById("progressInput");

const modalHabitName =
document.getElementById("modalHabitName");

const modalHabitGoal =
document.getElementById("modalHabitGoal");

const unitText =
document.getElementById("unitText");



function openCheckin(id){

    currentHabit = habits.find(

        habit=>habit.habit_id==id

    );

    if(!currentHabit) return;

    modalHabitName.innerHTML =
    currentHabit.habit_name;

    modalGoal.innerHTML =
    "Goal : " +
    currentHabit.goal +
    " " +
    currentHabit.unit;

    unitText.innerHTML =
    "Đơn vị : " +
    currentHabit.unit;

    progressInput.value="";

    checkinModal.classList.add("active");

}










// =====================================================
// CLOSE CHECKIN
// =====================================================

document

.getElementById("closeCheckin")

.onclick=function(){

    checkinModal

    .classList

    .remove("active");

};



window.onclick=function(e){

    if(e.target===checkinModal){

        checkinModal

        .classList

        .remove("active");

    }

};












// =====================================================
// SAVE CHECKIN
// =====================================================

document

.querySelector(".save-btn")

.onclick=async function(){

    const progress =

    Number(

        progressInput.value

    );

    if(progress<=0){

        alert("Nhập tiến độ.");

        return;

    }

    const data={

        uid:uid,

        habit_id:currentHabit.habit_id,

        progress:progress,

        checkin_date:

        new Date()

        .toISOString()

        .slice(0,10)

    };

    const response=

    await fetch(

        API+"/checkin/add",

        {

            method:"POST",

            headers:{

                "Content-Type":

                "application/json"

            },

            body:JSON.stringify(data)

        }

    );

    const result=

    await response.json();

    if(result.success){

        checkinModal

        .classList

        .remove("active");

        showToast(

            "Check In thành công"

        );

        loadHabit();

    }

    else{

        alert(result.message);

    }

};






// =====================================================
// TOAST
// =====================================================

function showToast(message){

    const toast=

    document.getElementById("toast");

    document

    .getElementById("toastMessage")

    .innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}







// =====================================================
// THEME
// =====================================================

const themeToggle=

document.getElementById(

"themeToggle"

);

themeToggle.onclick=function(){

    document.body.classList.toggle(

        "dark-mode"

    );

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark-mode")

    );

};

if(

localStorage.getItem("theme")

==="true"

){

    document.body.classList.add(

        "dark-mode"

    );

}
// =====================================================
// INIT
// =====================================================

lucide.createIcons();

loadUser();

loadHabit();