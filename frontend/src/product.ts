class Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imgSrc: string;   

  constructor(id: number, nome: string, descricao: string, preco:number, imgSrc: string) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.imgSrc = imgSrc;
  }

  public getNome(): string {
    return this.nome;
  }

  public getDescricao(): string {
    return this.descricao;
  }

  public getPreco(): number {
    return this.preco;
  }
/*
  public getGenero(): string {
    return this.genero;
  }
*/
  public getImg(): string {
    return this.imgSrc;
  }

  public infoProduct(): string {
    return `
      Nome: ${this.nome} \n
      Descricao: ${this.descricao} \n
      Preço: ${this.preco} \n
      Imagem: ${this.imgSrc} \n
    `;
  }

  // Método static porque ele não depende de instâncias de `Product`
  public static async loadGames(): Promise<void> {
    try {
      const response = await fetch('https://backend-jogosnet.onrender.com/products'); // Ajuste a URL para sua API
      //const response = await fetch('https=://localhost:3333/products');
      const games = await response.json();

      const gameGrid = document.querySelector('.game-grid'); // Seleciona o container onde os jogos serão adicionados
      if (gameGrid) gameGrid.innerHTML = ''; // Limpa o conteúdo existente, se necessário

      games.forEach((game: any) => {
        // Cria o HTML para cada jogo dinamicamente
        const gameCard = `
          <div class="game card" onclick="updateHighlight('${game.nome}', '${game.descricao}', '${game.preco}')">
            <img src="${game.imgSrc}" alt="${game.title}">
            <h3>${game.nome}</h3>
            <p>$${game.preco} | ${game.descricao}</p>
          </div>
        `;
        if (gameGrid) gameGrid.innerHTML += gameCard; // Adiciona o jogo à grid
      });
    } catch (error) {
      console.error('Erro ao carregar os jogos:', error);
    }
  }
}

// Chamando a função para carregar os jogos
Product.loadGames();


export default Product;