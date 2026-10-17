

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    contactStatus.textContent = "Message sent successfully!";
    contactForm.reset();
    setTimeout(function(){
        contactStatus.style.display = "none";
    },1500)
});

console.log("123")