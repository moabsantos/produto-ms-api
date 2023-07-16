import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RequisicaoCompra extends BaseModelCrud {


    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;


    @Column()
    depositoIdOrigem: number;

    @Column()
    depositoCodeOrigem: string;

    @Column()
    depositoNameOrigem: string;

    @Column({nullable: true})
    depositoSiglaOrigem: string;


    @Column()
    depositoIdDestino: number;

    @Column()
    depositoCodeDestino: string;

    @Column()
    depositoNameDestino: string;

    @Column({nullable: true})
    depositoSiglaDestino: string;


    @Column()
    dataSolicitacao: Date;

    @Column({nullable: true})
    dataEntrega: Date;

    @Column({default: 'Pendente'})
    statusItem: string;
}