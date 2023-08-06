import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DepositoItem extends BaseModelCrud {

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
    itemId: number;

    @Column()
    itemCode: string;

    @Column()
    itemName: string;

    @Column({nullable: true})
    itemSigla: string;

    @Column({nullable: true})
    itemDescription: string;



    @Column()
    itemGrupoId: number;

    @Column()
    itemGrupoCode: string;

    @Column()
    itemGrupoName: string;

    @Column({nullable: true})
    itemGrupoSigla: string;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeMinima: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeMaxima: number;

}