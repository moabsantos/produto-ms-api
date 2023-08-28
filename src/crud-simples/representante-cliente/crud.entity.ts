import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RepresentanteCliente extends BaseModelCrud {

    @Column()
    representanteId: number;

    @Column()
    representanteCode: string;

    @Column()
    representanteName: string;

    @Column({nullable: true})
    representanteSigla: string;


    @Column()
    empresaId: number;

    @Column()
    empresaCode: string;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;

    
    @Column()
    clienteId: number;

    @Column()
    clienteCode: string;

    @Column()
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;

}