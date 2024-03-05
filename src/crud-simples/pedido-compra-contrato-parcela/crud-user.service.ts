import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoCompraContratoParcelaUser } from "./crud-user.entity";

@Injectable()
export class PedidoCompraContratoParcelaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoCompraContratoParcelaUser) protected repo)
    {
        super(repo)
    }

}