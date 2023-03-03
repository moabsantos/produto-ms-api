import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoVendaUser } from "./crud-user.entity";

@Injectable()
export class PedidoVendaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoVendaUser) protected repo)
    {
        super(repo)
    }

}