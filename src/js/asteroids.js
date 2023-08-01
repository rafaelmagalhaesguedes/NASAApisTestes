document.addEventListener('DOMContentLoaded', function () {

    // Key
    const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo';

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Formata o mês e o dia com zero à esquerda, se for necessário
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Formata o mês e o dia com zero à esquerda, se for necessário
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${day}/${month}/${year}`;
    };


    // Function to get API URL with current date
    const getAsteroidsApiUrl = () => {
        const currentDate = getCurrentDate();
        return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${currentDate}&api_key=${apiKey}`;
    };

    // Function to display the total number of detected asteroids
    const showTotalAsteroids = (totalAsteroids) => {
        const asteroidsDataDiv = document.getElementById('asteroids-info');
        asteroidsDataDiv.innerHTML = `
        <div><h5>Total asteroids detected: 
        <strong>${totalAsteroids}</strong></h5>
        <h5>Detection date: ${formatDate(getCurrentDate())}</h5></div>
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
                const batchSize = 8;
                showAsteroids(allAsteroids.slice(0, batchSize));

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
                });
                document.getElementById('asteroids').appendChild(loadMoreButton);
            })
            .catch((error) => {
                console.error('Erro ao carregar os dados dos asteroides:', error);
            });
    }

    // Show asteroids in cards
    const showAsteroids = (asteroids) => {
        const asteroidsDataDiv = document.getElementById('asteroids-data');
        asteroids.forEach(asteroid => {
            const asteroidCard = document.createElement('div');
            asteroidCard.classList.add('col-md-6', 'mt-3', 'asteroid-card');
            asteroidCard.innerHTML = `
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
            `;
            asteroidsDataDiv.appendChild(asteroidCard);
        });
    };

    // Call the function to load asteroid data when the page loads
    loadAsteroidsData();

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
