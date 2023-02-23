import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class UnidadeMedida extends BaseModelCrud {

    @Column()
    sigla: string;

}