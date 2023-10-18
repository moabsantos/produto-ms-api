import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";

import { TipoDocumentoUser } from "./crud-user.entity";

@Injectable()
export class TipoDocumentoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(TipoDocumentoUser) protected repo)
    {
        super(repo)
    }

}