document.addEventListener('DOMContentLoaded', function () {
    // Key
    const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo';

    // Get elements html
    const image = document.getElementById('image');
    const title = document.getElementById('title-data');
    const date = document.getElementById('date');
    const desc = document.getElementById('desc');

    // Format Date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
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
    
    // Call the function to load the Astronomy Picture of the Day
    loadAstronomyPictureOfDay();

    // Scroll To Top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event click button Back to Top
    const backToTopBtn = document.getElementById('backToTopBtn');
    backToTopBtn.addEventListener('click', scrollToTop);

    // Display/hide button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

});
