import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RequisicaoAlmoxarifado extends BaseModelCrud {


    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;
    

    @Column()
    dataSolicitacao: Date;

    @Column()
    dataEntrega: Date;

}