import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class GrupoAcessoPermissao extends BaseModelCrud {

    @Column()
    grupoAcessoId: string;

    @Column()
    grupoAcessoCode: string;

    @Column()
    grupoAcessoName: string;

    @Column()
    grupoAcessoSigla: string;

    @Column()
    grupoAcessoDescription: string;



    @Column()
    permissaoAcessoId: string;

    @Column()
    permissaoAcessoCode: string;

    @Column()
    permissaoAcessoName: string;

    @Column()
    permissaoAcessoDescription: string;
}