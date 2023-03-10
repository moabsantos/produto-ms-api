import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Prioridade extends BaseModelCrud {

    @Column({default: 0})
    sequencia: number;

    @Column({nullable: true})
    cor: string;

}