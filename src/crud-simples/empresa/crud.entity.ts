import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class Empresa extends BaseModelCrud {

    @Column()
    sigla: string;





    @Column({nullable: true})
    cpfCnpj: string;

    @Column({nullable: true})
    razaoSocial: string;

    @Column({nullable: true})
    nomeFantasia: string;

    @Column({nullable: true})
    codTipoAmbienteNfe: string;

    @Column({nullable: true})
    indInscricaoEstadual: string;

    @Column({nullable: true})
    inscricaoEstadual: string;

    @Column({nullable: true})
    inscricaoMunicipal: string;

    @Column({nullable: true})
    inscricaoSUFRAMA: string;

    @Column({nullable: true})
    cnae: string;

    @Column({nullable: true})
    crt: string;

    @Column({nullable: true})
    logo: string;

    @Column({nullable: true})
    email: string;


    
    @Column({nullable: true})
    enderecoFone: string;

    @Column({nullable: true})
    enderecoLogradouro: string;

    @Column({nullable: true})
    enderecoNumero: string;

    @Column({nullable: true})
    enderecoCep: string;

    @Column({nullable: true})
    enderecoComplemento: string;

    @Column({nullable: true})
    enderecoBairro: string;



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

}