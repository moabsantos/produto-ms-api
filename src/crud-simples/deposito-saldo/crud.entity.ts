import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DepositoSaldo extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;


    @Column()
    depositoId: number;

    @Column()
    depositoName: string;

    @Column({nullable: true})
    depositoSigla: string;

    
    @Column()
    itemId: number;

    @Column()
    itemName: string;

    @Column({nullable: true})
    itemSigla: string;

    @Column({nullable: true})
    itemDescription: string;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;


    @Column()
    loteId: number;

    @Column()
    loteCodigo: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeTotal: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeDisponivel: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReservada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeBloqueada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReprovada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeAprovada: number;
}