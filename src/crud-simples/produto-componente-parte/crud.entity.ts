import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class ProdutoComponenteParte extends BaseModelCrud {

    @Column()
    produtoComponenteId: number;

    @Column()
    sequencia: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidade: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    consumo: number;

    @Column()
    nomeParte: string;

}