
export class AppError {
    public readonly detail:string | object
    public readonly type: string
    public readonly statusCode:number
    public readonly date:Date

    constructor ( detail:string | object , type:string , statusCode = 400  ){
        this.detail = detail;
        this.type = type;
        this.statusCode = statusCode;
        this.date = new Date()
    }

    getJsonResponse(){
        return {
            status:"error",
            type:this.type,
            detail:this.detail,
            date:this.date
        }
    }
}
