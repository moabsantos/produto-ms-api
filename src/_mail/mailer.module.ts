import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigGlobais } from "src/config";
import { Mail } from "src/_mail/mail.entity";

@Module({
    imports: [
      MailerModule.forRootAsync({

        useFactory: () => ({

          transport: {
            host: ConfigGlobais.MAILER_HOST,
            port: ConfigGlobais.MAILER_PORT,
            secure: true,
            auth: {
              user: ConfigGlobais.MAILER_USER,
              pass: ConfigGlobais.MAILER_PASSWORD,
            },     
          },

          defaults: {
            from: '"nest-modules" <modules@nestjs.com>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
      }),
      TypeOrmModule.forFeature([Mail])
    ],
    providers:[
      MailService
    ],
    exports:[
      MailService
    ]
  })
  export class EmailModule {}