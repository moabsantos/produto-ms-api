import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoCompraUser } from "./crud-user.entity";

@Injectable()
export class PedidoCompraUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoCompraUser) protected repo)
    {
        super(repo)
    }

}