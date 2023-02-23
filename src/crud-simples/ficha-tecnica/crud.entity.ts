import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class FichaTecnica extends BaseModelCrud {

    @Column()
    produtoId: number;

    @Column()
    produtoName: string;

    @Column()
    alternativaId: number;

    @Column()
    producao: number;

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

    @Column()
    consumo: number;

    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;


}