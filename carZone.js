


const carsContainer = document.getElementById("carsContainer");
const searchinp = document.getElementById("searchInput");
const brandfilter = document.getElementById("Filter1");
const fuelfilter = document.getElementById("Filter2");
const transmissionFilter = document.getElementById("Filter3");
const minPrice = document.getElementById("PriceMin");
const maxPrice = document.getElementById("PriceMax");
const sortFilter = document.getElementById("sortFilter");
const resetFilters = document.getElementById("resetFilters");
const FavCount = document.querySelector(".FavoritesCount");
const detailsModal = document.getElementById("detailsModal");

const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalYear = document.getElementById("modalYear");
const modalEngine = document.getElementById("modalEngine");
const modalFuel = document.getElementById("modalFuel");
const modalTransmission = document.getElementById("modalTransmission");
const modalPrice = document.getElementById("modalPrice");
const modalCartBtn = document.getElementById("modalCartBtn");
const modalCartBtn1 = document.getElementById("modalCartBtn")

const addCarForm = document.getElementById("addCarForm");
const brandInp = document.getElementById("brandInp");
const modelInp = document.getElementById("modelInp");
const yearInp = document.getElementById("yearInp");
const priceInp = document.getElementById("priceInp");
const fuelInp = document.getElementById("fuelInp");
const transmissionInp = document.getElementById("transmissionInp");
const imageInp = document.getElementById("imageInp");
const head = document.getElementById("head");

const loading = document.getElementById("loading");
const mainContainer = document.getElementById("mainContainer")

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let compareCars = [];
addCarForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newCar = {
        id: Date.now(),
        brand: brandInp.value,
        model: modelInp.value,
        year: Number(yearInp.value),
        price: Number(priceInp.value),
        fuel: fuelInp.value,
        transmission: transmissionInp.value,
        image: imageInp.value
    };


    if(newCar.brand === ""){
        alert("please enter car brand");
        return;
    }
    if(newCar.model === ""){
        alert("please enter car model");
        return;
    }
    if(newCar.fuel === ""){
        alert("please enter car fuel");
        return;
    }
    if(newCar.transmission === ""){
        alert("please enter car transmision")
        return;
    }
    if(newCar.image === ""){
        alert("please enter car image");
        return;
    }

        if (Number(yearInp.value) < 1886 || Number(yearInp.value) > new Date().getFullYear()) {
    alert("Please enter a valid car year!");
    return;
}

if (Number(priceInp.value) <= 0) {
    alert("Price must be greater than 0!");
    return;
}

    cars.push(newCar);

    localStorage.setItem("cars", JSON.stringify(cars));

    applyFilters();

    addCarForm.reset();

    

});


