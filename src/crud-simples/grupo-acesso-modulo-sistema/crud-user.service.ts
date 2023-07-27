import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { GrupoAcessoModuloSistemaUser } from "./crud-user.entity";

@Injectable()
export class GrupoAcessoModuloSistemaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(GrupoAcessoModuloSistemaUser) protected repo)
    {
        super(repo)
    }

}