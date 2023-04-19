import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ProdutoComponente extends BaseModelCrud {

    @Column()
    produtoId: number;

    @Column()
    produtoName: string;

    @Column()
    numeroAlternativa: number;

    @Column()
    sequencia: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeProducao: number;

    @Column()
    unidadeMedidaProducaoId: number;

    @Column()
    unidadeMedidaProducaoName: string;

    @Column()
    unidadeMedidaProducaoSigla: string;

    @Column()
    estagioId: number;

    @Column()
    estagioName: string;

    @Column()
    estagioSigla: string;

    @Column()
    componenteId: number;

    @Column()
    componenteName: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    consumoProducao: number;

    @Column()
    unidadeMedidaConsumoId: number;

    @Column()
    unidadeMedidaConsumoName: string;

    @Column()
    unidadeMedidaConsumoSigla: string;


}
