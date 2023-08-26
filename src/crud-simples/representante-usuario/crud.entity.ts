import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RepresentanteUsuario extends BaseModelCrud {

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
    email: string;

    @Column()
    emailIdUsuario: number;

}