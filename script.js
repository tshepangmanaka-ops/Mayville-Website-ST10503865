// Mayville CRC - simple JavaScript enhancements

// Show a message after a form is submitted.
function showMessage() {
    alert("Thank you. Your enquiry has been received.");
}

// Filter service cards as the visitor types.
var serviceSearch = document.getElementById("service-search");
if (serviceSearch) {
    serviceSearch.addEventListener("input", function () {
        var searchText = serviceSearch.value.toLowerCase();
        var serviceCards = document.querySelectorAll(".service-card");
        serviceCards.forEach(function (card) {
            var cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchText)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// FAQ accordion: open and close answers.
var faqButtons = document.querySelectorAll(".faq-question");
faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var answer = button.nextElementSibling;
        var isOpen = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", !isOpen);
        answer.style.display = isOpen ? "none" : "block";
    });
});

// Image gallery lightbox. Clicking a content image opens a larger view.
var lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-label", "Image preview");
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close image preview">&times;</button><img alt="">';
document.body.appendChild(lightbox);

var lightboxImage = lightbox.querySelector("img");
document.querySelectorAll("main img").forEach(function (img) {
    img.classList.add("gallery-image");
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Open larger image: " + img.alt);

    function openImage() {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("show");
    }
    img.addEventListener("click", openImage);
    img.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openImage();
        }
    });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
    lightbox.classList.remove("show");
});
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.classList.remove("show");
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        lightbox.classList.remove("show");
    }
});

// Reveal page sections when they enter the screen.
var revealItems = document.querySelectorAll("section, .card");
revealItems.forEach(function (item) {
    item.classList.add("reveal");
});
if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) {
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach(function (item) {
        item.classList.add("visible");
    });
}

// Interactive map showing the Mayville area (approximate location).
var mapElement = document.getElementById("community-map");
if (mapElement && typeof L !== "undefined") {
    var map = L.map("community-map").setView([-25.704, 28.187], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([-25.704, 28.187]).addTo(map)
        .bindPopup("Mayville, Pretoria<br>Community Resource Centre area")
        .openPopup();
}
