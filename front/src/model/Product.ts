class Product {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imgSrc: string;   
    videoSrc:string;
  
    constructor(id: number, nome: string, descricao: string, preco:number, imgSrc: string, videoSrc:string) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.preco = preco;
      this.imgSrc = imgSrc;
      this.videoSrc = videoSrc;
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

  }
  
  // Chamando a função para carregar os jogos
  export default Product;