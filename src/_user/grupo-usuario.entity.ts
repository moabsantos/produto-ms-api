import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class GrupoAcessoUsuario extends BaseModelCrud {

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
    empresaId: number;

    @Column()
    empresaCode: string;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;


    @Column()
    userId: string;

    @Column()
    userEmail: string;

    @Column()
    userName: string;

}