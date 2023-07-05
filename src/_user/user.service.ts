import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./user.entity";
import { GrupoAcessoUsuario } from "./grupo-usuario.entity";
import { GrupoAcessoPermissao } from "./grupo-permissao.entity";
import { Realm } from "./realm.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User>{

    constructor (
        @InjectRepository(User) repo,
        @InjectRepository(GrupoAcessoUsuario) protected repoGrupos,
        @InjectRepository(GrupoAcessoPermissao) protected repoPermissoes,
        @InjectRepository(Realm) protected repoRealms,
        private readonly mailerService: MailerService)
    {
        super(repo)
    }

    async hasPermissao(iduser: number, permissaoCode: string, realmId: number){

        const realm = await this.repoRealms.findOne({where:{id: realmId}})
        
        if (!realm) return false
   
        if (realm.created_by === iduser) return true

        const grps = await this.repoGrupos.find({where: {userId: iduser, realmId: realmId}})

        if (permissaoCode == '*') return grps.length > 0 ? true : false

        for (let index = 0; index < grps.length; index++) {
            const grp = grps[index];
            
            const perm = await this.repoPermissoes.findOne({where: {permissaoAcessoCode:permissaoCode, grupoAcessoId: grp.grupoAcessoId, realmId: realmId}})

            if (perm) return true
        }

        return false
    }

    async perfilsAcesso(req: any, user: any){

        const realms = await this.repoRealms.find({where:{created_by: user.id}})

        let data = []
        let listRealms = {}

        realms.forEach(realm => {
            data.push({
                id: realm.id,
                name: realm.name,
                description: "Proprietário do Grupo de Empresas"
            })
            listRealms['id'+ realm.id] = realm.id
        });

        const grps = await this.repoGrupos.find({where: {userId: user.id}})
        grps.forEach(realm => {
            if (!listRealms['id'+ realm.realmId]){
                data.push({
                    id: realm.realmId 
                    , name: realm.empresaName
                    , description: realm.grupoAcessoName})
                listRealms['id' + realm.id] = realm.id
            }
        });

        return {
            data: data
        }
    }


    async findByWhere(where: any){
      
        return this.repo.find({where: where})
    }

    async changePerfil(req: any, user: any, realmId: number){

        const hasPerm = await this.hasPermissao(user.id, '*', realmId)

        if (hasPerm){
            this.repo.save({
                id: user.id, realmId: realmId
            })
        }

        return {realmId: realmId}
    }

}