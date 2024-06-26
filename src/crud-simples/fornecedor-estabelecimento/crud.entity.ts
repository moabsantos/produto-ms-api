import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["fornecedorId", "code", "realmId"])
export class FornecedorEstabelecimento extends BaseModelCrud {

    @Column()
    fornecedorId: number;

    @Column()
    fornecedorCode: string;

    @Column()
    fornecedorName: string;

    @Column({nullable: true})
    fornecedorSigla: string;



    @Column({nullable: true})
    cnpj: string;

    @Column({nullable: true})
    indInscricaoEstadual: string;

    @Column({nullable: true})
    inscricaoEstadual: string;

    @Column({nullable: true})
    inscricaoMunicipal: string;

    @Column({nullable: true})
    inscricaoSUFRAMA: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    telefone: string;

    @Column({nullable: true})
    endereco: string;

    @Column({nullable: true})
    numero: string;

    @Column({nullable: true})
    cep: string;

    @Column({nullable: true})
    bairro: string;

    @Column({nullable: true})
    complemento: string;    



    @Column({nullable: true})
    cidadeId: number;

    @Column({nullable: true})
    cidadeCode: string;

    @Column({nullable: true})
    cidadeName: string;

    @Column({nullable: true})
    cidadeSigla: string;

    @Column({nullable: true})
    cidadeUfSigla: string;



    @Column({nullable: true})
    representanteId: number;

    @Column({nullable: true})
    representanteCode: string;

    @Column({nullable: true})
    representanteName: string;

    @Column({nullable: true})
    representanteSigla: string;


    @Column({default: 0})
    flagPrincipal: number;
}