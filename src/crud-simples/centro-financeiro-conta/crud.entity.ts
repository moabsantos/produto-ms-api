import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class CentroFinanceiroConta extends BaseModelCrud {

    @Column({nullable: true})
    sigla: string;


    @Column()
    centroFinanceiroId: number;

    @Column()
    centroFinanceiroCode: string;

    @Column()
    centroFinanceiroName: string;

    @Column({nullable: true})
    centroFinanceiroSigla: string;

    @Column({nullable: true})
    centroFinanceiroDescription: string;

}