import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Produto extends BaseModelCrud {

    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;


    @Column({nullable: true})
    unidadeMedidaCompraId: number;

    @Column({nullable: true})
    unidadeMedidaCompraName: string;

    @Column({nullable: true})
    unidadeMedidaCompraSigla: string;


    @Column({nullable: true})
    produtoGrupoId: number;

    @Column({nullable: true})
    produtoGrupoCode: string;

    @Column({nullable: true})
    produtoGrupoName: string;

    @Column({nullable: true})
    produtoGrupoSigla: string;    

    @Column({default: 0})
    flagServico: number;

    @Column({default: 0})
    flagProdutoAcabado: number;

}