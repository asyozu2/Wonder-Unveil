// Get the modal for images
const imageModal = document.getElementById("imageModal");

// Get all gallery images
const galleryImages = document.querySelectorAll(".photo-gallery img");
const modalImage = document.getElementById("modalImage");
const captionText = document.getElementById("caption");

let currentImageIndex = 0; // Track the current opened image index

// Open image modal when clicking an image
galleryImages.forEach((image, index) => {
    image.addEventListener("click", function() {
        imageModal.style.display = "block";
        imageModal.style.animation = "fadeIn 0.5s forwards";
        modalImage.src = image.getAttribute("data-src");
        captionText.innerHTML = image.title;
        currentImageIndex = index; // Set current image index
    });
});

// Close image modal
const closeImageModal = document.getElementById("closeModal");
closeImageModal.addEventListener("click", function() {
    imageModal.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
        imageModal.style.display = "none";
    }, 500);
});

// Close image modal when clicking outside
imageModal.addEventListener("click", function(event) {
    if (event.target === imageModal) {
        imageModal.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
            imageModal.style.display = "none";
        }, 500);
    }
});

// Function to show image by index
function showImage(index) {
    if (index >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (index < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else {
        currentImageIndex = index;
    }

    modalImage.src = galleryImages[currentImageIndex].getAttribute("data-src");
    captionText.innerHTML = galleryImages[currentImageIndex].title;
}

// Arrow button click functions
const prevButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");

prevButton.addEventListener("click", function(event) {
    event.stopPropagation(); // Stop click from closing modal
    showImage(currentImageIndex - 1);
});

nextButton.addEventListener("click", function(event) {
    event.stopPropagation(); // Stop click from closing modal
    showImage(currentImageIndex + 1);
});
