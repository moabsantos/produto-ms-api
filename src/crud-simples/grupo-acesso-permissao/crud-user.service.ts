import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { GrupoAcessoPermissaoUser } from "./crud-user.entity";

@Injectable()
export class GrupoAcessoPermissaoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(GrupoAcessoPermissaoUser) protected repo)
    {
        super(repo)
    }

}