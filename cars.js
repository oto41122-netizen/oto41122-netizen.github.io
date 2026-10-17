
let cart = JSON.parse(localStorage.getItem("cart")) || [];



let CartCars = document.getElementById("CartCars");
let CartTotal = document.getElementById("CartTotal");


let couponInput = document.getElementById("couponInput");
let applyCoupon = document.getElementById("applyCoupon");
let couponMessage = document.getElementById("couponMessage");

let checkoutBtn = document.getElementById("checkoutBtn");

let nameInp = document.getElementById("nameInp");
let emailInp = document.getElementById("emailInp");
let phonNumberInp = document.getElementById("phonNumberInp");
let addressInp = document.getElementById("addressInp");
let discount = 0;







function card(car){
    const card = document.createElement("div");

    card.classList.add("car-card");

    card.innerHTML = `
        <img class="imag1" src="${car.image}">

        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>
            <p>Year: ${car.year}</p>
            <p>Fuel: ${car.fuel}</p>
            <p>Transmission: ${car.transmission}</p>
            <h4>$${car.price.toLocaleString()}</h4>

            <div class="quantity">
                <button class="minusBtn">-</button>
                <span class="quantityNumber">1</span>
                <button class="plusBtn">+</button>
            </div>


             <button class="RemoveBtn">Remove Car</button>

           
        </div>
    `;


    let removeBtn = card.querySelector(".RemoveBtn");

    removeBtn.addEventListener("click", function(){
        cart = cart.filter(function(item){
            return item.id !== car.id
        });

        

        card.remove();

        localStorage.setItem("cart", JSON.stringify(cart));

        updateTotal();

        showNotification("Car Removed From Cart!")

    });


    


    const minusBtn = card.querySelector(".minusBtn");
    const plusBtn = card.querySelector(".plusBtn");
    const quantityNumber = card.querySelector(".quantityNumber");

    let quantity = car.quantity;

   plusBtn.addEventListener("click", function(){

    quantity++;


    car.quantity = quantity;

    quantityNumber.innerText = quantity;

    updateTotal();

    localStorage.setItem("cart", JSON.stringify(cart));

    });



   minusBtn.addEventListener("click", function(){
    quantity--;

    if(quantity > 0){
        car.quantity = quantity;
        quantityNumber.innerText = quantity;

        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotal();
    } else {
        cart = cart.filter(function(item){
            return item.id !== car.id;
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        card.remove();
        updateTotal();
    }
});
    
    CartCars.append(card)
    


}

cart.forEach(function(car){
    card(car)
    
})

updateTotal()


  function updateTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }
    let finalTotal = total * (1 - discount / 100);
    CartTotal.innerText = `Total: $${finalTotal.toLocaleString()}`;
    }


applyCoupon.addEventListener("click", function(){
    let code = couponInput.value.trim().toUpperCase();

    if(code === "CAR10"){
    discount = 10;
    couponMessage.innerText = "Coupon applied! 10% discount.";
    }else{
        discount = 0;
        couponMessage.innerText = "Invalid coupon code.";
    }

    updateTotal();

    setTimeout(function(){
    couponMessage.innerText = "";
}, 2000);
});

checkoutBtn.addEventListener("click", function(){

    if(nameInp.value === "" ||
        emailInp.value === "" ||
        phonNumberInp.value === "" ||
        addressInp.value === ""

    ){
        alert("Please fill in all fields!");
        return;
    }
    


    if(cart.length === 0){
        alert("Your cart is empty!");
        
    } else {
        alert("Order placed successfully!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        CartCars.innerHTML = "";
        updateTotal();
        nameInp.value = "" 
        emailInp.value = "" 
        phonNumberInp.value = "" 
        addressInp.value = ""

    
    }

   
});



function showNotification(message) {
    let notification = document.getElementById("notification");

    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(function() {
        notification.style.display = "none";
    }, 2000);
}