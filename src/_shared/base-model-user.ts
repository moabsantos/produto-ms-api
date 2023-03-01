import { Column, Entity, Unique, } from "typeorm";
import { BaseModel } from "./base-model.entity";

@Entity()
@Unique("uniq_name", ["originId", "userId"])
export class BaseModelUser extends BaseModel {

    @Column()
    originId: number;

    @Column()
    userId: number;

    @Column()
    isAdmin: boolean;

}