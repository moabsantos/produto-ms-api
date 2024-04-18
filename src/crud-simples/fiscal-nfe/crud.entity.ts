import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class FiscalNfe extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;

    // CABECALHO

    @Column({nullable: true})
    geralCodigoUF: string; // Código da UF do emitente do Documento Fiscal

    @Column({nullable: true})
    geralUF: string;

    @Column({nullable: true})
    geralCodigo: string; // o. Número aleatório gerado pelo emitente para cada NF-e

    @Column({nullable: true})
    geralNumero: string; // Número do Documento Fiscal

    @Column({nullable: true})
    geralDataEmissao: Date; // AAAA-MM-DDThh:mm:ssTZD Ex 2024-04-02T05:10:00-03:00

    @Column({nullable: true})
    geralDataSaidaEntrada: Date; // AAAA-MM-DDThh:mm:ssTZD Ex 2024-04-02T05:10:00-03:00
    


    // CONFORME SERIE
    @Column()
    fiscalSerieId: number;

    @Column()
    fiscalSerieName: string;

    @Column({nullable: true})
    fiscalSerieSigla: string;

    @Column({nullable: true})
    geralCodModelo: string; // 55=NF-e emitida em substituição ao modelo 1 ou 1A ou 65=NFC-e

    @Column({nullable: true})
    geralSerie: string; // Série do Documento Fiscal




    // CONFORME NATUREZA DA OPERACAO
    @Column()
    fiscalNaturezaOperacaoId: number;

    @Column()
    fiscalNaturezaOperacaoName: string;

    @Column({nullable: true})
    fiscalNaturezaOperacaoSigla: string;

    @Column({nullable: true})
    geralNaturezaOperacao: string; // venda, compra, transferência, devolução, importação, consignação, remessa

    @Column({nullable: true})
    geralCodTipo: string; // 0=Entrada; 1=Saída

    @Column({nullable: true})
    geralCodFinalidade: string; // 1=NF-e normal; 2=NF-e complementar; 3=NF-e de ajuste; 4=Devolução de mercadoria.

    @Column({nullable: true})
    geralCodIndicadorFinal: string; // 0=Normal; 1=Consumidor final;


    // CONFORME EMPRESA
    @Column({nullable: true})
    geralCodTipoAmbiente: string; // 1=Produção; 2=Homologação

    @Column({nullable: true, comment: ""})
    geralCodDestino: string; // 1=Operação interna; 2=Operação interestadual; 3=Operação com exterior. {conforme uf}

    @Column({nullable: true})
    geralCodMunicipio: string; // Informar o município de ocorrência do fato gerador do ICMS



    @Column({nullable: true})
    geralCodTipoImpressao: string; // 0=Sem geração de DANFE; 1=DANFE normal, Retrato; 2=DANFE normal, Paisagem; 3=DANFE Simplificado; 4=DANFE NFC-e; 5=DANFE NFC-e em mensagem eletrônica

    @Column({nullable: true})
    geralCodTipoEmissao: string; // 1=Emissão norma 2=Contingência FS-IA 3=Contingência SCAN 4=Contingência EPEC 5=Contingência FS-DA 6=Contingência SVC-AN  7=Contingência SVC-RS 9=Contingência off-line da NFC-e

    @Column({nullable: true})
    geralDigitoVerificador: string; // Informar o DV da Chave de Acesso da NF-e

    @Column({nullable: true})
    geralCodIndicadorPresenca: string; // 0=Não se aplica 1=Operação presencial; 2=Operação não presencial, pela Internet; 3=Operação não presencial, Teleatendimento; 
                                       // 4=NFC-e em operação com entrega a domicílio;
                                       // 5=Operação presencial, fora do estabelecimento; (incluído NT2016.002)
                                       // 9=Operação não presencial, outros



    // CONFORME APLICATIVO     
    @Column({nullable: true, default: 0})
    geralCodProcessoEmissao: string; // 0=Emissão de NF-e com aplicativo do contribuinte;
                                     // 1=Emissão de NF-e avulsa pelo Fisco;
                                     // 2=Emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco;
                                     // 3=Emissão NF-e pelo contribuinte com aplicativo fornecido pelo Fisco.

    @Column({nullable: true, default: "1.1.1"})
    geralVersao: string;              // Informar a versão do aplicativo emissor de NF-e



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


    @Column({nullable: true})
    geralStatus: string;
}