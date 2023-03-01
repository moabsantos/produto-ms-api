import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { PermissaoAcessoUser } from "./crud-user.entity";

@Injectable()
export class PermissaoAcessoUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(PermissaoAcessoUser) protected repo)
    {
        super(repo)
    }

}