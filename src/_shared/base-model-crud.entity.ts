import { Column, Entity, Unique } from "typeorm";
import { BaseModel } from "./base-model.entity";

@Entity()
export class BaseModelCrud extends BaseModel {

    @Column()
    code: string;

    @Column({nullable: false})
    name: string;

    @Column()
    description: string;

    @Column({nullable:true})
    idImage: string;

    @Column()
    realmId: number;

}