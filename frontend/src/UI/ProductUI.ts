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
        this.attachEventListeners();
        this.displayGames(); // Exibe os jogos após o carregamento
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

    private async loadProducts(): Promise<void> {
        try {
            const productsData = await this.productService.getAllProducts();
            this.allGames = productsData.map((data: any) => 
                new Product(data.id, data.nome, data.descricao, data.preco, data.genero, data.img)
            ); // Mapeia os dados para instâncias de Product
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    }

    async displayGames() {
        try {
            const productsToDisplay = this.searchTerm
                ? await this.productService.getProductByName(this.searchTerm) // Chama o método de busca
                : this.allGames.slice(this.currentPage * this.gamesPerPage, (this.currentPage + 1) * this.gamesPerPage); // Exibe a página atual

            // Verifique se o resultado é um array
            const products = Array.isArray(productsToDisplay) ? productsToDisplay : [productsToDisplay];

            const gameGrid = document.querySelector('.game-grid');
            if (gameGrid) gameGrid.innerHTML = ''; // Limpa o conteúdo existente, se necessário

            products.forEach((product: Product) => {
                const gameCard = `
                    <div class="game card" onclick="updateHighlight('${product.nome}', '${product.genero}', '${product.preco}', '${product.img}', '${product.descricao}', '')">
                        <img src="${product.img}" alt="${product.nome}">
                        <h3>${product.nome}</h3>
                        <p>$${product.preco} | ${product.genero}</p>
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

    private updateHighlight(title: string, info: string, price: string, imgSrc: string, summary: string, trailerUrl: string | undefined): void {
        document.getElementById("highlight-title")!.textContent = title;
        document.getElementById("highlight-info")!.textContent = info;
        document.getElementById("highlight-price")!.textContent = price;
        (document.getElementById("highlight-img") as HTMLImageElement).src = imgSrc; // Certifique-se de fazer o cast para HTMLImageElement
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
}
