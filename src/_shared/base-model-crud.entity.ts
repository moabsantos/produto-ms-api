import { Column, Entity, Unique } from "typeorm";
import { BaseModel } from "./base-model.entity";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class BaseModelCrud extends BaseModel {

    @Column({nullable: false})
    name: string;

    @Column()
    description: string;

    @Column({nullable:true})
    idImage: string;

    @Column()
    realmId: number;

}