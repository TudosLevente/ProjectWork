document.addEventListener("DOMContentLoaded", function () {
    getData('http://localhost:8000/api/allrecipe').then((response) => {
        const recipes = response[0].map((recipe) => {
            ;
            return {
                title: recipe.Title,
                image: recipe.Picture_data,
                link: `http://localhost:8000/html/recipePage.html?id=${recipe.Recipe_ID}`
            };
        });

        let searching = null;
        function updateSearchResults(query) {
            const resultsContainer = document.getElementById('search-results-container');
            const navbar_searchbar = document.querySelector('.navbar_searchbar');
            const navbar = document.querySelector('.navbar');
            const menuitems_row = document.querySelector('.menuitems_row');
            resultsContainer.innerHTML = '';

            query.trim() ? searching = true : searching = false;
            navbar_searchbar.contains(document.activeElement) ? searching = true : searching = false;
            navbar.contains(document.activeElement) ? searching = true : searching = false;

            if (searching === true) {
                resultsContainer.style.display = 'block';
                resultsContainer.style.border = '4px solid #ff9900';
                menuitems_row.style.zIndex = '0';
            } else if (searching === false) {
                resultsContainer.style.display = 'none';
                resultsContainer.style.border = 'none';
            }

            resultsContainer.style.zIndex = '100';

            const resultList = document.createElement('ul');
            resultList.classList.add('list-group');

            let anyResultsFound = false;

            recipes.forEach(item => {
                const lowercaseTitle = item.title.toLowerCase();
                const lowercaseQuery = query.toLowerCase();
                if (lowercaseTitle.includes(lowercaseQuery)) {
                    anyResultsFound = true;
                    const resultItem = document.createElement('li');
                    resultItem.classList.add('list-group-item', 'd-flex', 'align-items-center');
                    resultItem.style.paddingLeft = '30px';
                    resultItem.style.overflowX = 'none';
                    resultItem.style.backgroundColor = 'transparent';
                    resultItem.onclick = function () {
                        window.location.target = "_self";
                        window.location.href = item.link;
                    };

                    let initialSearchBarText = '';

                    resultItem.addEventListener('mouseover', function () {
                        initialSearchBarText = document.querySelector('.navbar_searchbar').value;
                        document.querySelector('.navbar_searchbar').value = item.title;
                    });

                    resultItem.addEventListener('mouseout', function () {
                        document.querySelector('.navbar_searchbar').value = initialSearchBarText;
                    });

                    const anchor = document.createElement('a');
                    anchor.href = item.link;
                    anchor.style.appearance = 'none';
                    anchor.style.textDecoration = 'none';
                    anchor.target = "_self";
                    anchor.classList.add('mr-3');

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

                        if (titleText.length === 0)
                            break;

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
                    image.style.maxWidth = '55px';
                    image.style.Width = 'auto';
                    image.style.maxHeight = 'auto';
                    image.style.marginRight = '20px';

                    anchor.appendChild(image);
                    anchor.appendChild(title);

                    resultItem.appendChild(anchor);
                    resultList.appendChild(resultItem);
                }
            });

            if (searching && anyResultsFound) {
                resultsContainer.appendChild(resultList);
            }
        }

        document.getElementById('search-input').addEventListener('input', function () {
            const query = this.value;
            updateSearchResults(query);
        });

        document.querySelector('.navbar_searchbar').addEventListener('focus', function () {
            const searchInput = document.getElementById('search-input');
            if (searchInput.value !== '') {
                const query = searchInput.value.trim();
                searching = true;
                updateSearchResults(query);
            }
        });

        document.querySelector('.navbar_searchbar').addEventListener('blur', function () {
            setTimeout(function () {
                updateSearchResults('');
            }, 500);
        });
    });
});