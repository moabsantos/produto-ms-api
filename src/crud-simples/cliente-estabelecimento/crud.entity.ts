import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["clienteId", "code", "realmId"])
export class ClienteEstabelecimento extends BaseModelCrud {

    @Column()
    clienteId: number;

    @Column()
    clienteName: string;

    @Column()
    clienteSigla: string;



    @Column()
    cnpj: string;

    @Column()
    inscricaoEstadual: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;

    @Column()
    cep: string;

    @Column()
    bairro: string;



    @Column()
    cidadeId: number;

    @Column({nullable: true})
    cidadeName: string;

    @Column({nullable: true})
    cidadeSigla: string;

    @Column({nullable: true})
    cidadeUfSigla: string;
}