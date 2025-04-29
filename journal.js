// Handle journal form submission
const journalForm = document.getElementById('journalForm');
const journalEntries = document.getElementById('journalEntries');

journalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form data
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const experience = document.getElementById('experience').value;
    const image = document.getElementById('image').files[0];

    // Create journal entry
    const journalEntry = document.createElement('div');
    journalEntry.classList.add('journal-entry');

    const journalHTML = `
        <h4>${location}</h4>
        <p>Visited on: ${date}</p>
        <p>${experience}</p>
    `;

    journalEntry.innerHTML = journalHTML;

    if (image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            journalEntry.appendChild(imgElement);
        };
        reader.readAsDataURL(image);
    }

    // Append new journal entry
    journalEntries.appendChild(journalEntry);

    // Reset form
    journalForm.reset();
});