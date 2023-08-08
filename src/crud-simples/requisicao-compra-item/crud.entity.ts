import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RequisicaoCompraItem extends BaseModelCrud {

    @Column()
    dataSolicitacao: Date;

    @Column()
    dataAprovacao: Date;

    @Column()
    dataPedido: Date;


    @Column()
    requisicaoCompraId: number;

    @Column()
    sequencia: number;


    @Column()
    itemId: number;

    @Column()
    itemCode: string;

    @Column()
    itemName: string;

    @Column({nullable: true})
    itemSigla: string;

    @Column({nullable: true})
    itemDescription: string;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;


    @Column()
    setorId: number;

    @Column()
    setorName: string;

    @Column({nullable: true})
    setorSigla: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSolicitada: number;


    @Column({default: 'Pendente'})
    statusItem: string;

    @Column()
    pedidoCompraId: number;

    @Column()
    pedidoCompraCode: string;

}