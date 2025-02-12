import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class ProdutoBase extends BaseModelCrud {

    @Column()
    endDescription: string;

    @Column({nullable: true})
    produtoGrupoId: number;

    @Column({nullable: true})
    produtoGrupoCode: string;

    @Column({nullable: true})
    produtoGrupoName: string;

    @Column({nullable: true})
    produtoGrupoSigla: string;

}