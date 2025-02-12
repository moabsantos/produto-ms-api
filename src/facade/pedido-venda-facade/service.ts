
import { Injectable } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { PedidoVendaItemService } from "src/crud-simples/pedido-venda-item/service";


@Injectable()
export class PedidoVendaFacadeService {

    constructor (
        private pedidoVendaItemServ: PedidoVendaItemService
    ){}


    async geraRequisicaoKitItem(req: CrudRequest, user: any, params: any){

        let itens = await this.pedidoVendaItemServ.getLista(
            req, user
            , {pedidoVendaId: params.pedidoVendaId, idUserSelecao: user.id, statusItem: 'Em Ordem'}
            , {fields:['id', 'pedidoVendaItem', 'quantidadeSolicitada', 'quantidadeOrdem']}
        )
        
        return []

    }

}