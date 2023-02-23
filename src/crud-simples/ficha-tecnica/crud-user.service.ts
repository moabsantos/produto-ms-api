import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseCrudUserService } from "src/_shared/base-crud-user.service";
import { FichaTecnicaUser } from "./crud-user.entity";

@Injectable()
export class FichaTecnicaUserService extends BaseCrudUserService{

    constructor (
        @InjectRepository(FichaTecnicaUser) protected repo
    ) 
    {
        super(repo)
    }

}