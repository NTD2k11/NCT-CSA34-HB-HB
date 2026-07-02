/* ==========================================
            DARK / LIGHT MODE
========================================== */

const body = document.body;

const lightBtn = document.getElementById("lightBtn");
const darkBtn = document.getElementById("darkBtn");

const savedTheme = localStorage.getItem("theme") || "light";

function setTheme(theme){

    if(theme==="dark"){

        body.classList.add("dark");

        darkBtn.classList.add("active");

        lightBtn.classList.remove("active");

    }

    else{

        body.classList.remove("dark");

        lightBtn.classList.add("active");

        darkBtn.classList.remove("active");

    }

    localStorage.setItem("theme",theme);

}

setTheme(savedTheme);

lightBtn.onclick=()=>setTheme("light");

darkBtn.onclick=()=>setTheme("dark");


/* ==========================================
            TODAY DATE
========================================== */

const dateInput=document.getElementById("date");

if(dateInput){

    dateInput.valueAsDate=new Date();

}


/* ==========================================
        CHARACTER COUNTER
========================================== */

const title=document.getElementById("title");

const titleCount=document.getElementById("titleCount");

title.addEventListener("input",()=>{

    titleCount.innerText=title.value.length;

    previewTitle.innerText=title.value || "Chưa nhập";

});


const note=document.getElementById("note");

const noteCount=document.getElementById("noteCount");

note.addEventListener("input",()=>{

    noteCount.innerText=note.value.length;

});


/* ==========================================
            FORMAT MONEY
========================================== */

const amount=document.getElementById("amount");

const previewAmount=document.getElementById("previewAmount");

amount.addEventListener("input",()=>{

    let value=parseInt(amount.value);

    if(isNaN(value)){

        previewAmount.innerText="0 ₫";

        return;

    }

    previewAmount.innerText=value.toLocaleString("vi-VN")+" ₫";

});


/* ==========================================
            CATEGORY
========================================== */

const category=document.getElementById("category");

const previewCategory=document.getElementById("previewCategory");

category.addEventListener("change",()=>{

    previewCategory.innerText=category.value;

});


/* ==========================================
            METHOD
========================================== */

const method=document.getElementById("method");

const previewMethod=document.getElementById("previewMethod");

method.addEventListener("change",()=>{

    previewMethod.innerText=method.value;

});


/* ==========================================
            DATE
========================================== */

const previewDate=document.getElementById("previewDate");

dateInput.addEventListener("change",()=>{

    if(dateInput.value==="") return;

    const d=new Date(dateInput.value);

    previewDate.innerText=d.toLocaleDateString("vi-VN");

});


/* ==========================================
            TITLE
========================================== */

const previewTitle=document.getElementById("previewTitle");


/* ==========================================
            FILE UPLOAD
========================================== */

const uploadBox=document.getElementById("uploadBox");

const fileInput=document.getElementById("receipt");

const fileName=document.getElementById("fileName");

uploadBox.onclick=()=>{

    fileInput.click();

}

fileInput.onchange=()=>{

    if(fileInput.files.length>0){

        fileName.innerText=fileInput.files[0].name;

        uploadBox.classList.add("active");

    }

}

uploadBox.addEventListener("dragover",(e)=>{

    e.preventDefault();

    uploadBox.classList.add("active");

});

uploadBox.addEventListener("dragleave",()=>{

    uploadBox.classList.remove("active");

});

uploadBox.addEventListener("drop",(e)=>{

    e.preventDefault();

    fileInput.files=e.dataTransfer.files;

    fileName.innerText=e.dataTransfer.files[0].name;

});


/* ==========================================
            VALIDATE
========================================== */

const form=document.querySelector(".expense-form");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(title.value.trim()===""){

        alert("Vui lòng nhập mô tả.");

        title.focus();

        return;

    }

    if(amount.value===""){

        alert("Vui lòng nhập số tiền.");

        amount.focus();

        return;

    }

    alert("Thêm giao dịch thành công!");

});


/* ==========================================
            RESET BUTTON
========================================== */

const cancel=document.querySelector(".cancel-btn");

cancel.onclick=()=>{

    setTimeout(()=>{

        previewTitle.innerText="Bữa trưa với bạn bè";

        previewAmount.innerText="250.000 ₫";

        previewCategory.innerText="Ăn uống";

        previewMethod.innerText="Tiền mặt";

        fileName.innerText="Chưa chọn tệp";

        uploadBox.classList.remove("active");

        titleCount.innerText=0;

        noteCount.innerText=0;

    },100);

};


/* ==========================================
            SIDEBAR ACTIVE
========================================== */

document.querySelectorAll(".sidebar li").forEach(item=>{

    item.addEventListener("click",()=>{

        document.querySelectorAll(".sidebar li")
        .forEach(li=>li.classList.remove("active"));

        item.classList.add("active");

    });

});


/* ==========================================
            CARD HOVER
========================================== */

document.querySelectorAll(".card,.preview-card,.tips-card")

.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-5px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});