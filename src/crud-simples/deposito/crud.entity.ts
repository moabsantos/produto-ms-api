import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Deposito extends BaseModelCrud {

    @Column({nullable: true})
    sigla: string;

    @Column()
    empresaId: number;

    @Column()
    empresaCode: string;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;
    

    @Column({default: 0})
    flagPrincipal: number;

    @Column({default: 0})
    flagBaixaEstoque: number;

}