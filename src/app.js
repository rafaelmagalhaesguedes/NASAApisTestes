document.addEventListener('DOMContentLoaded', function () {
    // Key
    const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo';

    // Get elements html
    const image = document.getElementById('image');
    const title = document.getElementById('title-data');
    const date = document.getElementById('date');
    const desc = document.getElementById('desc');
    const asteroidsDataDiv = document.getElementById('asteroids-data');

    // Format Date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };

    // Get current date in the format yyyy-MM-dd
    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Load Astronomy Picture of the Day (APOD)
    const loadAstronomyPictureOfDay = () => {
        const apiUrlApod = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        fetch(apiUrlApod)
            .then(response => response.json())
            .then(data => {
                // Format date 
                const formattedDate = formatDate(data.date);
                // Show data
                title.innerText = data.title;
                date.innerHTML = '<strong>Information date: </strong>' + formattedDate;
                desc.innerText = data.explanation;
                image.src = data.url;
            })
            .catch(error => {
                console.error('Erro ao carregar a imagem:', error);
            });
    };

    // Function to get API URL with current date
    const getAsteroidsApiUrl = () => {
        const currentDate = getCurrentDate();
        return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&api_key=${apiKey}`;
    };

    // Function to display the total number of detected asteroids
    const showTotalAsteroids = (totalAsteroids) => {
        asteroidsDataDiv.innerHTML = `
        <h5>Total asteroids detected: 
        <strong>${totalAsteroids}</strong></h5>
        <h5>Detection date: ${formatDate(getCurrentDate())}</h5>
    `;
    };

    // Function to get all asteroids from a date object
    const getAllAsteroids = (data) => {
        return Object.keys(data.near_earth_objects)
            .map((date) => data.near_earth_objects[date])
            .flat();
    };

    // Function to load asteroid data
    const loadAsteroidsData = () => {
        const apiUrlAsteroids = getAsteroidsApiUrl();
        fetch(apiUrlAsteroids)
            .then(response => response.json())
            .then((data) => {
                const totalAsteroids = data.element_count;
                showTotalAsteroids(totalAsteroids);

                const allAsteroids = getAllAsteroids(data);
                const batchSize = 4;
                showAsteroids(allAsteroids.slice(0, batchSize));

                addLoadMoreButton(allAsteroids, batchSize);
            })
            .catch((error) => {
                console.error('Erro ao carregar os dados dos asteroides:', error);
            });
    }

    // Function to add the "Load More" button and its click event
    const addLoadMoreButton = (allAsteroids, batchSize) => {
        const loadMoreButton = document.createElement('button');
        loadMoreButton.innerText = 'Load More';
        loadMoreButton.classList.add('btn', 'btn-primary', 'my-3');
        loadMoreButton.addEventListener('click', () => {
            const currentShownAsteroids = document.querySelectorAll('.asteroid-card');
            const nextBatch = allAsteroids.slice(currentShownAsteroids.length, currentShownAsteroids.length + batchSize);
            showAsteroids(nextBatch);

            if (currentShownAsteroids.length + nextBatch.length === allAsteroids.length) {
                // Hide the button when all asteroids are shown
                loadMoreButton.style.display = 'none';
            }
            asteroidsDataDiv.appendChild(loadMoreButton);
        });
        asteroidsDataDiv.appendChild(loadMoreButton);
    };

    // Show asteroids in cards
    const showAsteroids = (asteroids) => {
        asteroidsDataDiv.innerHTML += `
            <div class="row justify-content-between">
                ${asteroids.map(asteroid => `
                    <div class="col-md-6 mb-4 mt-4 asteroid-card">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text"><strong>Name: </strong> 
                                  ${asteroid.name}
                                </p>
                                <p class="card-text"><strong>Estimated Diameter (meters):</strong> 
                                  ${asteroid.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} - 
                                  ${asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}
                                </p>
                                <p class="card-text"><strong>Closest Approach Date:</strong> 
                                  ${asteroid.close_approach_data[0].close_approach_date_full}
                                </p>
                                <p class="card-text"><strong>Relative Velocity (km/h):</strong> 
                                  ${asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour}
                                </p>
                                <p class="card-text"><strong>Miss Distance (kilometers):</strong> 
                                  ${asteroid.close_approach_data[0].miss_distance.kilometers}
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    const loadMarsRoverImages = () => {
        const gallery = document.querySelector("#mars-rover-gallery");
        const loadMoreBtn = document.querySelector("#loadMoreBtn");
        let page = 1;
        const imagesPerPage = 16;
    
        const loadImages = (page) => {
            const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-6-3&api_key=${apiKey}&page=${page}`;
    
            fetch(apiUrl)
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.photos && data.photos.length > 0) {
                        const startIndex = (page - 1) * imagesPerPage;
                        const endIndex = Math.min(startIndex + imagesPerPage, data.photos.length);
                        for (let i = startIndex; i < endIndex; i++) {
                            const photo = data.photos[i];
                            const imgSrc = photo.img_src;
                            const imgElement = document.createElement('img');
                            imgElement.src = imgSrc;
                            imgElement.classList.add('img-thumbnail', 'img-fluid');
                            imgElement.setAttribute('data-toggle', 'modal');
                            imgElement.setAttribute('data-target', '#imageModal');
                            imgElement.addEventListener('click', () => {
                                const modalImage = document.querySelector("#modalImage");
                                modalImage.src = imgSrc;
                            });
                            gallery.appendChild(imgElement);
                        }
                    } else {
                        console.error('Nenhuma imagem de Mars Rover encontrada.');
                    }
                })
                .catch((error) => {
                    console.error('Erro ao carregar os dados de Mars Rover:', error);
                });
        };
    
        // Load the initial images
        loadImages(page);
    
        // Load more images when the "Load More" button is clicked
        loadMoreBtn.addEventListener('click', () => {
            page++;
            loadImages(page);
        });
    };
    
    // Call the function to load the Astronomy Picture of the Day
    loadAstronomyPictureOfDay();

    // Call the function to load asteroid data when the page loads
    loadAsteroidsData();

    // Call the function to load mars rover images
    loadMarsRoverImages();

    // Função para rolar a página para o topo
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Adicione o evento de clique ao botão Back to Top
    const backToTopBtn = document.getElementById('backToTopBtn');
    backToTopBtn.addEventListener('click', scrollToTop);

    // Mostra ou oculta o botão Back to Top com base na posição de rolagem
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

});
