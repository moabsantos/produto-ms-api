import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoStatus extends BaseModelCrud {


    @Column({default: 0})
    flagPendente: number;

    @Column({default: 0})
    flagAprovado: number;

}