import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoVendaItemUser } from "./crud-user.entity";

@Injectable()
export class PedidoVendaItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoVendaItemUser) protected repo)
    {
        super(repo)
    }

}