import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DominioImagem extends BaseModelCrud {

    @Column()
    dominioColecaoId: number;

    @Column()
    dominioId: number;

    @Column()
    dominioName: string;

    @Column()
    fileName: string;

    @Column()
    flagCapa: boolean;

}