import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoCompraItem extends BaseModelCrud {

    @Column()
    dataSolicitacao: Date;

    @Column()
    dataAprovacao: Date;

    @Column()
    dataSeparacao: Date;

    @Column()
    dataEntrega: Date;

    @Column()
    pedidoCompraId: number;

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

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregue: number;


    @Column({default: 'Pendente'})
    statusItem: string;



    @Column({nullable: true})
    itemNameFornecedor: string;

    @Column({nullable: true})
    unidadeMedidaFornecedor: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeFornecedor: number;

    @Column({type: 'decimal', precision: 20, scale: 10, default: 0})
    fatorConversaoQuantidadeFornecedor: number;

    @Column({nullable: true})
    itemDescriptionFornecedor: string;


}