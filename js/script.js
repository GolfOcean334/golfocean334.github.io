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