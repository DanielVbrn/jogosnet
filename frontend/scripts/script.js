let currentPage = 0;
const gamesPerPage = 4; // Número de jogos exibidos por vez
let allGames = []; // Armazena todos os jogos recebidos do backend

// Função para atualizar o destaque de um jogo
function updateHighlight(title, info, price, imgSrc, summary, trailerUrl) {
    document.getElementById("highlight-title").textContent = title;
    document.getElementById("highlight-info").textContent = info;
    document.getElementById("highlight-price").textContent = price;
    document.getElementById("highlight-img").src = imgSrc;
    document.getElementById("summary-text").textContent = summary;

    const trailerContainer = document.getElementById("trailer-container");
    const trailerVideo = document.getElementById("trailer-video");

    if (trailerUrl) {
        trailerVideo.src = trailerUrl;
        trailerContainer.style.display = 'block'; // Exibe o trailer
    } else {
        trailerContainer.style.display = 'none'; // Oculta o trailer
    }

    document.getElementById("game-summary").style.display = 'block'; // Exibe o resumo do jogo
}

// Função para carregar todos os jogos do backend
function loadGames() {
    fetch('/games') // Endpoint para buscar todos os jogos
        .then(response => response.json())
        .then(data => {
            allGames = data; // Armazena todos os jogos recebidos
            displayGames(); // Exibe os jogos na tela
        })
        .catch(error => {
            console.error('Erro ao carregar jogos:', error);
        });
}

// Função para exibir jogos na tela, de acordo com a página atual
function displayGames() {
    const gameGrid = document.querySelector('.game-grid');
    gameGrid.innerHTML = ''; // Limpa a grid antes de adicionar novos jogos

    const start = currentPage * gamesPerPage; // Índice inicial
    const end = start + gamesPerPage; // Índice final

    // Adiciona os jogos visíveis à grid
    allGames.slice(start, end).forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game', 'card');
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.price} | ${game.genre}</p>
        `;
        gameCard.onclick = () => {
            updateHighlight(game.title, game.info, game.price, game.image, game.summary, game.trailerUrl);
        };
        gameGrid.appendChild(gameCard);
    });
}

// Função para carregar mais jogos ao clicar em "Ver Mais"
function loadMoreGames() {
    currentPage++; // Incrementa a página atual
    displayGames(); // Exibe a próxima página de jogos
}

// Função para buscar jogos pelo nome
document.getElementById('search-btn').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-input').value;

    // Faz a chamada fetch para buscar jogos pelo nome
    fetch(`/games?name=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            allGames = data; // Atualiza a lista de jogos com os resultados da pesquisa
            currentPage = 0; // Reseta a página para os resultados da pesquisa
            displayGames(); // Exibe os resultados da pesquisa
        })
        .catch(error => {
            console.error('Erro ao buscar jogos:', error);
        });
});

// Exibir sugestões enquanto digita no campo de busca
document.getElementById('search-input').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const suggestions = document.getElementById('search-suggestions');
    suggestions.innerHTML = ''; // Limpa as sugestões anteriores

    if (searchTerm.length > 0) {
        // Filtra os jogos que contêm o termo de busca
        const filteredGames = allGames.filter(game => game.title.toLowerCase().includes(searchTerm));

        // Adiciona sugestões à div
        filteredGames.forEach(game => {
            const suggestion = document.createElement('div');
            suggestion.textContent = game.title;
            suggestion.onclick = () => {
                updateHighlight(game.title, game.info, game.price, game.image, game.summary, game.trailerUrl);
                document.getElementById('search-input').value = game.title; // Preenche o campo de pesquisa
                suggestions.innerHTML = ''; // Limpa as sugestões
                suggestions.style.display = 'none'; // Oculta as sugestões
            };
            suggestions.appendChild(suggestion);
        });

        // Exibe a div de sugestões se houver sugestões
        if (filteredGames.length > 0) {
            suggestions.style.display = 'block';
        } else {
            suggestions.style.display = 'none';
        }
    } else {
        suggestions.style.display = 'none'; // Oculta as sugestões se o campo de busca estiver vazio
    }
});

// Evento para carregar mais jogos ao clicar no botão
document.getElementById('view-more').addEventListener('click', loadMoreGames);

// Chama a função para carregar jogos ao iniciar a página
loadGames();
