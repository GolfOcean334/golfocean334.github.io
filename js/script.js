document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".carousel").forEach(carousel => {
        let images = [
            "images/image1.jpg", "images/image2.jpg", "images/image3.jpg"
        ];
        let imgElement = carousel.querySelector(".carousel-image");
        let currentIndex = 0;

        carousel.querySelector(".next").addEventListener("click", function() {
            currentIndex = (currentIndex + 1) % images.length;
            imgElement.src = images[currentIndex];
        });

        carousel.querySelector(".prev").addEventListener("click", function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            imgElement.src = images[currentIndex];
        });
    });
});

// Change la classe de la navbar après défilement
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Change la couleur du mot "highlight" au clic sur l'image de profil
document.addEventListener("DOMContentLoaded", () => {
    const profilePicture = document.getElementById("profile-picture");
    const highlightWord = document.getElementById("highlight-word");

    // Fonction pour générer une couleur aléatoire
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    profilePicture.addEventListener("click", () => {
        highlightWord.style.color = getRandomColor();
    });
});