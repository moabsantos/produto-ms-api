import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoCompraContratoUser } from "./crud-user.entity";

@Injectable()
export class PedidoCompraContratoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoCompraContratoUser) protected repo)
    {
        super(repo)
    }

}