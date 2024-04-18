import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class FiscalSerie extends BaseModelCrud {

    @Column({nullable: true})
    sigla: string;

    @Column({nullable: true})
    codModelo: string; // 55=NF-e emitida em substituição ao modelo 1 ou 1A ou 65=NFC-e

    @Column({nullable: true})
    serie: string; // Série do Documento Fiscal

    @Column({nullable: true})
    proximoNumero: string; // Número do Documento Fiscal

}