document.addEventListener('DOMContentLoaded', function () {
    // Get elements for filter, search input, search icon, items, and title
    const filterSelect = document.getElementById('filterSelect');
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const items = document.querySelectorAll('.searchable-item');
    const searchResultsTitle = document.getElementById('searchResultsTitle');
    const categorySections = document.querySelectorAll('.category-section');

    // Mini loading alert setup
    const loadingAlert = document.createElement('div');
    loadingAlert.id = 'loadingAlert';
    loadingAlert.style.position = 'fixed';
    loadingAlert.style.top = '20px';
    loadingAlert.style.left = '50%';
    loadingAlert.style.transform = 'translateX(-50%)';
    loadingAlert.style.backgroundColor = '#333';
    loadingAlert.style.color = '#fff';
    loadingAlert.style.padding = '10px 20px';
    loadingAlert.style.borderRadius = '8px';
    loadingAlert.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    loadingAlert.style.fontSize = '16px';
    loadingAlert.style.zIndex = 10000;
    loadingAlert.style.display = 'none'; // Initially hidden
    loadingAlert.textContent = 'Loading...';
    document.body.appendChild(loadingAlert);

    // Function to show the loading alert
    function showLoading() {
        loadingAlert.style.display = 'block';
    }

    // Function to hide the loading alert
    function hideLoading() {
        loadingAlert.style.display = 'none';
    }

    // Function to get a URL parameter value by name
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Function to return category-specific title for search results
    function getCategoryTitle(category) {
        switch (category) {
            case 'travel':
                return 'Travel Destinations';
            case 'eat':
                return 'Eat & Cuisine';
            case 'videos':
                return 'Travel Videos';
            case 'all':
                return 'All Results';
            default:
                return 'Search Results';
        }
    }

    // Function to handle search and filtering
    function searchAndFilter() {
        const filterValue = filterSelect.value;
        const searchText = searchInput.value.trim().toLowerCase();

        // Update the title of the search results based on the category filter
        searchResultsTitle.textContent = getCategoryTitle(filterValue);

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const itemCategory = item.getAttribute('data-category');
            const matchesSearch = itemText.includes(searchText);
            const matchesFilter = (filterValue === 'all') || (itemCategory === filterValue);

            // Display matching items based on search text and filter
            if ((searchText === '' && matchesFilter) || (matchesSearch && matchesFilter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        categorySections.forEach(section => {
            const itemsInSection = section.querySelectorAll('.searchable-item');
            const hasVisibleItems = Array.from(itemsInSection).some(item => item.style.display !== 'none');
            section.style.display = hasVisibleItems ? 'block' : 'none'; // Hide section if no items visible
        });
    }

    // Function to update the URL without reloading the page
    function updateUrlWithoutReload() {
        const params = new URLSearchParams(window.location.search);
        params.set('search', searchInput.value.trim());
        params.set('filter', filterSelect.value);
        history.pushState(null, '', `${window.location.pathname}?${params.toString()}`);
    }

    // Function to handle the search action (triggered by Enter key or search icon click)
    function handleSearchAction() {
        const searchText = searchInput.value.trim();
        const filterValue = filterSelect.value;

        if (!searchText) {
            // If no search text is entered, show an alert and reset the filter
            alert('Please type something to search.');
            searchInput.value = ''; // Clear any accidental spaces
            filterSelect.value = 'all'; // Reset filter to 'all'
            searchAndFilter(); // Show all results
            return;
        }

        showLoading(); // Show mini loading alert while processing the search

        // Perform the search and filtering after a short delay
        setTimeout(() => {
            if (!window.location.pathname.includes('results.html')) {
                // Redirect to the results page if not already on results.html
                window.location.href = `results.html?search=${encodeURIComponent(searchText)}&filter=${encodeURIComponent(filterValue)}`;
            } else {
                // Already on results.html, just update the URL and search results
                updateUrlWithoutReload();
                searchAndFilter();
                hideLoading(); // Hide mini alert after search is completed
            }
        }, 800); // Short delay (800ms) to simulate loading
    }

    // Load initial search and filter values from the URL (if any)
    const urlSearch = getUrlParameter('search');
    const urlFilter = getUrlParameter('filter');

    if (urlSearch) {
        searchInput.value = urlSearch; // Set the search input value from the URL
    }
    if (urlFilter) {
        filterSelect.value = urlFilter; // Set the filter value from the URL
    }

    // Perform search and filter immediately when the page loads
    searchAndFilter();

    // Event listeners
    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchAction(); // Trigger search when Enter key is pressed
        }
    });

    searchIcon.addEventListener('click', function () {
        handleSearchAction(); // Trigger search when search icon is clicked
    });

    filterSelect.addEventListener('change', function () {
        handleSearchAction(); // Trigger search when filter option changes
    });
});
