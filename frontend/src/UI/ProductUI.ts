import ProductService from '../services/service';
import Product from '../product';

export default class ProductUI {
    private productService: ProductService;
    private gameGrid: HTMLElement | null;
    private allGames: Product[] = [];
    private currentPage: number = 0;
    private gamesPerPage: number = 4;
    private searchTerm: string = '';
    private cart: Product[] = [];

    constructor() {
        this.productService = new ProductService();
        this.gameGrid = document.querySelector('#game-grid');
        this.loadCart();
    }

    async initializeApp(): Promise<void> {
        await this.loadProducts();
        this.updateHeroWithFirstProduct();
        this.attachEventListeners();
        this.displayGames();
        this.updateCartDisplay();
    
        (window as any).updateHighlight = this.updateHighlight.bind(this);
    }
    

    private loadCart() {
        // Tente carregar o carrinho do localStorage ou sessionStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        } else {
            this.cart = [];
        }
    }

    private attachEventListeners(): void {
        const searchBtn = document.getElementById('search-btn');
        const viewMoreBtn = document.getElementById('view-more');
        const checkoutBtn = document.getElementById('checkout-btn');
    
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchGames());
        }
    
        if (viewMoreBtn) {
            viewMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.displayGames();
            });
        }
    
    }
    
    

    private async loadProducts(): Promise<void> {
        try {
            const productsData = await this.productService.getAllProducts();
            this.allGames = productsData.map((data: any) => {
                return new Product(data.id, data.nome, data.descricao, data.preco, data.imgSrc);
            });
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    }

    async displayGames(): Promise<void> {
        if (!this.gameGrid) return;

        this.gameGrid.innerHTML = '';

        const productsToDisplay = this.allGames.slice(
            this.currentPage * this.gamesPerPage,
            (this.currentPage + 1) * this.gamesPerPage
        );

        productsToDisplay.forEach((product: Product) => {
            const gameCard = document.createElement('div');
            gameCard.className = 'card';
            gameCard.addEventListener('click', () => this.updateHighlight(product.nome, product.descricao, product.preco, product.imgSrc ));

            const addToCartButton = document.createElement('button');
            addToCartButton.className = "btn"
            addToCartButton.textContent = 'Adicionar ao Carrinho';
            addToCartButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede o clique de disparar o `updateHighlight`
                this.addToCart(product);
            });

            gameCard.innerHTML = `
                <img src="${product.imgSrc}" alt="${product.nome}" loading="lazy">
                <h3>${product.nome}</h3>
                <p>$${product.preco}</p>
            `;
            gameCard.appendChild(addToCartButton);
            this.gameGrid!.appendChild(gameCard);
        });
    }

    public async searchGames(): Promise<void> {
        const searchInput = document.querySelector("#search-input") as HTMLInputElement;
        const gameCards = document.querySelectorAll("#game-grid .card"); // Seleciona todos os cards de jogos
        
        if (!searchInput || !gameCards) return;
    
        const searchTerm = searchInput.value.toLowerCase(); // Obtém o termo de busca em minúsculas
    
        gameCards.forEach((game: Element) => {
            const gameName = game.querySelector("h3")?.textContent?.toLowerCase(); // Obtém o nome do jogo
        
            if (gameName && gameName.includes(searchTerm)) {
                (game as HTMLElement).style.display = "block"; // Exibe o jogo se a busca corresponder
            } else {
                (game as HTMLElement).style.display = "none"; // Oculta o jogo se não corresponder
            }
        });
    }
    

    public updateHighlight(
        title: string,
        info: string,
        price: number,
        imgSrc: string,
    ): void {
        document.getElementById('highlight-title')!.textContent = title;
        document.getElementById('highlight-info')!.textContent = info;
        document.getElementById('highlight-price')!.textContent = `$${price}`;
        (document.getElementById('highlight-img') as HTMLImageElement).src = imgSrc;
    }

    public updateHeroWithFirstProduct(): void {
        if (this.allGames.length > 0) {
            const firstGame = this.allGames[0];
            (document.getElementById('highlight-img') as HTMLImageElement).src = firstGame.imgSrc;
            document.getElementById('highlight-title')!.textContent = firstGame.nome;
            document.getElementById('highlight-info')!.textContent = firstGame.descricao;
            document.getElementById('highlight-price')!.textContent = `$${firstGame.preco}`;
        }
    }

    // Adiciona o produto ao carrinho
    addToCart(product:Product) {
        this.cart.push(product);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Remover item do carrinho
    removeFromCart(itemId: number) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Salvar carrinho no localStorage
    private saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Atualiza a exibição do carrinho
    public updateCartDisplay(): void {
        const cartContainer = document.getElementById('cart-items')!;
        cartContainer.innerHTML = '';

        let total = 0;

        // Atualiza o contador de itens
        const cartCount = document.getElementById('cart-count')!;
        cartCount.textContent = this.cart.length.toString();  // Atualiza o número de itens

        this.cart.forEach((product) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${product.nome}</span>
                <span>$${product.preco}</span>
            `;
            cartContainer.appendChild(cartItem);
            total += product.preco;
        });

        // Atualiza o total no carrinho
        document.getElementById('cart-total')!.textContent = total.toFixed(2);
    }


    // Finaliza a compra
    public checkout(): void {
        if (this.cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        // Lógica de checkout aqui (pode ser uma integração com pagamento, etc)
        alert('Compra realizada com sucesso!');
        
        // Limpar o carrinho após a compra
        this.cart = [];
        sessionStorage.setItem('cart', JSON.stringify(this.cart)); // Limpa o carrinho no armazenamento
        this.updateCartDisplay(); // Atualiza a exibição do carrinho
    }

}
