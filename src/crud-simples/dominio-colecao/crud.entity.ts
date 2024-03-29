import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DominioColecao extends BaseModelCrud {

    @Column()
    dominioId: number;

    @Column()
    dominioName: string;

    @Column({default: false})
    dominioValid: boolean;

}