let cars = JSON.parse(localStorage.getItem("cars")) || [
    {
        id: 1,
        brand: "BMW",
        model: "M4",
        year: 2019,
        price:35000,
        fuel: "Petrol",
        transmission: "Automatic",
        image: "./2019_BMW_M4.jpg"

    },  
    {
        
        id: 2,
        brand: "Mercedes",
        model: "C-Class",
        year: 2022,
        price: 52000,
        fuel: "Hybrid",
        transmission: "Automatic",
        image: "./2022_Mercedes_C_Class.jpg"
    },
    {
        id: 3,
        brand: "Toyota",
        model: "Supra",
        year: 2021,
        price: 48000,
        fuel: "Petrol",
        transmission: "Manual",
        image: "./2021_Toyota_Supra.jpg"
    },
    {
        id: 4,
        brand: "Audi",
        model: "RS5",
        year: 2023,
        price: 68000,
        fuel: "Petrol",
        transmission: "Automatic",
        image: "./2023_Audi_RS5_Carbon_Black_TFSI_Quattro_Auto_2.jpg"
    },
    {
        id: 5,
        brand: "Tesla",
        model: "Model 3",
        year: 2024,
        price: 45000,
        fuel: "Electric",
        transmission: "Automatic",
        image: "./2024_Tesla_Model_3.jpg"
    },
    {
        id: 6,
        brand: "BMW",
        model: "M5",
        year: 2022,
        price: 75000,
        fuel: "Petrol",
        transmission: "Automatic",
        image: "./2022_BMW_M5.jpg"
    },
    {
        id: 7,
        brand: "Mercedes",
        model: "E-Class",
        year: 2021,
        price: 61000,
        fuel: "Diesel",
        transmission: "Automatic",
        image: "./Mercedes-Benz_W214_1X7A0885.jpg"
    },
    {
        id: 8,
        brand: "Toyota",
        model: "Camry",
        year: 2020,
        price: 28000,
        fuel: "Hybrid",
        transmission: "Automatic",
        image: "./Toyota_Camry_LE_2020.jpg"
    },
    {
        id: 9,
        brand: "Audi",
        model: "A6",
        year: 2022,
        price: 55000,
        fuel: "Diesel",
        transmission: "Automatic",
        image: "./Audi_A6_C8_black_(1).jpg"
    },
    {
        id: 10,
        brand: "Tesla",
        model: "Model S",
        year: 2023,
        price: 85000,
        fuel: "Electric",
        transmission: "Automatic",
        image: "./2023_Tesla_Model_S_Plaid.jpg"
    }
]

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
FavCount.innerText = favorites.length;


function card(car, index) {
    const card = document.createElement("div");

    card.classList.add("car-card");

    

    card.innerHTML = `
        <img class="imag1" src="${car.image}" >

        <div class="car-info">
            <h3>${car.brand} ${car.model}</h3>

            <p>Year: ${car.year}</p>
            <p>Fuel: ${car.fuel}</p>
            <p>Transmission: ${car.transmission}</p>

            <h4>$${car.price.toLocaleString()}</h4>

            <div class="car-buttons">
                <button class="FavBtn">❤️</button>
                <button class="DetailBtn">Details</button>
                <button class="AddBtn">Add To Cart</button>
                <button class="DeleteBtn">Delete Card</button>
                <button class="CompareBtn">Compare</button>
            </div>
        </div>
    `;

   


    const detailBtn = card.querySelector(".DetailBtn");
    const favBtn = card.querySelector(".FavBtn");
    const compareBtn = card.querySelector(".CompareBtn");

    compareBtn.addEventListener("click", function() {
 
    if (compareCars.length >= 2) {
        showNotification("You can compare only 2 cars!");
        return;
    }

    if (compareCars.some(function(item) {
    return item.id === car.id;
})) {
    showNotification("This car is already selected!");
    return;
}

    compareCars.push(car);

    showNotification("Car added to comparison!");

    

    renderCompare()

});
    
    favBtn.addEventListener("click", function(){
    let found = false;

    for (let i = 0; i < favorites.length; i++) {

        if (favorites[i].id === car.id) {
            favorites.splice(i, 1);
            found = true;
            break;
        }

    }

    if (!found) {
        favorites.push(car);
    }

    console.log(favorites);

    FavCount.innerText = favorites.length;
    
    localStorage.setItem("favorites", JSON.stringify(favorites));

     showNotification("❤️Added to Favorites!");


    

 
    
})

 const deleteBtn1 = card.querySelector(".DeleteBtn")

    deleteBtn1.addEventListener("click", function(){
        let confirm1 = window.confirm("are you sure?");
              
        if(confirm1){
         cars = cars.filter(function(i){
         return i.id !== car.id;
         })
        localStorage.setItem("cars", JSON.stringify(cars))

         applyFilters()
        }

         showNotification("Car Removed");
    })


   const CartBtn = card.querySelector(".AddBtn");

    CartBtn.addEventListener("click", function() {
    cart.push({...car,  quantity: 1});
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification("Car added to cart!");
});

modalCartBtn1.addEventListener("click", function(){
    
  
    cart.push({...car,  quantity: 1});
    console.log(cart);
    localStorage.setItem("cart", JSON.stringify(cart));

    showNotification("Car added to cart!");
})



    detailBtn.addEventListener("click", function() {
    modalImage.src = car.image;
    modalName.innerText = `${car.brand} ${car.model}`;
    modalYear.innerText = `Year: ${car.year}`;
    modalFuel.innerText = `Fuel: ${car.fuel}`;
    modalTransmission.innerText = `Transmission: ${car.transmission}`;
    modalPrice.innerText = `Price: $${car.price.toLocaleString()}`;
    
  
    detailsModal.style.display = "block";
});

    carsContainer.append(card);



}



