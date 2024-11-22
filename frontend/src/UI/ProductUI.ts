import  ProductService  from '../services/service';
import Product from '../product';

export default class ProductUI {
    private productService: ProductService;
    private gameGrid: HTMLElement | null;
    private allGames: Product[] = []; // Array de produtos
    private currentPage: number = 0;
    private gamesPerPage: number = 4; // Número de jogos por página
    private searchTerm: string = ''; // Propriedade para armazenar o termo de pesquisa

    constructor() {
        this.productService = new ProductService();
        this.gameGrid = document.querySelector('.game-grid');
    }

    async initializeApp(): Promise<void> {
        await this.loadProducts(); // Carrega produtos ao iniciar a aplicação
        this.updateHeroWithFirstProduct(); // Atualiza a hero com o primeiro produto
        this.attachEventListeners();
        this.displayGames();
        this.loadMoreGames();
    }    
    
    
    private attachEventListeners(): void {
        const searchBtn = document.getElementById('search-btn');
        const viewMoreBtn = document.getElementById('view-more');
    
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchGames());
        }
    
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', () => this.loadMoreGames());
        }
    }
    
    
    public async loadProducts(): Promise<void> {
        try {
            const productsData = await this.productService.getAllProducts();
        
            // Ajustando os produtos para incluir URLs de imagem completas
            this.allGames = productsData.map((data: any) => {
                // Garante que não haja barras duplicadas ao juntar baseUrl e imgSrc
                const imageUrl = data.imgSrc;
                console.log('Image Source:', data.imgSrc);
                console.log('Final Image URL:', imageUrl);
        
                return new Product(data.id, data.nome, data.descricao, data.preco, imageUrl);
            });
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);  
        }
    }
    
    
    
    async displayGames() {
        try {
            const productsToDisplay = this.searchTerm
                ? await this.productService.getProductByName(this.searchTerm) // Chama o método de busca
                : this.allGames.slice(
                      this.currentPage * this.gamesPerPage,
                      (this.currentPage + 1) * this.gamesPerPage
                  ); // Exibe a página atual
    
            const products = Array.isArray(productsToDisplay) ? productsToDisplay : [productsToDisplay];
    
            const gameGrid = document.querySelector('.game-grid');
            if (gameGrid) gameGrid.innerHTML = ''; // Limpa o conteúdo existente, se necessário
    
            products.forEach((product: Product) => {
                // Garante que imgSrc seja diretamente utilizável
                const imageSrc = product.imgSrc;
                const gameCard = `
                    <div class="game card" onclick="updateHighlight('${product.nome}', '${product.preco}', '${imageSrc}', '${product.descricao}', '')">
                        <img src="${product.imgSrc}" alt="${product.nome}" loading="lazy">
                        <h3>${product.nome}</h3>
                        <p>$${product.preco} | </p>
                    </div>
                `;
                if (gameGrid) gameGrid.innerHTML += gameCard; // Adiciona o jogo à grid
            });
        } catch (error) {
            console.error('Erro ao carregar os jogos:', error);
        }
    }
    
    

    private async searchGames(): Promise<void> {
        this.searchTerm = (document.getElementById('search-input') as HTMLInputElement).value; // Atualiza searchTerm
        
        try {
            this.currentPage = 0; // Reseta a página para os resultados da pesquisa
            await this.displayGames(); // Exibe os resultados da pesquisa
        } catch (error) {
            console.error('Erro ao buscar jogos:', error);
        }
    }

    private loadMoreGames(): void {
        this.currentPage++; // Incrementa a página atual
        this.displayGames(); // Exibe a próxima página de jogos
    }

    public updateHighlight(title: string, info: string, price: string, imgSrc: string, summary: string, trailerUrl: string | undefined): void {
        document.getElementById("highlight-title")!.textContent = title;
        document.getElementById("highlight-info")!.textContent = info;
        document.getElementById("highlight-price")!.textContent = price;
        (document.getElementById("highlight-img") as HTMLImageElement).src = imgSrc; // Usa o caminho completo da imagem
        document.getElementById("summary-text")!.textContent = summary;
        
        const trailerContainer = document.getElementById("trailer-container")!;
        const trailerVideo = document.getElementById("trailer-video") as HTMLVideoElement;
        
        if (trailerUrl) {
            trailerVideo.src = trailerUrl;
            trailerContainer.style.display = 'block'; // Exibe o trailer
        } else {
            trailerContainer.style.display = 'none'; // Oculta o trailer
        }
        
        document.getElementById("game-summary")!.style.display = 'block'; // Exibe o resumo do jogo
    }
    


    
    public updateHeroWithFirstProduct(): void {
        // Verifica se há produtos disponíveis
        if (this.allGames.length > 0) {
            const firstGame = this.allGames[0]; // Obtém o primeiro produto da lista
            console.log('Primeiro produto:', firstGame);
    
            const highlightImg = document.getElementById("highlight-img") as HTMLImageElement;
            if (highlightImg) {
                console.log('URL da imagem a ser carregada:', firstGame.imgSrc);
                highlightImg.src = firstGame.imgSrc; // Certifique-se de que imgSrc está correto
            } else {
                console.warn('Elemento highlight-img não encontrado no DOM');
            }
    
            // Atualiza os elementos da seção Hero com as informações do primeiro produto
            document.getElementById("highlight-title")!.textContent = firstGame.nome;
            document.getElementById("highlight-info")!.textContent = ` ${firstGame.getDescricao()}`;
            document.getElementById("highlight-price")!.textContent = `${firstGame.preco.toFixed(2)}`; // Formata o preço com duas casas decimais
    
            // Atualiza o resumo do jogo
            document.getElementById("summary-text")!.textContent = firstGame.descricao;
    
            document.getElementById("game-summary")!.style.display = 'block'; // Exibe o resumo do jogo
        } else {
            console.warn('Nenhum produto disponível em allGames');
        }
    }
    
    
}
