import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class OrdemProducao extends BaseModelCrud {

    @Column()
    pedidoVendaId: number;

    @Column()
    clienteId: number;

    @Column()
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;

    @Column()
    clienteEstabelecimentoId: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeItens: number; 

}
