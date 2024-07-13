import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoCompraContratoParcelaItem extends BaseModelCrud {

    @Column()
    pedidoCompraContratoParcelaId: number;

    @Column({default: 0})
    sequencia: number;
    @Column()
    code: string;
    @Column()
    name: string;


    @Column({default: 0})
    qtdParcelas: number;    
    @Column({default: 0})
    numParcelaInicial: number;
    @Column({default: 0})
    numParcelaFinal: number;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorPrimeiraParcela: number;
    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorParcela: number;
    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorUltimaParcela: number;
    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotal: number;

}