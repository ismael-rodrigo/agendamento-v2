import { EmailOptions } from '../../../../_ports/providers/email/email-service.interface';
import { CommomUserData } from '../../entity/common-user/commom-user-data';
import { HourAvailableData } from '../../entity/hours/hours-data';

export interface makeEmailScheduleStructureParams {
    user:CommomUserData
    hour:HourAvailableData
    date:Date
}


export class EmailScheduleStructure {
    private constructor(){}
    static make({date , hour , user }:makeEmailScheduleStructureParams):EmailOptions{

        const emailOptions:EmailOptions = {
            to: user.email,
            from:'Agendamento realizado com sucesso! '+'<ismael@bael.com.br>',
            subject:'Agendamento finalizado com sucesso!',
            text:'Agendamento concluido, parabens!',
            html:'<h1> Agenda Fácil | Prefeitura de Redenção </h1>'
        }

        return emailOptions
    }

    private static makeHTML({date , hour , user }:makeEmailScheduleStructureParams){

    }

    private static makeText({date , hour , user }:makeEmailScheduleStructureParams){

    }



}