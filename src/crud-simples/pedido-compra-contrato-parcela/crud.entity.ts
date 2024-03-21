import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoCompraContratoParcela extends BaseModelCrud {

    @Column({nullable: true})
    pedidoCompraId: number;

    @Column()
    pedidoCompraContratoId: number;

    @Column()
    fornecedorId: number;
    @Column()
    fornecedorName: string;

    @Column()
    tipoDocumentoId: number;
    @Column()
    tipoDocumentoName: string;
    @Column()
    tipoDocumentoSigla: string;

    @Column()
    numeroDocumento: string;
    @Column()
    dataDocumento: Date;

    @Column()
    formaPagamentoId: number;
    @Column()
    formaPagamentoName: string;
    @Column()
    formaPagamentoSigla: string;

    @Column()
    numeroParcela: number;
    @Column()
    dataVencimento: Date;

    @Column()
    dataPrimeiraBaixa: Date;
    @Column()
    dataBaixa: Date;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorParcela: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorDesconto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorAcrescimo: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorPago: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorEstornado: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorSaldo: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorCredito: number;
    
}