import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { RepresentanteClienteUser } from "./crud-user.entity";

@Injectable()
export class RepresentanteClienteUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(RepresentanteClienteUser) protected repo)
    {
        super(repo)
    }

}