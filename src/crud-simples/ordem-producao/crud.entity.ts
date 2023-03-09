import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class OrdemProducao extends BaseModelCrud {

    @Column({nullable: true})
    pedidoVendaId: number;

    @Column({nullable: true})
    clienteId: number;

    @Column({nullable: true})
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeItens: number; 

}
