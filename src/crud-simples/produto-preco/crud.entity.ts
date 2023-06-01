import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ProdutoPreco extends BaseModelCrud {

    @Column()
    produtoId: number;

    @Column()
    produtoName: string;

    @Column()
    ano: number;

    @Column()
    mes: number;

    @Column()
    unidadeMedidaEstoqueId: number;

    @Column()
    unidadeMedidaEstoqueName: string;

    @Column()
    unidadeMedidaEstoqueSigla: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    precoEstoque: number;


    
    @Column()
    unidadeMedidaCompraId: number;

    @Column()
    unidadeMedidaCompraName: string;

    @Column()
    unidadeMedidaCompraSigla: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    precoCompra: number;

    @Column()
    dataMaximaPrecoCompra: Date;



    @Column()
    unidadeMedidaProducaoId: number;

    @Column()
    unidadeMedidaProducaoName: string;

    @Column()
    unidadeMedidaProducaoSigla: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    custoMateriaPrima: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    custoServico: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    custoDireto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    custoIndireto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    custoFabricacao: number;
}
