import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoTipoUser } from "./crud-user.entity";

@Injectable()
export class PedidoTipoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoTipoUser) protected repo)
    {
        super(repo)
    }

}