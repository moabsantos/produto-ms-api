import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { EmpresaUser } from "./crud-user.entity";

@Injectable()
export class EmpresaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(EmpresaUser) protected repo)
    {
        super(repo)
    }

}