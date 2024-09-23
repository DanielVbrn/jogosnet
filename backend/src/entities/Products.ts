import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable:false})
    nome!: string

    @Column()
    descricao!:string

    @Column()
    preco!:number

};