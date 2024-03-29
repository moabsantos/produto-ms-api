import { Body, Controller, HttpStatus, Post, UseInterceptors } from "@nestjs/common";
import { Crud, CrudRequest, CrudRequestInterceptor, ParsedRequest } from "@nestjsx/crud";
import { UserRequest } from "src/_auth/user.decorator";
import { BaseCrudController } from "src/_shared/base-crud.controller";
import { UserService } from "src/_user/user.service";
import { RealmUser } from "./crud-user.entity";
import { RealmUserService } from "./crud-user.service";
import { RealmService } from "./crud.service";


@Crud({
    model:{
        type: RealmUser
    },
    routes:{
        createOneBase: {
            returnShallow: false
        },
        only: ["createOneBase", "getOneBase", "getManyBase", "deleteOneBase"],
    }
})
@Controller('realm-user')
export class RealmUserController extends BaseCrudController{
    constructor(public service: RealmUserService,
        protected realmService: RealmService,
        protected userService: UserService) {
        super(service, userService)
    }

    @Post()
    @UseInterceptors(CrudRequestInterceptor)
    async createOne(@ParsedRequest() req: CrudRequest, @UserRequest() authToken: any, @Body() body: any){

        const userAuth: any = await this.getDetailToken(req, authToken.token)
  
        if (!userAuth.realmId || userAuth.realmId == 0){
            
            const realmUserAuth = await this.realmService.addRealmToUser(req, userAuth)

            let user: any = await this.userService.findByWhere({id: userAuth.userId})

            user[0].realmId = realmUserAuth.id
            await this.userService.updateOne(req, user[0])
            userAuth.realmId = realmUserAuth.id

        }

        let relmUser = await this.service.findByWhere({
            userId: userAuth.userId, 
            isAdmin: true, 
            originId: userAuth.realmId
        })

        if (!relmUser || relmUser.length == 0){
            
            return {
                status: HttpStatus.UNAUTHORIZED,
                error: 'O usuário não tem permissão para cadastro de usuário neste ambiente',
            }

        }

        const userPost = await this.userService.findByWhere({email: body.email})

        let newUser: {id: number};

        if (!userPost || userPost.length == 0){
            newUser = await this.userService.createOne(req, {
                name: 'aguardando primeiro login...',
                email: body.email,
                checked: false
            })
            
        }else{
            newUser = userPost[0]
        }

        const jaExiste = await this.service.findByWhere({
            userId: newUser.id, 
            originId: userAuth.realmId
        })

        if (jaExiste && (jaExiste.length > 0)){
            return jaExiste[0]
        }

        return this.service.save(req, userAuth, {
            userId: newUser.id, 
            isAdmin: false, 
            originId: userAuth.realmId
        })

    }
}