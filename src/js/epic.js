
    const getEpicImage = (date) => {
        const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo';
        // Constrói a URL da API com a data fornecida
        const apiUrl = `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`;
    
        // Faz a requisição à API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Verifica se há informações de imagem disponíveis na resposta
                if (data && data.length > 0) {
                    // Mostra a imagem na página
                    const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${data[0].date.split(' ')[0].replace(/-/g, '/')}/png/${data[0].image}.png?api_key=${apiKey}`;
                    document.getElementById('earth-img').src = imageUrl;
                } else {
                    console.log('Nenhuma imagem disponível para a data fornecida.');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar a imagem:', error);
            });
    };
    
    // Adicionamos um evento de clique para o botão de busca
    document.getElementById('searchBtn').addEventListener('click', () => {
        const dateInput = document.getElementById('dateInput').value;
        getEpicImage(dateInput);
    });
    
