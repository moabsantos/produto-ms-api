import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoCompraContrato extends BaseModelCrud {

    @Column()
    pedidoCompraId: number;

    @Column()
    fornecedorId: number;
    @Column()
    fornecedorName: string;

    @Column()
    formaPagamentoId: number;
    @Column()
    formaPagamentoName: string;

    @Column()
    qtdParcelas: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorMercadoria: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorServico: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorDesconto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorFrete: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorOutrosAcrescimos: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorOutrasDeducoes: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotal: number;

}