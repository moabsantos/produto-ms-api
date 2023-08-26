import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RepresentanteUsuarioUser } from "./crud-user.entity";

@Injectable()
export class RepresentanteUsuarioUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RepresentanteUsuarioUser) protected repo)
    {
        super(repo)
    }

}