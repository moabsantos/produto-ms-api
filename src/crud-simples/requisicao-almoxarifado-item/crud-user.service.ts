import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RequisicaoAlmoxarifadoItemUser } from "./crud-user.entity";

@Injectable()
export class RequisicaoAlmoxarifadoItemUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RequisicaoAlmoxarifadoItemUser) protected repo)
    {
        super(repo)
    }

}