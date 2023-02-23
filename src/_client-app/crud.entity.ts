
import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class ClientApp extends BaseModelCrud{

    @Column({nullable: false})
    realmId: number;

}