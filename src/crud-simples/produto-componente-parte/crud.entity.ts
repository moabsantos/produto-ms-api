import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class ProdutoComponenteParte extends BaseModelCrud {

    @Column()
    produtoComponenteId: number;

    @Column()
    sequencia: number;

    @Column()
    quantidade: number;

    @Column()
    consumo: number;

    @Column()
    nomeParte: string;

}