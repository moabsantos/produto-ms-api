import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class GrupoAcesso extends BaseModelCrud {

    @Column()
    sigla: string;

}