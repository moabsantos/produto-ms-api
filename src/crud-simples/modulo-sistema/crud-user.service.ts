import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { ModuloSistemaUser } from "./crud-user.entity";

@Injectable()
export class ModuloSistemaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(ModuloSistemaUser) protected repo)
    {
        super(repo)
    }

}