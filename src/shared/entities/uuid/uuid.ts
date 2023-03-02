import {v4 as uuidv4} from 'uuid';

export class Uuid {
    private uuid:string
    private constructor(uuid_generated:string){
        this.uuid = uuid_generated
    }


    static create(uuid?:string){
        const myuuid = uuid ? uuid:uuidv4();
        return new Uuid(myuuid)
    }

    static validate(uuid:string){
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        return regexExp.test(uuid)
    }

    get value(){
        return this.uuid
    }
}