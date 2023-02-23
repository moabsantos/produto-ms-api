import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Mail } from './mail.entity';

@Injectable()
export class MailService extends TypeOrmCrudService<Mail>{

    private readonly logger = new Logger(MailService.name);

    constructor(
        @InjectRepository(Mail) repo,
        private readonly mailerService: MailerService)
    {
        super(repo)
    }

    sendEMail(email: string, subject: string, context, template: string){
        this.mailerService
        .sendMail({
          to: email,
          from: 'noreply@nestjs.com',
          subject: subject,
          template: __dirname + '/../../views/mail/'+ template, // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
          context: context,
        })
        .then(() => {
            this.logger.log(`send to ${email}`);
        })
        .catch((error) => {
            this.logger.error(error)
        });
    }

}