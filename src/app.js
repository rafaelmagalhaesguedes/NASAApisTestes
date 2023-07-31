//
//
// Load Main
document.addEventListener('DOMContentLoaded', function() {
    // Key
    const apiKey = 'BfjznSZpe8iyba9VVhi1OHpRtih2HiLj6kWjMvOo ';
  
    // URL
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  
    // Get elements html
    const image = document.getElementById('image');
    const title = document.getElementById('title');
    const date = document.getElementById('date');
    const desc = document.getElementById('desc');

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    };
  
    // Função para carregar dados da API
    const loadMainPage = () => {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data); // Dados do objeto
          // Formata a data usando a função formatDate
          const formattedDate = formatDate(data.date);
          // Atualiza dados
          title.innerText = data.title;
          date.innerText = formattedDate;
          desc.innerText = data.explanation;
          image.src = data.url;
        })
        .catch(error => {
          console.error('Erro ao carregar a imagem:', error);
        });
    };
  
    // Chama a função para carregar página Main
    loadMainPage();
});
