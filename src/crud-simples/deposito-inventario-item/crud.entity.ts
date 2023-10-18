import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DepositoInventarioItem extends BaseModelCrud {

    @Column()
    depositoInventarioId: number;

    @Column()
    empresaId: number;

    @Column()
    empresaCode: string;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;


    @Column()
    depositoId: number;

    @Column()
    depositoCode: string;

    @Column()
    depositoName: string;

    @Column({nullable: true})
    depositoSigla: string;



    @Column()
    itemGrupoId: number;

    @Column()
    itemGrupoCode: string;

    @Column()
    itemGrupoName: string;

    @Column({nullable: true})
    itemGrupoSigla: string;



    @Column()
    itemId: number;

    @Column({nullable: true})
    itemCode: string;

    @Column()
    itemName: string;

    @Column({nullable: true})
    itemSigla: string;

    @Column({nullable: true})
    itemDescription: string;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaCode: string;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;



    @Column()
    loteId: number;

    @Column()
    loteCodigo: string;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeImagem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeContagem: number;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeContagem1: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeContagem2: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeContagem3: number;

    
    @Column()
    dataInicio: Date;

    @Column()
    dataTermino: Date;

    @Column()
    status: string;

}