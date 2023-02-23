import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CustosMensais extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    ano: number;

    @Column()
    mes: number;

    @Column()
    setorId: number;    

    @Column()
    setorName: string;

    @Column()
    setorSigla: string;

    @Column()
    itemDespesaId: number;    

    @Column()
    itemDespesaName: string;

    @Column()
    unidadeMedidaId: number;    

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;

    @Column({default: 0})
    valorRealizado: number;

    @Column({default: 0})
    valorPrevisto: number;   

}