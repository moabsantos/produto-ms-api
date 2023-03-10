import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { PedidoStatusUser } from "./crud-user.entity";

@Injectable()
export class PedidoStatusUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PedidoStatusUser) protected repo)
    {
        super(repo)
    }

}