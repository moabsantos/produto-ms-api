import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoCompraContrato extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;


    @Column({nullable: true})
    pedidoCompraId: number;

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
    numeroMatricula: string;
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
    centroCustoId: number;
    @Column()
    centroCustoName: string;
    @Column()
    centroCustoSigla: string;


    @Column()
    despesaFinanceiraId: number;
    @Column()
    despesaFinanceiraCode: string;
    @Column()
    despesaFinanceiraName: string;
    @Column()
    despesaFinanceiraSigla: string;


    @Column()
    qtdParcelas: number;
    @Column()
    primeiroVencimento: Date;

    @Column()
    proximaParcela: number;
    @Column()
    proximoVencimento: Date;
    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    proximoValor: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorMercadoria: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorServico: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorDesconto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorFrete: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorOutrosAcrescimos: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorOutrasDeducoes: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotal: number;


    @Column()
    status: string;

    @Column()
    site: string;

}