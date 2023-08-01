// Key
const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo';
const apiUrlMarsRover = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2021-6-3&api_key=${apiKey}`;

const openModalButton = document.getElementById('modalImage');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));

// Function to open the modal with the clicked image
const openModal = (imgSrc) => {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imgSrc;
    imageModal.show();
};

const loadMarsRoverImages = (page = 1) => {
    const marsRoverGallery = document.getElementById('mars-rover-gallery');

    fetch(`${apiUrlMarsRover}&page=${page}`)
        .then(response => response.json())
        .then((data) => {
            if (data.photos && data.photos.length > 0) {
                data.photos.forEach((photo) => {
                    const imgSrc = photo.img_src;
                    const imgElement = document.createElement('img');
                    imgElement.src = imgSrc;
                    imgElement.classList.add('img-thumbnail', 'mr-3', 'mb-3', 'img-fluid');
                    marsRoverGallery.appendChild(imgElement);

                    imgElement.addEventListener('click', () => {
                        openModal(imgSrc);
                    });
        
                    marsRoverGallery.appendChild(imgElement);
                });

                // Check if there are more photos to load
                if (data.photos.length < 25) {
                    loadMoreButton.style.display = 'none';
                }
            } else {
                console.error('Nenhuma imagem de Mars Rover encontrada.');
                loadMoreButton.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error('Erro ao carregar os dados de Mars Rover:', error);
            loadMoreButton.style.display = 'none';
        });
};

let page = 1;
const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', () => {
    page++;
    loadMarsRoverImages(page);
});

// Load initial 8 images
loadMarsRoverImages();
