import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class TipoDocumento extends BaseModelCrud {

    @Column()
    sigla: string;

    @Column({default: 0})
    flagParcelaRecalculaContrato: number;
    
}