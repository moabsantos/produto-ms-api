import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './_auth/auth.module';
import { ClientAppModule } from './_client-app/module';
import { EmailModule } from 'src/_mail/mailer.module';
import { MyLoggerModule } from './_my-logger/module';
import { RealmModule } from './_realm/module';
import { DatabaseModule } from './_shared/database.module';
import { UnidadeMedidaModule } from './crud-simples/unidade-medida/module';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { ProdutoModule } from './crud-simples/produto/module';
import { FichaTecnicaModule } from './crud-simples/ficha-tecnica/module';
import { EstagioModule } from './crud-simples/estagio/module';
import { SetorModule } from './crud-simples/setor/module';
import { EmpresaModule } from './crud-simples/empresa/module';
import { CustosMensaisModule } from './crud-simples/custos-mensais/module';
import { CustosDiaModule } from './crud-simples/custos-dia/module';



@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),

    DatabaseModule,
    EmailModule,
    MyLoggerModule,

    AuthModule,
    RealmModule,
    ClientAppModule,

    EmpresaModule,
    UnidadeMedidaModule,
    EstagioModule,
    SetorModule,
    ProdutoModule,
    FichaTecnicaModule,

    CustosMensaisModule,
    CustosDiaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
