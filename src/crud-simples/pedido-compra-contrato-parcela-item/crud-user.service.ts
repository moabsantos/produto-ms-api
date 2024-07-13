import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoCompraContratoParcelaItemUser } from "./crud-user.entity";

@Injectable()
export class PedidoCompraContratoParcelaItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoCompraContratoParcelaItemUser) protected repo)
    {
        super(repo)
    }

}