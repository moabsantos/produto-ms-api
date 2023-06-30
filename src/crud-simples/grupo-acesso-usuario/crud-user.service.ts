import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { GrupoAcessoUsuarioUser } from "./crud-user.entity";

@Injectable()
export class GrupoAcessoUsuarioUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(GrupoAcessoUsuarioUser) protected repo)
    {
        super(repo)
    }

}