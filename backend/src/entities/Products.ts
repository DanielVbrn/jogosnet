import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    nome!: string;

    @Column()
    descricao!: string;

    @Column("float") // Muda de number para float
    preco!: number; // Você pode manter o tipo como number, pois o TypeORM irá lidar com isso

    @Column() // Certifique-se de que a coluna imgSrc seja do tipo string
    imgSrc!: string; // Adicione o tipo e o ponto e vírgula
}
