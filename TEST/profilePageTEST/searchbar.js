const items = [
    { title: "Apple", image: "./profilePage/food 1.png", link: "#" },
    { title: "Banana", image: "./profilePage/food 1.png", link: "#" },
    { title: "Orange", image: "./profilePage/food 1.png", link: "#" },
    { title: "Mango", image: "./profilePage/food 1.png", link: "#" },
    { title: "Grapes", image: "./profilePage/food 1.png", link: "#" },
    { title: "Pineapple", image: "./profilePage/food 1.png", link: "#" },
    { title: "Strawberry", image: "./profilePage/food 1.png", link: "#" },
    { title: "Watermelon", image: "./profilePage/food 1.png", link: "#" },
    { title: "Peach", image: "./profilePage/food 1.png", link: "#" },
    { title: "Kiwi", image: "./profilePage/food 1.png", link: "#" }
];
let searching = false;
function updateSearchResults(query) {
    const resultsContainer = document.getElementById('search-results-container');
    const navbar_searchbar = document.querySelector('.navbar_searchbar');
    resultsContainer.innerHTML = ''; // Clear previous results

    // console.log("Query:", query);

    if (query.trim() === '' || !navbar_searchbar.contains(document.activeElement)) {
        searching = false;
        // console.log("Not searching");
    } else {
        searching = true;
        // console.log("Searching");
    }

    if (searching) {
        resultsContainer.style.display = 'block'; // Show search results container
    } else {
        resultsContainer.style.display = 'none'; // Hide search results container
    }

    const resultList = document.createElement('ul');
    resultList.classList.add('list-group'); // Bootstrap class for list styling

    let anyResultsFound = false; // Flag to check if any search results are found

    items.forEach(item => {
        const lowercaseTitle = item.title.toLowerCase();
        const lowercaseQuery = query.toLowerCase();
        if (lowercaseTitle.includes(lowercaseQuery)) {
            anyResultsFound = true;
            const resultItem = document.createElement('li');
            resultItem.classList.add('list-group-item', 'd-flex', 'align-items-center');
            resultItem.style.paddingLeft = '30px';
            resultItem.style.overflowX = 'none';
            resultItem.style.backgroundColor = 'transparent';

            let initialSearchBarText = '';

            resultItem.addEventListener('mouseover', function () {
                initialSearchBarText = document.querySelector('.navbar_searchbar').value;
                document.querySelector('.navbar_searchbar').value = item.title;
            });

            resultItem.addEventListener('mouseout', function () {
                // console.log("initialSearchBarText: ",initialSearchBarText);
                document.querySelector('.navbar_searchbar').value = initialSearchBarText;
            });

            const anchor = document.createElement('a');
            anchor.href = item.link;
            anchor.style.appearance = 'none';
            anchor.style.textDecoration = 'none';
            anchor.target = "_blank"; // Open link in a new tab
            anchor.classList.add('mr-3'); // Bootstrap class for margin-right

            const title = document.createElement('span');
            const titleText = item.title;
            let coloredTitle = '';
            let lastIndex = 0;
            const queryLength = lowercaseQuery.length;

            while (lastIndex < titleText.length && searching === true) {
                const index = lowercaseTitle.indexOf(lowercaseQuery, lastIndex);
                if (index === -1) {
                    coloredTitle += '<span style="color: gray;">' + titleText.substring(lastIndex) + '</span>';
                    break;
                }
                coloredTitle += '<span style="color: gray;">' + titleText.substring(lastIndex, index) + '</span>';
                if (index + queryLength <= titleText.length) {
                    coloredTitle += '<span style="color: black; font-weight: bold;">' + titleText.substring(index, index + queryLength) + '</span>';
                } else {
                    coloredTitle += '<span style="color: black; font-weight: bold;">' + titleText.substring(index) + '</span>';
                }
                lastIndex = index + queryLength;
            }

            title.innerHTML = coloredTitle;

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.title;
            image.style.maxWidth = '55px'; // Set maximum width to 50px
            image.style.maxHeight = 'auto'; // Set maximum height to 50px
            image.style.marginRight = '20px'; // Set right margin

            anchor.appendChild(image);
            anchor.appendChild(title); // Add title to the anchor

            resultItem.appendChild(anchor);
            resultList.appendChild(resultItem);
        }
    });

    if (searching && anyResultsFound) { // Display results only when searching and at least one result is found
        resultsContainer.appendChild(resultList);
    }
}

// Event listener for input field change
document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value;
    updateSearchResults(query);
});

// Event listener for search bar focus
document.querySelector('.navbar_searchbar').addEventListener('focus', function () {
    const searchInput = document.getElementById('search-input');
    if (searchInput.value !== '') {
        const query = searchInput.value.trim();
        searching = true;
        updateSearchResults(query);
    }
});

// Event listener for search bar blur
document.querySelector('.navbar_searchbar').addEventListener('blur', function () {
    searching = false;
    updateSearchResults(document.getElementById('search-input').value);
});
