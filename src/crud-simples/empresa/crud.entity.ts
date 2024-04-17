import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Empresa extends BaseModelCrud {

    @Column()
    sigla: string;

    @Column({nullable: true})
    cidadeId: number;

    @Column({nullable: true})
    cidadeCode: string;

    @Column({nullable: true})
    cidadeName: string;

    @Column({nullable: true})
    cidadeSigla: string;

    @Column({nullable: true})
    cidadeUfSigla: string;

}