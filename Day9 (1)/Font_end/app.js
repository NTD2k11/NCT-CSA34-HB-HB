fetch("http://127.0.0.1:5000/")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })

  .catch((err) => {
    console.log(err);
  });

let createPersonBtn = document.querySelector(".btn");
createPersonBtn.addEventListener("click", () => {
  fetch("http://127.0.0.1:5000/create_person", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Danh Phuong dzai",
      age: 20,
      address: "Ha Noi",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

fetch("http://127.0.0.1:5000/getdata")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
