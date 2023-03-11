import { CommonUserData } from '@domain/_entities/common-user/commom-user-data';
import { EmailOptions } from '@domain/_ports/providers/email/email-service.interface';

export class EmailRecoveryStructure {
    private constructor(){}
    static make(user:CommonUserData , token:string):EmailOptions{
        const emailOptions:EmailOptions = {
            to: user.email,
            from:'Recupere sua senha '+'<ismael@bael.com.br>',
            subject:'Clique no link e recupere sua senha',
            text:'recupere sua senha !',
            html:this.makeHTML(user, token)
        }
        return emailOptions
    }
    private static makeHTML(user:CommonUserData , url:string){
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
                                Recupere sua senha
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
                            Olá , ${user.name.split(' ')[0]}. Clique no link para recuperar sua senha <a href=${url}> ${url}</a>. Caso o link não funcione tente copiar o link manualmente e colar no seu navegador. Se não foi você que pediu a alteração de senha, por favor ignore esse email.
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

}