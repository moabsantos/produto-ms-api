import { Column, Entity, } from "typeorm";
import { BaseModel } from "./base-model.entity";

@Entity()
export class BaseModelUser extends BaseModel {

    @Column()
    originId: number;

    @Column()
    userId: number;

    @Column()
    isAdmin: boolean;

}