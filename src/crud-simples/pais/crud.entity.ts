import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Pais extends BaseModelCrud {

    @Column()
    sigla: string;

    @Column()
    codigoIBGE: string;

}