// cars.forEach(function(car, index){
//     card(car, index)
// })



function renderCars(filteredcars) {
   
    carsContainer.innerHTML = "";

    let start = (currentPage - 1) * carsPerPage;
    let end = start + carsPerPage;

    let carsToShow = filteredcars.slice(start, end);

    carsToShow.forEach(function(car) {
        card(car);
    });

    
}

function applyFilters() {

    let searchValue = searchinp.value.toLowerCase();
    let selected = brandfilter.value;
    let selectedFuel =  fuelfilter.value;
    let selectedtransmission = transmissionFilter.value;
    let smallPrice = Number(minPrice.value);
    let bigPrice = Number(maxPrice.value);

    let filteredcars = cars.filter(car => 
        (car.brand.toLowerCase().includes(searchValue) ||
        car.model.toLowerCase().includes(searchValue)) &&
        (selected === "all" || car.brand === selected) &&
        (selectedFuel === "all" || car.fuel === selectedFuel) &&
        (selectedtransmission === "all" || car.transmission === selectedtransmission) &&
        (smallPrice === 0 || car.price >= smallPrice) &&
        (bigPrice === 0 || car.price <= bigPrice) &&
        (Number(priceRange.value) === 0 || car.price <= Number(priceRange.value))
    );

    if (sortFilter.value === "priceLow") {
    filteredcars.sort((a, b) => a.price - b.price);
    }   
    else if(sortFilter.value === "priceHigh"){
        filteredcars.sort((a, b) => b.price - a.price )
    }
    else if(sortFilter.value === "nameAZ"){
       
        filteredcars.sort((b, a) => b.model.localeCompare(a.model));
    }
    else if(sortFilter.value === "nameZA"){
        filteredcars.sort((b, a) => a.model.localeCompare(b.model))
    }
    else if(sortFilter.value === "yearNew"){
        filteredcars.sort((a, b) => b.year - a.year)
    }
    else if(sortFilter.value ===  "yearOld"){
        filteredcars.sort((a, b) => a.year - b.year)
    }

    currentPage = 1;

renderCars(filteredcars);
renderPagination(filteredcars);
checkEmptyState(filteredcars);
}

searchinp.addEventListener("input", applyFilters);
brandfilter.addEventListener("change", applyFilters);
fuelfilter.addEventListener("change", applyFilters);
transmissionFilter.addEventListener("change", applyFilters);
minPrice.addEventListener("input", applyFilters);
maxPrice.addEventListener("input", applyFilters)
sortFilter.addEventListener("change", applyFilters)


function resetAll() {
    searchinp.value = "";
    brandfilter.value = "all";
    fuelfilter.value = "all";
    transmissionFilter.value = "all";
    minPrice.value = "";
    maxPrice.value = "";
    sortFilter.value = "default";
    priceRange.value = 0;
    priceRangeValue.textContent = Number(priceRange.value).toLocaleString();
    applyFilters();
}

resetFilters.addEventListener("click", resetAll)



closeModal.addEventListener("click", function() {
    detailsModal.style.display = "none";
});

detailsModal.addEventListener("click", function(event) {
    if (event.target === detailsModal) {
        detailsModal.style.display = "none";
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        detailsModal.style.display = "none";
    }
});

