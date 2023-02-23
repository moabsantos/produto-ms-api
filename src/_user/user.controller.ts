import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Crud({
    model:{type: User},
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["getOneBase"],
    }})
@Controller('user')
export class UserController {

    constructor(public service: UserService){}
    
}