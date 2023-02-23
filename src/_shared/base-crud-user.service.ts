import { InjectRepository } from "@nestjs/typeorm";
import { BaseModelUser } from "./base-model-user";
import { CustomService } from './custom.service';

export class BaseCrudUserService extends CustomService<BaseModelUser>{

    constructor (
        @InjectRepository(BaseModelUser) protected repo)
    {
        super(repo)
    }

}