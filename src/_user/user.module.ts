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
import { GrupoAcessoModuloSistema } from "./grupo-modulo.entity";
import { UserToken } from "./user-token.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, GrupoAcessoUsuario, GrupoAcessoPermissao, GrupoAcessoModuloSistema, Realm, UserPassword, UserToken]),
        EmailModule
    ],
    controllers:[UserController, UserPasswordController],
    providers:[UserService, UserPasswordService],
    exports:[UserService, UserPasswordService]
})
export class UserModule {}