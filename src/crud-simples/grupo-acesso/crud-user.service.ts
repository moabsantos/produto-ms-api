import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { GrupoAcessoUser } from "./crud-user.entity";

@Injectable()
export class GrupoAcessoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(GrupoAcessoUser) protected repo)
    {
        super(repo)
    }

}