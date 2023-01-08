import {v4 as uuidv4} from 'uuid';

export class Uuid {
    private uuid:string
    private constructor(uuid_generated:string){
        this.uuid = uuid_generated
    }
    static create(){
        const myuuid = uuidv4();
        return new Uuid(myuuid)
    }
    get value(){
        return this.uuid
    }
}