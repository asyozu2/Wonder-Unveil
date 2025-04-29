// Get all video items
const videoItems = document.querySelectorAll(".searchable-item[data-category='videos']");

// Get the modal elements
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const comfortVideo = document.getElementById("comfort-video");
const closeModal = document.querySelector(".modal .close");

// Set video volume to 20%
modalVideo.volume = 0.2; // Default volume for modal videos
if (comfortVideo) {
    comfortVideo.volume = 0.2; // Set volume for comfort-video as well
}

// Redirect to the video file when clicked
videoItems.forEach(item => {
    item.addEventListener("click", function() {
        const videoSrc = item.getAttribute("data-video");
        if (videoSrc) {
            // Show the modal and load the video
            videoModal.style.display = "block";
            videoModal.style.animation = "fadeIn 0.5s forwards"; // Fade in effect
            modalVideo.src = videoSrc; // Set video source

            // Ensure video starts with volume at 20%
            modalVideo.volume = 0.2;

            // If comfort-video is clicked, ensure its volume is set
            if (comfortVideo) {
                comfortVideo.volume = 0.2;
            }
        }
    });
});

// Close modal when clicking on 'X'
closeModal.addEventListener("click", function() {
    videoModal.style.animation = "fadeOut 0.5s forwards"; // Fade out effect
    setTimeout(() => {
        videoModal.style.display = "none";
        modalVideo.pause(); // Pause the video when modal is closed
        modalVideo.currentTime = 0; // Reset video to the beginning
    }, 500);
});

// Close when clicking outside the modal
videoModal.addEventListener("click", function(event) {
    if (event.target === videoModal) {
        videoModal.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
            videoModal.style.display = "none";
            modalVideo.pause(); // Pause the video when modal is closed
            modalVideo.currentTime = 0; // Reset video to the beginning
        }, 500);
    }
});
