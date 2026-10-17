

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


const favoritesContainer = document.getElementById("favoritesContainer");

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

            <button class="RemoveBtn">Remove Favorite</button>
        </div>
    `;

    const removeBtn = card.querySelector(".RemoveBtn");

    removeBtn.addEventListener("click", function() {

        favorites = favorites.filter(function(item){
            return item.id !== car.id;

             
        })

        localStorage.setItem("favorites", JSON.stringify(favorites));

        card.remove();


         if (favorites.length === 0) {
    favoritesContainer.innerHTML  = `
        <p class="empty-favorites">No favorite cars yet.</p>
    `;
}

      showNotification("Car Removed From Favorites")


    
    });

    

  

    favoritesContainer.append(card);

   
}

 if (favorites.length === 0) {
    favoritesContainer.innerHTML =  `
        <p class="empty-favorites">No favorite cars yet.</p>
`;
}
favorites.forEach(function(car){
    card(car)
})

console.log(favorites);


function showNotification(message) {
    let notification = document.getElementById("notification");

    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(function() {
        notification.style.display = "none";
    }, 2000);
}