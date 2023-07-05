import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoCompraItemUser } from "./crud-user.entity";

@Injectable()
export class PedidoCompraItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoCompraItemUser) protected repo)
    {
        super(repo)
    }

}