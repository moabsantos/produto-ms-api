import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["sequencia", "name", "realmId"])
export class PedidoVendaItem extends BaseModelCrud {

    @Column()
    pedidoVendaId: number;

    @Column()
    clienteId: number;

    @Column()
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;

    @Column({nullable: true})
    cnpj: string;

    @Column({nullable: true})
    inscricaoEstadual: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    telefone: string;

    @Column({nullable: true})
    endereco: string;

    @Column({nullable: true})
    numero: string;

    @Column({nullable: true})
    bairro: string;

    @Column()
    cidadeId: number;

    @Column()
    cidadeName: string;

    @Column({nullable: true})
    cidadeSigla: string;


    @Column({default: 1})
    sequencia: number;

    @Column()
    itemVendaId: number;

    @Column()
    itemVendaName: string;

    @Column({nullable: true})
    itemVendaSigla: string;

    @Column({nullable: true})
    itemVendaDescription: string;



    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaCode: string;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;



    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSolicitada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregue: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorInicialItem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    percentDescontoItem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorDescontoItem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorItem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorSubTotalItem: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotalItem: number;


    @Column()
    dataSolicitacao: Date;

    @Column({nullable: true})
    dataEntrega: Date;

    @Column({default: 'Pendente'})
    statusItem: string;



    @Column()
    depositoOrigemId: number;

    @Column()
    depositoOrigemCode: string;

    @Column()
    depositoOrigemName: string;

    @Column({nullable: true})
    depositoOrigemSigla: string;

    @Column({nullable: true})
    depositoOrigemDescription: string;


    @Column()
    depositoDestinoId: number;

    @Column()
    depositoDestinoCode: string;

    @Column()
    depositoDestinoName: string;

    @Column({nullable: true})
    depositoDestinoSigla: string;

    @Column({nullable: true})
    depositoDestinoDescription: string;


    @Column({default: 1})
    idUserSelecao: number;
}