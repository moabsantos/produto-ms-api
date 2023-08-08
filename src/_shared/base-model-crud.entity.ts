import { Column, Entity } from "typeorm";
import { BaseModel } from "./base-model.entity";

@Entity()
export class BaseModelCrud extends BaseModel {

    @Column({nullable: true})
    code: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable:true})
    idImage: string;

    @Column({default: 0})
    realmId: number;

    @Column({default: 0})
    idUserSelecao: number;

}