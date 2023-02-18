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
            html:this.makeHTML({date , hour , user })
        }

        return emailOptions
    }

    private static makeHTML({date , hour , user }:makeEmailScheduleStructureParams){
        const html = `
        <html lang="pt-BR" style="font-family: 'Century Gothic', CenturyGothic, Geneva, AppleGothic, sans-serif;">
            <body style="
                    background-color: aliceblue;
                    justify-content: center;
                    align-items: start;
                    display: flex;
                    padding:0px;
                    width: 100%;
                    margin:0px">
        
                <div  style="
                margin-top: 30px;
                width: 60%;
                min-width: 400px;"  >
        
                    <div style="border-radius:5px; background-color:#97BC62FF;
                    " >
                        <div style="padding: 10px;">
                            <h1 style="color: aliceblue;
                            padding: 0px;
                            margin: 0px;
                            font-weight: 400;
                            text-align: center;">
                                Agendamento concluído
                            </h1>
                        </div>
            
                        <div  style="
                        width: auto;
                        height: 1px;
                        background-color: #dfdfdf;
                        padding: 0px 10px;" ></div>
            
                        <div style="background-color: #dadada !important; 
                        background-image:none;
                        line-height: 25px;
                        padding: 30px;">
                            Olá Ismael Rodrigo, o seu agendamento para o serviço "<b>Emissão de CPF</b>" foi marcado para o dia <b>12/11/2023</b> as <b>13:20</b> horas.
                            O centro de atendimento se encontra na rua <b>Primeiro de julho</b>, número <b>30</b>. Quando chegar lembre-se de informar ao atendente o seu CPF ou Número do
                            atendimento, o número do seu atendimento é <b>67355</b>.
                            <br>
                            <br>
                            Obrigado pela preferência, atenciosamente : <br>
                            - Prefeitura de Redenção
                        </div>
                        <div  style="
                        width: auto;
                        height: 1px;
                        background-color: #dfdfdf;
                        padding: 0px 10px;" ></div>
                        <br>
                        <div style=" display: flex;
                        justify-content: center;">
                            <img  src="https://agendafacilredencao.com/assets/logo.5c19cfec.png" alt="">
                        </div>
                        </div>
                    </div>
            </body>
        </html>`

        return html
    }

    private static makeText({date , hour , user }:makeEmailScheduleStructureParams){

    }



}