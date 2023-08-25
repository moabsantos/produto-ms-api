import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DepositoInventario extends BaseModelCrud {

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
    depositoInventarioId: number;

    @Column()
    depositoInventarioCode: string;

    @Column()
    depositoInventarioName: string;

    @Column({nullable: true})
    depositoInventarioSigla: string;



    @Column({nullable: true})
    itemId: number;

    @Column({nullable: true})
    itemCode: string;

    @Column({nullable: true})
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


    @Column({nullable: true})
    itemPartialName: string;


    
    @Column()
    dataInicio: Date;

    @Column()
    dataTermino: Date;

    @Column({default: 1})
    sequencia: number;

    @Column()
    status: string;

}