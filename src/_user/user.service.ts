import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "./user.entity";
import { GrupoAcessoUsuario } from "./grupo-usuario.entity";
import { GrupoAcessoPermissao } from "./grupo-permissao.entity";
import { Realm } from "./realm.entity";
import { GrupoAcessoModuloSistema } from "./grupo-modulo.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User>{

    constructor (
        @InjectRepository(User) repo,
        @InjectRepository(GrupoAcessoUsuario) protected repoGrupos,
        @InjectRepository(GrupoAcessoPermissao) protected repoPermissoes,
        @InjectRepository(GrupoAcessoModuloSistema) protected repoModulos,
        @InjectRepository(Realm) protected repoRealms,
        private readonly mailerService: MailerService)
    {
        super(repo)
    }

    async hasPermissao(iduser: number, permissaoCode: string, realmId: number){

        const realm = await this.repoRealms.findOne({where:{id: realmId}})
        
        if (!realm) return {status: false, error: true, message: "Realm é exigido"}
   
        if (realm.created_by === iduser) return {status: true, message: "Usuário administrador"}

        const grps = await this.repoGrupos.find({where: {userId: iduser, realmId: realmId}})

        if (permissaoCode == '*') return grps.length > 0 ? {status: true, message: "ok"} : {status: false, error: true, message:"Usuário fora de grupo"}

        for (let index = 0; index < grps.length; index++) {
            const grp = grps[index];
            
            const perm = await this.repoPermissoes.findOne({where: {permissaoAcessoCode:permissaoCode, grupoAcessoId: grp.grupoAcessoId, realmId: realmId}})

            if (perm) return {status: true, message: "Permissão encontrada"}
        }

        return {status: false, error: true, message: `Permissão ${permissaoCode} não encontrada para este usuário`}
    }

    async perfilsAcesso(req: any, user: any){

        const realms = await this.repoRealms.find({where:{created_by: user.id}})

        let data = []

        if (user.showGroupOwner == 1) realms.forEach(realm => {
            data.push({
                id: 0,
                name: realm.name,
                description: "Proprietário"
            })
        });

        const grps = await this.repoGrupos.find({where: {userId: user.id}})
        grps.forEach(grp => {
            data.push(grp)
        });

        return {
            data: data
        }
    }


    async findByWhere(where: any){
      
        return this.repo.find({where: where})
    }

    async checkRealmUser(req: any, user: any){

        const ownerRealm = await this.repoRealms.find({where:{created_by: user.id}})

        if (ownerRealm.length == 1 && user && user.realmId == 0) await this.repo.save({
            id: user.id,
            realmId: ownerRealm[0].id
        })

        if (ownerRealm.length == 0) await this.repoRealms.save({
                name: user.name,
                created_by: user.id
        })
    }

    async changePerfil(req: any, user: any, groupId: number){

        if (groupId == 0) {
            const ownerRealm = await this.repoRealms.find({where:{created_by: user.id}})

            if (ownerRealm && ownerRealm.length == 1){
                await this.repo.save({
                    id: user.id
                    , realmId: ownerRealm[0].id, realmName: ownerRealm[0].name
                    , empresaId: 0, empresaName: ownerRealm[0].name
                    , grupoId: 0, grupoName: 'Proprietário'
                })

                return {realmId: ownerRealm[0].id}
            }

            return
        }

        const grps = await this.repoGrupos.find({where: {userId: user.id, id: groupId}})
        if (!grps || !grps[0]) return {status: false, message: "Grupo Não encontrado"}

        const realmGrp = await this.repoRealms.find({where:{id: grps[0].realmId}})
        if (!realmGrp  || !realmGrp[0]) return {status: false, message: "Realm Não encontrado"}

        if (grps && grps.length == 1){
            await this.repo.save({
                id: user.id
                , realmId: grps[0].realmId, realmName: realmGrp[0].name
                , empresaId: grps[0].empresaId, empresaName: grps[0].empresaName
                , grupoId: grps[0].grupoAcessoId, grupoName: grps[0].grupoAcessoName
            })

            return grps[0]
        }

        return
    }

    async showGroupOwner(req: any, user: any, showGroup: number){

        return await this.repo.save({
            id: user.id,
            showGroupOwner: showGroup ? 1 : 0
        })

    }

    async getModulosSistema(req, user){

        const mds = await this.repoModulos.find({where: {grupoAcessoId: user.grupoId, realmId: user.realmId}})

        let modulo = {}
        mds.forEach(m => {
            modulo[m.moduloSistemaCode] = 1
        });

        return modulo
    }

    async getByEmail(email: any): Promise<any>{

        const resId = await this.repo.find({where:{email: email}})

        if (!resId || resId.length != 1) return

        return resId[0]
    }

}