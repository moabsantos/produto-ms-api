import { Module } from "@nestjs/common";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserPasswordService } from './user-password.service';
import { UserPassword } from "./user-password.entity";
import { UserPasswordController } from './user-password.controller';
import { EmailModule } from '../_mail/mailer.module';
import { GrupoAcessoUsuario } from "./grupo-usuario.entity";
import { GrupoAcessoPermissao } from "./grupo-permissao.entity";
import { Realm } from "./realm.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, GrupoAcessoUsuario, GrupoAcessoPermissao, Realm, UserPassword]),
        EmailModule
    ],
    controllers:[UserController, UserPasswordController],
    providers:[UserService, UserPasswordService],
    exports:[UserService, UserPasswordService]
})
export class UserModule {}