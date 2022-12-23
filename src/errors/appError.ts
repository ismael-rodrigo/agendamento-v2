
export class AppError {
    public readonly detail:string
    public readonly type:string
    public readonly statusCode:number
    public readonly date:Date

    constructor (detail:string ,type:string ,statusCode = 400 ){
        this.detail = detail;
        this.type = type;
        this.statusCode = statusCode;
        this.date = new Date()
    }
}