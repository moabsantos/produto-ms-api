import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Setor extends BaseModelCrud {

    @Column()
    sigla: string;

}