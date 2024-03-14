import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
export class RequisicaoAlmoxarifadoItem extends BaseModelCrud {



    @Column()
    requisicaoAlmoxarifadoId: number;

    @Column({nullable: true})
    requisicaoAlmoxarifadoCode: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoName: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoSigla: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoDescription: string;



    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteId: number;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteName: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteSigla: string;


    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteEstabelecimentoId: number;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteEstabelecimentoName: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteCep: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteCidadeName: string;

    @Column({nullable: true})
    requisicaoAlmoxarifadoClienteCidadeUfSigla: string;



    @Column()
    dataSolicitacao: Date;

    @Column()
    dataAprovacao: Date;

    @Column()
    dataSeparacao: Date;

    @Column()
    dataEntrega: Date;



    @Column()
    sequencia: number;


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
    itemAgrupador: number;

    @Column()
    requisicaoAlmoxarifadoItemIdOrigem: number;

    @Column()
    sequenciaFicha: number;


    @Column()
    unidadeMedidaId: number;

    @Column()
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;


    @Column()
    setorId: number;

    @Column()
    setorName: string;

    @Column({nullable: true})
    setorSigla: string;


    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSolicitada: number;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeEntregue: number;

    @Column()
    recebedor: string;

    @Column({default: 'Pendente'})
    statusItem: string;

}