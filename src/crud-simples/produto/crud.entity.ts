import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Produto extends BaseModelCrud {

    @Column()
    endDescription: string;

    @Column()
    produtoBaseComplemento: string;

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


    @Column({nullable: true})
    produtoBaseId: number;

    @Column({nullable: true})
    produtoBaseCode: string;

    @Column({nullable: true})
    produtoBaseName: string;

    @Column({nullable: true})
    produtoBaseSigla: string;


    @Column({nullable: true})
    produtoCorId: number;

    @Column({nullable: true})
    produtoCorCode: string;

    @Column({nullable: true})
    produtoCorName: string;

    @Column({nullable: true})
    produtoCorSigla: string;


    @Column({nullable: true})
    produtoMaterialId: number;

    @Column({nullable: true})
    produtoMaterialCode: string;

    @Column({nullable: true})
    produtoMaterialName: string;

    @Column({nullable: true})
    produtoMaterialSigla: string;


    @Column({default: 0})
    flagServico: number;

    @Column({default: 0})
    flagProdutoAcabado: number;

}