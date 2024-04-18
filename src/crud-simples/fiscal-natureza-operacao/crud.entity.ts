import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class FiscalNaturezaOperacao extends BaseModelCrud {

    @Column({nullable: true})
    sigla: string;

    @Column({nullable: true})
    geralCodTipo: string; // 0=Entrada; 1=Saída

    @Column({nullable: true})
    geralCodFinalidade: string; // 1=NF-e normal; 2=NF-e complementar; 3=NF-e de ajuste; 4=Devolução de mercadoria.

    @Column({nullable: true})
    geralCodIndicadorFinal: string; // 0=Normal; 1=Consumidor final;

    @Column()
    fiscalSerieId: number;

    @Column()
    fiscalSerieName: string;

    @Column({nullable: true})
    fiscalSerieSigla: string;

}