import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class DepositoRequisicao extends BaseModelCrud {

    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;
    

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


    @Column()
    loteId: number;

    @Column()
    loteCodigo: string;


    @Column()
    setorId: number;

    @Column()
    setorName: string;

    @Column({nullable: true})
    setorSigla: string;


    @Column()
    depositoIdOrigem: number;

    @Column()
    depositoCodeOrigem: string;

    @Column()
    depositoNameOrigem: string;

    @Column({nullable: true})
    depositoSiglaOrigem: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeFornecedorOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadePedidaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeFaturadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeRecebidaOrigem: number;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeDisponivelOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeRequisitadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSeparadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregueOrigem: number;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReservadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeBloqueadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReprovadaOrigem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeAprovadaOrigem: number;


    @Column()
    depositoIdDestino: number;

    @Column()
    depositoCodeDestino: string;

    @Column()
    depositoNameDestino: string;

    @Column({nullable: true})
    depositoSiglaDestino: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeDisponivelDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeRequisitadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSeparadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregueDestino: number;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeFornecedorDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadePedidaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeFaturadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeRecebidaDestino: number;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReservadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeBloqueadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeReprovadaDestino: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeAprovadaDestino: number;  
    

    @Column()
    origemRequisicaoName: string;
    @Column()
    origemRequisicaoId: number;
}