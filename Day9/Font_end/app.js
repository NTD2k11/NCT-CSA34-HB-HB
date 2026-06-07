fetch("http://127.0.0.1:5000/")
.then(res => res.json())
.then(data => {
    console.log(data);
    
})

.catch(err =>{
    console.log(err);
    
});

let name  = document.querySelector("#name")
let email  = document.querySelector("#email") 
let phone  = document.querySelector("#phone") 
let Favorite  = document.querySelector("#Favorite") 

fetch("http://127.0.0.1:5000/get_person_information")
.then(res => res.json())
.then(data => {
    console.log(data);
    name.innerText = data.name;
    email.innerText = data.gmail;
    phone.innerText = (data.phone);
    Favorite.innerText = data.favorite;
})

.catch(err =>{
    console.log(err);
    
});


