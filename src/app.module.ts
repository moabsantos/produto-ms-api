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

import { EstagioModule } from './crud-simples/estagio/module';
import { SetorModule } from './crud-simples/setor/module';
import { EmpresaModule } from './crud-simples/empresa/module';
import { CustosMensaisModule } from './crud-simples/custos-mensais/module';
import { CustosDiaModule } from './crud-simples/custos-dia/module';
import { CustosMensaisFacadeModule } from './facade/custos-mensais/module';
import { GrupoAcessoModule } from './crud-simples/grupo-acesso/module';
import { PermissaoAcessoModule } from './crud-simples/permissao-acesso/module';
import { ClienteModule } from './crud-simples/cliente/module';
import { FornecedorModule } from './crud-simples/fornecedor/module';
import { FormaPagamentoModule } from './crud-simples/forma-pagamento/module';
import { PedidoVendaModule } from './crud-simples/pedido-venda/module';
import { PaisModule } from './crud-simples/pais/module';
import { UFModule } from './crud-simples/uf/module';
import { CidadeModule } from './crud-simples/cidade/module';
import { ClienteEstabelecimentoModule } from './crud-simples/cliente-estabelecimento/module';
import { PedidoVendaItemModule } from './crud-simples/pedido-venda-item/module';
import { ProdutoComponenteModule } from './crud-simples/produto-componente/module';
import { OrdemProducaoModule } from './crud-simples/ordem-producao/module';
import { OrdemProducaoItemModule } from './crud-simples/ordem-producao-item/module';
import { DepositoModule } from './crud-simples/deposito/module';
import { PrioridadeModule } from './crud-simples/prioridade/module';
import { PedidoStatusModule } from './crud-simples/pedido-status/module';
import { ProdutoGrupoModule } from './crud-simples/produto-grupo/module';
import { DepositoRequisicaoModule } from './crud-simples/deposito-requisicao/module';
import { ProducaoDiaModule } from './crud-simples/producao-dia/module';
import { ProdutoPrecoModule } from './crud-simples/produto-preco/module';
import { RequisicaoAlmoxarifadoModule } from './crud-simples/requisicao-almoxarifado/module';
import { RequisicaoAlmoxarifadoItemModule } from './crud-simples/requisicao-almoxarifado-item/module';
import { GrupoAcessoPermissaoModule } from './crud-simples/grupo-acesso-permissao/module';
import { GrupoAcessoUsuarioModule } from './crud-simples/grupo-acesso-usuario/module';
import { PedidoCompraModule } from './crud-simples/pedido-compra/module';
import { PedidoCompraItemModule } from './crud-simples/pedido-compra-item/module';



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

    PermissaoAcessoModule,
    GrupoAcessoModule,
    GrupoAcessoPermissaoModule,
    GrupoAcessoUsuarioModule,

    PedidoStatusModule,
    PrioridadeModule,

    DepositoModule,
    DepositoRequisicaoModule,

    PaisModule,
    UFModule,
    CidadeModule,
    ClienteModule,
    ClienteEstabelecimentoModule,
    PedidoVendaModule,
    PedidoVendaItemModule,

    OrdemProducaoModule,
    OrdemProducaoItemModule,

    FornecedorModule,
    FormaPagamentoModule,

    EmpresaModule,
    UnidadeMedidaModule,
    EstagioModule,
    SetorModule,

    ProdutoGrupoModule,
    ProdutoModule,
    ProdutoPrecoModule,
    ProdutoComponenteModule,

    RequisicaoAlmoxarifadoModule,
    RequisicaoAlmoxarifadoItemModule,

    PedidoCompraModule,
    PedidoCompraItemModule,

    CustosDiaModule,
    CustosMensaisModule,
    CustosMensaisFacadeModule,

    ProducaoDiaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
