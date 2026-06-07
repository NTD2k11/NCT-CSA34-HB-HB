fetch("http://127.0.0.1:5000/products")
.then(res => res.json())
.then(data => {
    console.log(data);

        const money = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        });

        const productGrid = document.getElementById("productGrid")
        const searchInput = document.getElementById("searchInput");
        const totalProducts = document.getElementById("totalProducts");
        const totalQuantity = document.getElementById("totalQuantity");
        const highestPrice = document.getElementById("highestPrice");
        const stockValue = document.getElementById("stockValue");
        const summaryTable = document.getElementById("summaryTable");
  


        data.forEach(product => {
            
            const box = document.createElement("div")   
            box.classList.add("box")
            box.innerHTML = `

                
                   <article class="card">
                        <div class="product-head">
                            <div>
                                <h2 class="product-name">${product.name}</h2>
                                <p>Ma san pham: ${product.id}</p>
                            </div>
                            <span class="tag">${product.category}</span>
                        </div>
                        <div class="product-detail">
                            <div class="detail">
                                <span>Don gia</span>
                                <strong>${money.format(product.price)}</strong>
                            </div>
                            <div class="detail">
                                <span>So luong</span>   
                                <strong>${product.quantity}</strong>
                            </div>
                            <div class="detail">
                                <span>Gia tri</span>
                                <strong>${money.format(product.price * product.quantity)}</strong>
                            </div>
                            <div class="detail">
                                <span>Trang thai</span>
                                <strong>${product.quantity > 0 ? "Con hang" : "Het hang"}</strong>
                            </div>
                        </div>
                    </article>
        
            `
            box.addEventListener("click", () => {
                window.location.href = `http://127.0.0.1:5000/products/${product.id}`;
            })
        productGrid.append(box)
        });
        

    
})

.catch(err =>{
    console.log(err);
    
});









