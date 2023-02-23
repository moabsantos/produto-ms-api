import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { UnidadeMedidaUser } from "./crud-user.entity";

@Injectable()
export class UnidadeMedidaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(UnidadeMedidaUser) protected repo)
    {
        super(repo)
    }

}