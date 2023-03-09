import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class OrdemProducaoItem extends BaseModelCrud {

    @Column()
    ordemProducaoId: number;

    @Column()
    sequencia: number;

    
    @Column({nullable: true})
    clienteId: number;

    @Column({nullable: true})
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;


    @Column({nullable: true})
    cidadeId: number;

    @Column({nullable: true})
    cidadeName: string;

    @Column({nullable: true})
    cidadeSigla: string;


    @Column()
    produtoId: number;

    @Column()
    produtoName: string;

    @Column({nullable: true})
    produtoSigla: string;

    @Column({nullable: true})
    produtoDescription: string;


    @Column()
    estagioId: number;

    @Column()
    estagioName: string;

    @Column({nullable: true})
    estagioSigla: string;

    @Column({nullable: true})
    estagioDescription: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSolicitada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregue: number;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;
}