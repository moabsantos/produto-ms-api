import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CustosDia extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    ano: number;

    @Column()
    mes: number;

    @Column()
    data: Date;

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
    flagServico: number;  

    @Column()
    unidadeMedidaId: number;    

    @Column()
    unidadeMedidaName: string;

    @Column()
    unidadeMedidaSigla: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeRealizada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadePrevista: number;   

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorRealizado: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorPrevisto: number;   
     
}