import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RequisicaoAlmoxarifadoUser } from "./crud-user.entity";

@Injectable()
export class RequisicaoAlmoxarifadoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RequisicaoAlmoxarifadoUser) protected repo)
    {
        super(repo)
    }

}