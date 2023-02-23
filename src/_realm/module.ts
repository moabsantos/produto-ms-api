import { HttpModule } from "@nestjs/axios/dist";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudModule } from "src/_shared/base-crud.module";
import { UserModule } from "src/_user/user.module";
import { RealmUserController } from "./crud-user.controller";
import { RealmUser } from "./crud-user.entity";
import { RealmUserService } from "./crud-user.service";
import { RealmController } from "./crud.controller";
import { Realm } from "./crud.entity";
import { RealmService } from "./crud.service";


@Module({
    imports: [
        HttpModule,
        UserModule,
        TypeOrmModule.forFeature([Realm, RealmUser]),
        BaseCrudModule
    ],
    controllers:[RealmController, RealmUserController],
    providers:[RealmService, RealmUserService],
    exports:[RealmService, RealmUserService]
})
export class RealmModule {}