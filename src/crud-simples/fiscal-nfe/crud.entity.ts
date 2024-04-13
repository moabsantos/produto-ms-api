import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class FiscalNfe extends BaseModelCrud {

    // CABECALHO

    @Column({nullable: true})
    geralCodigoUF: string;

    @Column({nullable: true})
    geralUF: string;

    @Column({nullable: true})
    geralCodigo: string;

    @Column({nullable: true})
    geralNaturezaOperacao: string;

    @Column({nullable: true})
    geralCodModelo: string;

    @Column({nullable: true})
    geralSerie: string;

    @Column({nullable: true})
    geralNumero: string;

    @Column({nullable: true})
    geralDataEmissao: Date;

    @Column({nullable: true})
    geralDataSaidaEntrada: Date;

    @Column({nullable: true})
    geralCodTipo: string;

    @Column({nullable: true})
    geralCodDestino: string;

    @Column({nullable: true})
    geralCodMunicipio: string;

    @Column({nullable: true})
    geralCodTipoImpressao: string;

    @Column({nullable: true})
    geralCodTipoEmissao: string;

    @Column({nullable: true})
    geralDigitoVerificador: string;

    @Column({nullable: true})
    geralCodTipoAmbiente: string;

    @Column({nullable: true})
    geralCodFinalidade: string;

    @Column({nullable: true})
    geralCodIndicadorFinal: string;

    @Column({nullable: true})
    geralCodIndicadorPresenca: string;

    @Column({nullable: true})
    geralCodProcessoEmissao: string;

    @Column({nullable: true})
    geralVersao: string;

    // EMITENTE

    @Column({nullable: true})
    emitenteCpfCnpj: string;

    @Column({nullable: true})
    emitenteRazaoSocial: string;

    @Column({nullable: true})
    emitenteNomeFantasia: string;

    @Column({nullable: true})
    emitenteIndInscricaoEstadual: string;

    @Column({nullable: true})
    emitenteInscricaoEstadual: string;

    @Column({nullable: true})
    emitenteInscricaoMunicipal: string;

    @Column({nullable: true})
    emitenteInscricaoSUFRAMA: string;

    @Column({nullable: true})
    emitenteCnae: string;

    @Column({nullable: true})
    emitenteCrt: string;

    @Column({nullable: true})
    emitenteLogo: string;

    @Column({nullable: true})
    emitenteEmail: string;

    @Column({nullable: true})
    emitenteEnderecoLogradouro: string;

    @Column({nullable: true})
    emitenteEnderecoNumero: string;

    @Column({nullable: true})
    emitenteEnderecoCep: string;

    @Column({nullable: true})
    emitenteEnderecoComplemento: string;

    @Column({nullable: true})
    emitenteEnderecoBairro: string;

    @Column({nullable: true})
    emitenteEnderecoCodMunicipio: string;

    @Column({nullable: true})
    emitenteEnderecoNomeMunicipio: string;

    @Column({nullable: true})
    emitenteEnderecoUF: string;

    @Column({nullable: true})
    emitenteEnderecoCodPais: string;

    @Column({nullable: true})
    emitenteEnderecoNomePais: string;

    @Column({nullable: true})
    emitenteEnderecoFone: string;

    // DESTINATARIO

    @Column({nullable: true})
    destinatarioCpfCnpj: string;

    @Column({nullable: true})
    destinatarioNome: string;

    @Column({nullable: true})
    destinatarioIndInscricaoEstadual: string;

    @Column({nullable: true})
    destinatarioInscricaoEstadual: string;

    @Column({nullable: true})
    destinatarioInscricaoMunicipal: string;

    @Column({nullable: true})
    destinatarioInscricaoSUFRAMA: string;

    @Column({nullable: true})
    destinatarioEmail: string;

    @Column({nullable: true})
    destinatarioEnderecoLogradouro: string;

    @Column({nullable: true})
    destinatarioEnderecoNumero: string;

    @Column({nullable: true})
    destinatarioEnderecoCep: string;

    @Column({nullable: true})
    destinatarioEnderecoComplemento: string;

    @Column({nullable: true})
    destinatarioEnderecoBairro: string;

    @Column({nullable: true})
    destinatarioEnderecoCodMunicipio: string;

    @Column({nullable: true})
    destinatarioEnderecoNomeMunicipio: string;

    @Column({nullable: true})
    destinatarioEnderecoUF: string;

    @Column({nullable: true})
    destinatarioEnderecoCodPais: string;

    @Column({nullable: true})
    destinatarioEnderecoNomePais: string;

    @Column({nullable: true})
    destinatarioEnderecoFone: string;

    // INFORMACAO ADICIONAL

    @Column({nullable: true})
    informacoesFisco1: string;

    @Column({nullable: true})
    informacoesFisco2: string;

    @Column({nullable: true})
    informacoesComplementares1: string;

    @Column({nullable: true})
    informacoesComplementares2: string;

}