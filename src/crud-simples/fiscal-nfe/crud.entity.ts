import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class FiscalNfe extends BaseModelCrud {

    @Column({nullable: true})
    sigla: string;

}