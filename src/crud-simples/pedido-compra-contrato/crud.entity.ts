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


    @Column({default: '0'})
    numeroMatricula: string;
    @Column({default: '0'})
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


    @Column({nullable: true})
    centroFinanceiroId: number;
    @Column({nullable: true})
    centroFinanceiroName: string;
    @Column({nullable: true})
    centroFinanceiroCode: string;
    @Column({nullable: true})
    centroFinanceiroSigla: string;


    @Column()
    despesaFinanceiraId: number;
    @Column()
    despesaFinanceiraCode: string;
    @Column()
    despesaFinanceiraName: string;
    @Column()
    despesaFinanceiraSigla: string;


    @Column({default: 0})
    qtdParcelas: number;
    @Column({nullable: true})
    regraIntervaloParcelas: string;
    @Column()
    primeiroVencimento: Date;


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

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotalParcela: number;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotalPago: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotalSaldo: number;


    @Column()
    status: string;

    @Column()
    site: string;

    @Column({default: 0})
    gerarParcelaAutomaticamente: number;

}