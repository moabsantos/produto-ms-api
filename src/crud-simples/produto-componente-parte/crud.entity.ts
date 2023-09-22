import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class ProdutoComponenteParte extends BaseModelCrud {

    @Column({nullable: false})
    produtoComponenteId: number;

    @Column({nullable: false})
    sequencia: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0, nullable: false})
    quantidade: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0, nullable: false})
    consumoX: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0, nullable: false})
    consumoY: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    consumo: number;

    @Column()
    nomeParte: string;

}