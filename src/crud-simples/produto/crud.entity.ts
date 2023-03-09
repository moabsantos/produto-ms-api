import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Produto extends BaseModelCrud {

    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;


    @Column({nullable: true})
    unidadeMedidaCompraId: number;

    @Column({nullable: true})
    unidadeMedidaCompraName: string;

    @Column({nullable: true})
    unidadeMedidaCompraSigla: string;


    @Column({default: 0})
    flagServico: number;

}