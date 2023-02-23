import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Produto extends BaseModelCrud {

    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;

}