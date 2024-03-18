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
    


    @Column()
    setorId: number;

    @Column()
    setorCode: string;

    @Column()
    setorName: string;

    @Column()
    setorDescription: string;

    @Column({nullable: true})
    setorSigla: string;



    @Column({default: 0})
    flagPrincipal: number;

    @Column({default: 0})
    flagBaixaEstoque: number;

    @Column({default: 0})
    flagProducao: number;

    @Column({default: 0})
    flagAjusteInventario: number;

    @Column({default: 0})
    flagFornecedor: number;

    @Column({default: 0})
    flagCliente: number;

}