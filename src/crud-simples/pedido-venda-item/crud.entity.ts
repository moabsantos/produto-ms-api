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

    @Column()
    clienteSigla: string;

    @Column()
    cnpj: string;

    @Column()
    inscricaoEstadual: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;

    @Column()
    bairro: string;

    @Column()
    cidadeId: number;

    @Column()
    cidadeName: string;

    @Column()
    cidadeSigla: string;


    @Column()
    itemVendaId: number;

    @Column()
    itemVendaName: string;

    @Column()
    itemVendaSigla: string;

    @Column()
    itemVendaDescription: string;

    @Column()
    quantidadeSolicitada: number;

    @Column()
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