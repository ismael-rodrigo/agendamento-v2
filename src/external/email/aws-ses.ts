import { Right, Left } from './../../shared/errors-handler/either';

import { Either } from '../../shared/errors-handler/either';
import { AppError } from '../../shared/errors-handler/errors/app-error';
import { EmailOptions, IEmailService } from './../../modules/_ports/providers/email/email-service.interface';


import  { SendEmailCommand,  SESClient } from "@aws-sdk/client-ses"


export class EmailServiceSESImplementation implements IEmailService{
    constructor(){}
    async send(options: EmailOptions) : Promise< Either<AppError, EmailOptions>> {
        const client = new SESClient({
            region:'us-east-1',
            credentials:{
                accessKeyId:process.env.AWS_ACCESS_KEY ? process.env.AWS_ACCESS_KEY:'',
                secretAccessKey:process.env.AWS_SECRET_KEY ? process.env.AWS_SECRET_KEY:''
            }
        })
        
        const command = new SendEmailCommand({
            Destination: {
              ToAddresses: [
                options.to,
              ],
            },
            Message: {
              Body: {
                Text: { 
                  Charset: "UTF-8",
                  Data: options.text ,
                },
                Html: {
                  Charset: "UTF-8",
                  Data: options.html,
                },

              },
              Subject: {
                Charset: "UTF-8",
                Data: options.subject ,
              },
            },
            Source: 'Agenda Facil <ismael@bael.com.br>',
          });
          const result = await client.send(command)

          if(result.MessageId){
            return Right.create(options)
          }
          return Left.create(new AppError('Email error','SEND_EMAIL_ERROR'))
        };
        

        

    }