let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
let text1 = document.querySelector(".Text1");
let emptySpace = document.getElementById("emptyState");
const foot = document.querySelector(".footer")
const line = document.querySelector(".line")
const aboutSection = document.querySelector(".aboutSection");
function colorMode(){
    
    if (darkMode) {
        document.body.style.backgroundColor = "#1a1a1a";
        document.body.style.color = "white";
        text1.style.color = "white";
        emptySpace.style.color = "white"
        line.style.display = "block";
        
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        text1.style.color = " rgba(44, 52, 57, 0.541)";
        emptySpace.style.color = "rgb(82, 82, 82)";
        line.style.display = "none";
    }
}
function SwichMode() {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", (darkMode));

   colorMode();
}


colorMode();


function showNotification(message) {
    let notification = document.getElementById("notification");

    notification.innerText = message;
    notification.style.display = "block";

    setTimeout(function() {
        notification.style.display = "none";
    }, 2000);
}




function checkEmptyState(filteredcars){
    if(filteredcars.length === 0){
        emptySpace.style.display = "block";
    }else{
        emptySpace.style.display ="none"
    }
    console.log("1234")
}


let currentPage = 1;
let carsPerPage = 4;



function renderPagination(filteredcars) {
    const pagination = document.getElementById("pagination");
    const buttons = document.getElementById("buttons");
    buttons.innerHTML = ""; 

    let totalPages = Math.ceil(filteredcars.length / carsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement("button");
        button.classList.add("BtN1")
        button.innerText = i;

        button.addEventListener("click", function() {
    currentPage = i;

    renderCars(filteredcars);
});

        buttons.append(button);
    }
}



function showLoading() {
       
    loading.style.display = "block";
    head.style.display = "none";
    mainContainer.style.display= "none"
    foot.style.display = "none"
    


    setTimeout(function() {
        loading.style.display = "none";
        head.style.display= "flex"
        mainContainer.style.display= "block"
        foot.style.display = "block"
    
    }, 1500);

    
}
    


 showLoading();

 setTimeout(function(){
    checkScroll()
 }, 1500);



 
const statNumbers = document.querySelectorAll(".statNumber");

statNumbers.forEach(function(stat) {
    let target = Number(stat.dataset.target);
    let count = 0;

    let interval = setInterval(function() {
        count += Math.ceil(target / 100);

        if (count >= target) {
            count = target;
            clearInterval(interval);
        }

        stat.textContent = count + (target === 500 || target === 1200 || target === 15 ? "+" : "");
    }, 40);
});



const scrollSections = document.querySelectorAll(
    "#addCarSection, .cars-section, .aboutSection, .statistics, .footerContent"
);

scrollSections.forEach(function(section) {
    section.classList.add("scroll-animation");
});

function checkScroll() {
    scrollSections.forEach(function(section) {
        const position = section.getBoundingClientRect();

        if (position.top < window.innerHeight +100 && position.bottom > 0) {
            section.classList.add("show");
        } else {
            section.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", checkScroll);

checkScroll();



const priceRange = document.getElementById("priceRange");

priceRange.value = 0;

const priceRangeValue = document.getElementById("priceRangeValue");

priceRangeValue.textContent = Number(priceRange.value).toLocaleString();


priceRange.addEventListener("input", function() {
    priceRangeValue.textContent = Number(priceRange.value).toLocaleString();
    applyFilters();
});


applyFilters()



function renderCompare() {
    const compareContainer = document.getElementById("compareContainer");

    compareContainer.innerHTML = "";

    if (compareCars.length < 2) {
        return;
    }

    compareCars.forEach(function(car) {
        compareContainer.innerHTML += `
            <div class="compare-card">
                 <img class="imag11" src="${car.image}" >
                <h3>${car.brand} ${car.model}</h3>
                <p>Year: ${car.year}</p>
                <p>Fuel: ${car.fuel}</p>
                <p>Transmission: ${car.transmission}</p>
                <h4>Price: $${car.price.toLocaleString()}</h4>
            </div>
        `;
    });
}