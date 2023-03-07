import { BaseModelCrud } from "src/_shared/base-model-crud.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique("uniq_name", ["name", "realmId"])
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
    unidadeMedidaName: string;

    @Column({nullable: true})
    unidadeMedidaSigla: string;



    @Column()
    quantidadeSolicitada: number;

    @Column({default: 0})
    quantidadeEntregue: number;

    @Column()
    valorInicialItem: number;

    @Column()
    percentDescontoItem: number;

    @Column()
    valorItem: number;

    @Column()
    valorTotalItem: number;

}