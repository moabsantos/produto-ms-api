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

}
