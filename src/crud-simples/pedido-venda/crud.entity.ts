import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class PedidoVenda extends BaseModelCrud {

    @Column()
    clienteId: number;

    @Column()
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;

    @Column()
    clienteEstabelecimentoId: number;

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

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeItens: number; 

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorDesconto: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    valorTotal: number;



    @Column({default: 0})
    prioridadeId: number;

    @Column({nullable: true})
    prioridadeCode: string;

    @Column({nullable: true})
    prioridadeName: string;

    @Column({default: 0})
    prioridadeSequencia: number;

    @Column({nullable: true})
    prioridadeCor: string;



    @Column({default: 0})
    pedidoStatusId: number;

    @Column({nullable: true})
    pedidoStatusCode: string;

    @Column({nullable: true})
    pedidoStatusName: string;

    @Column({default: 0})
    pedidoStatusflagPendente: number;

    @Column({default: 0})
    pedidoStatusflagAprovado: number;

    @Column({default: 0})
    pedidoStatusflagEmProducao: number;

    @Column({default: 0})
    pedidoStatusflagEmTransito: number;

    @Column({default: 0})
    pedidoStatusflagEntregue: number;

    @Column({default: 0})
    pedidoStatusflagFinalizado: number;

    @Column({nullable: true})
    pedidoStatusCor: string;

}
