import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["code", "name", "realmId"])
export class RequisicaoAlmoxarifado extends BaseModelCrud {


    @Column()
    empresaId: number;

    @Column()
    empresaName: string;

    @Column({nullable: true})
    empresaSigla: string;



    @Column()
    requisicaoGrupoId: number;

    @Column()
    requisicaoGrupoName: string;

    @Column({nullable: true})
    requisicaoGrupoSigla: string;



    @Column({nullable: true})
    clienteId: number;

    @Column({nullable: true})
    clienteName: string;

    @Column({nullable: true})
    clienteSigla: string;


    @Column({nullable: true})
    clienteEstabelecimentoId: number;

    @Column({nullable: true})
    clienteEstabelecimentoName: string;

    @Column({nullable: true})
    clienteCep: string;

    @Column({nullable: true})
    clienteCidadeName: string;

    @Column({nullable: true})
    clienteCidadeUfSigla: string;


    @Column()
    depositoIdOrigem: number;

    @Column()
    depositoCodeOrigem: string;

    @Column()
    depositoNameOrigem: string;

    @Column({nullable: true})
    depositoSiglaOrigem: string;


    @Column()
    depositoIdDestino: number;

    @Column()
    depositoCodeDestino: string;

    @Column()
    depositoNameDestino: string;

    @Column({nullable: true})
    depositoSiglaDestino: string;


    @Column()
    setorId: number;

    @Column()
    setorName: string;

    @Column({nullable: true})
    setorSigla: string;


    @Column()
    dataSolicitacao: Date;

    @Column({nullable: true})
    dataEntrega: Date;

    @Column({default: 'Pendente'})
    statusItem: string;



    @Column({nullable: true})
    itemIdProdutoFinal: number;

    @Column({nullable: true})
    itemCodeProdutoFinal: string;

    @Column({nullable: true})
    itemNameProdutoFinal: string;

    @Column({nullable: true})
    itemSiglaProdutoFinal: string;

    @Column({nullable: true})
    itemDescriptionProdutoFinal: string;

    @Column({nullable: true})
    unidadeMedidaIdProdutoFinal: number;

    @Column({nullable: true})
    unidadeMedidaNameProdutoFinal: string;

    @Column({nullable: true})
    unidadeMedidaSiglaProdutoFinal: string;

    @Column({type: 'decimal', precision: 20, scale: 6, default: 0})
    quantidadeSolicitadaProdutoFinal: number;

    @Column({default: 1})
    alternativaProdutoFinal: number;
}